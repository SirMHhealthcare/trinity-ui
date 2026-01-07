import { useState, useEffect, useCallback, useRef } from "react";
import { bookingConfig } from "@/config";

// API base URL
const API_BASE_URL = bookingConfig.apiBaseUrl;

// Razorpay Key ID - this is the publishable key (safe for frontend)
const RAZORPAY_KEY_ID = "rzp_test_RtnlRaTM4pGMqu";

// Polling configuration
const POLLING_INTERVAL_MS = 3000; // 3 seconds
const MAX_POLLING_ATTEMPTS = 20; // Max 60 seconds of polling

export type PaymentSuccessCallback = (meetLink?: string, bookingId?: string) => void;

interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

interface BookingDetails {
  name: string;
  email: string;
  age: string;
  gender: string;
  phone: string;
  date: string;
  time: string;
  concern?: string;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

interface PaymentStatusResponse {
  orderId: string;
  status: string;
  amount: number;
  currency: string;
  appointmentId?: string;
  failureReason?: string;
}

interface AppointmentResponse {
  id: string;
  googleMeetLink?: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

interface UseRazorpayReturn {
  initiatePayment: (
    bookingDetails: BookingDetails,
    onSuccess: PaymentSuccessCallback,
    onError: (error: string) => void
  ) => Promise<void>;
  isScriptLoaded: boolean;
  isProcessing: boolean;
  isVerifying: boolean;
}

export const useRazorpay = (): UseRazorpayReturn => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Load Razorpay script dynamically
  useEffect(() => {
    if (document.getElementById("razorpay-script")) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => console.error("Failed to load Razorpay script");
    document.body.appendChild(script);

    return () => {
      // Cleanup polling on unmount
      if (pollingRef.current) {
        clearTimeout(pollingRef.current);
      }
    };
  }, []);

  // Create order via backend
  const bookAppointment = async (bookingDetails: BookingDetails): Promise<RazorpayOrder> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientName: bookingDetails.name,
        patientAge: bookingDetails.age,
        patientGender: bookingDetails.gender,
        patientPhoneNumber: bookingDetails.phone,
        patientEmail: bookingDetails.email,
        symptoms: bookingDetails.concern || "",
        doctorId: bookingConfig.doctorId,
        appointmentDateTime: `${bookingDetails.date}T${bookingDetails.time}:00`,
        createOrderRequest: {
          amount: 50000, // ₹500 in paise
          currency: "INR",
        }
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    return response.json();
  };

  // Check payment status
  const checkPaymentStatus = async (orderId: string): Promise<PaymentStatusResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/payments/status/${orderId}`);
    
    if (!response.ok) {
      throw new Error("Failed to check payment status");
    }

    return response.json();
  };

  // Fetch appointment details to get meetLink
  const fetchAppointmentDetails = async (appointmentId: string): Promise<AppointmentResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/appointments/${appointmentId}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch appointment details");
    }

    return response.json();
  };

  // Poll for payment status
  const pollPaymentStatus = (
    orderId: string,
    onSuccess: PaymentSuccessCallback,
    onError: (error: string) => void
  ) => {
    let attempts = 0;

    const poll = async () => {
      attempts++;
      
      try {
        const statusResponse = await checkPaymentStatus(orderId);
        
        if (statusResponse.status === "CAPTURED") {
          // Payment successful - fetch appointment details for meetLink
          setIsVerifying(false);
          
          if (statusResponse.appointmentId) {
            try {
              const appointmentDetails = await fetchAppointmentDetails(statusResponse.appointmentId);
              onSuccess(appointmentDetails.googleMeetLink, statusResponse.appointmentId);
            } catch {
              // If fetching appointment fails, still call success with appointmentId
              onSuccess(undefined, statusResponse.appointmentId);
            }
          } else {
            onSuccess(undefined, orderId);
          }
          return;
        }
        
        if (statusResponse.status === "FAILED") {
          setIsVerifying(false);
          onError(statusResponse.failureReason || "Payment failed. Please try again.");
          return;
        }
        
        // Status is PENDING - continue polling
        if (attempts >= MAX_POLLING_ATTEMPTS) {
          setIsVerifying(false);
          onError("Payment verification is taking longer than expected. Please contact support if the amount was deducted.");
          return;
        }
        
        // Schedule next poll
        pollingRef.current = setTimeout(poll, POLLING_INTERVAL_MS);
      } catch (error) {
        // Network error - continue polling unless max attempts reached
        if (attempts >= MAX_POLLING_ATTEMPTS) {
          setIsVerifying(false);
          onError("Unable to verify payment. Please contact support if the amount was deducted.");
          return;
        }
        
        pollingRef.current = setTimeout(poll, POLLING_INTERVAL_MS);
      }
    };

    // Start polling
    poll();
  };

  // Initiate payment
  const initiatePayment = useCallback(
    async (
      bookingDetails: BookingDetails,
      onSuccess: PaymentSuccessCallback,
      onError: (error: string) => void
    ): Promise<void> => {
      if (!isScriptLoaded) {
        onError("Payment gateway is loading. Please try again.");
        return;
      }

      setIsProcessing(true);

      try {
        // Step 1: Create order
        const order = await bookAppointment(bookingDetails);

        // Step 2: Open Razorpay checkout
        const options: RazorpayOptions = {
          key: RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "Dr. Homeopathy Clinic",
          description: "Online Consultation Fee",
          order_id: order.id,
          prefill: {
            name: bookingDetails.name,
            email: bookingDetails.email,
            contact: bookingDetails.phone,
          },
          theme: {
            color: "#4A7C59", // Primary green color
          },
          handler: (response: RazorpayResponse) => {
            // Razorpay checkout completed - start polling for verification
            setIsProcessing(false);
            setIsVerifying(true);
            pollPaymentStatus(response.razorpay_order_id, onSuccess, onError);
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        setIsProcessing(false);
        onError(
          error instanceof Error
            ? error.message
            : "Failed to initiate payment. Please try again."
        );
      }
    },
    [isScriptLoaded]
  );

  return {
    initiatePayment,
    isScriptLoaded,
    isProcessing,
    isVerifying,
  };
};
