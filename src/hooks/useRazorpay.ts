import { useState, useEffect, useCallback } from "react";

// Placeholder API base URL - replace with your Cloudflare Workers URL
const API_BASE_URL = "https://trinity-homeopathy-704273852426.asia-south2.run.app";

// Razorpay Key ID - this is the publishable key (safe for frontend)
const RAZORPAY_KEY_ID = "rzp_test_RtnlRaTM4pGMqu"; // Replace with your actual key

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
}

export const useRazorpay = (): UseRazorpayReturn => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
      // Cleanup not needed as we want the script to persist
    };
  }, []);

  // Create order via backend
  const bookAppointment = async (bookingDetails: BookingDetails): Promise<RazorpayOrder> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        patientName: bookingDetails.name,
        patientAge: bookingDetails.age,
        patientGender: bookingDetails.gender,
        patientPhoneNumber: bookingDetails.phone,
        patientEmail: bookingDetails.email,
        symptoms: bookingDetails.concern || "",
        doctorId: "MK101",
        appointmentDateTime: `${bookingDetails.date}T${bookingDetails.time}:00`,
      createOrderRequest: {
        amount: 50000, // ₹500 in paise
        currency: "INR",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    return response.json();
  };

  // Verify payment via backend
  const verifyPayment = async (
    paymentResponse: RazorpayResponse,
    bookingDetails: BookingDetails
  ): Promise<{ success: boolean; meetLink?: string; bookingId?: string }> => {
    const response = await fetch(`${API_BASE_URL}/verify-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        booking: bookingDetails,
      }),
    });

    if (!response.ok) {
      throw new Error("Payment verification failed");
    }

    return response.json();
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
          handler: async (response: RazorpayResponse) => {
            try {
              // Step 3: Verify payment
              const verification = await verifyPayment(response, bookingDetails);
              if (verification.success) {
                onSuccess(verification.meetLink, verification.bookingId);
              } else {
                onError("Payment verification failed. Please contact support.");
              }
            } catch {
              onError("Payment verification failed. Please contact support.");
            } finally {
              setIsProcessing(false);
            }
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
  };
};
