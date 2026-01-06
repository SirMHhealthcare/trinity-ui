import { useState, useEffect, useCallback } from "react";
import { format, parseISO } from "date-fns";
import { bookingConfig } from "@/config";

interface AppointmentResponse {
  id: string;
  doctorId: string;
  appointmentRef: string;
  appointmentDateTime: string;
  status: "SCHEDULED" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "NO_SHOW" | "RESCHEDULED";
  symptoms: string;
  meetingLink: string;
  createdAt: string;
  updatedAt: string;
}

interface SlotAvailability {
  date: string;
  time: string;
  isBooked: boolean;
}

// Predefined time slots for the clinic
const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
];

// Statuses that indicate a slot is booked/unavailable
const BOOKED_STATUSES: AppointmentResponse["status"][] = [
  "SCHEDULED", "CONFIRMED", "IN_PROGRESS", "RESCHEDULED"
];

// Convert 24-hour time to 12-hour format matching TIME_SLOTS
const formatTimeToSlot = (dateTime: string): string | null => {
  try {
    const date = parseISO(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    const formattedTime = `${hour12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
    
    // Check if this matches one of our predefined slots
    if (TIME_SLOTS.includes(formattedTime)) {
      return formattedTime;
    }
    return null;
  } catch {
    return null;
  }
};

// Retry wrapper with exponential backoff
const fetchWithRetry = async <T>(
  fetchFn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error");
      
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};

// Fetch appointments from the real backend API
const fetchAppointmentsFromAPI = async (date: string): Promise<SlotAvailability[]> => {
  const fetchFn = async () => {
    const response = await fetch(`${bookingConfig.apiBaseUrl}/api/v1/appointments`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const appointments: AppointmentResponse[] = await response.json();
    return appointments;
  };

  const appointments = await fetchWithRetry(fetchFn);
  
  // Filter appointments for the selected date that are in a "booked" status
  const bookedTimesForDate = appointments
    .filter(apt => {
      const aptDate = format(parseISO(apt.appointmentDateTime), "yyyy-MM-dd");
      return aptDate === date && BOOKED_STATUSES.includes(apt.status);
    })
    .map(apt => formatTimeToSlot(apt.appointmentDateTime))
    .filter((time): time is string => time !== null);

  // Map all time slots and mark booked ones
  return TIME_SLOTS.map(time => ({
    date,
    time,
    isBooked: bookedTimesForDate.includes(time),
  }));
};

export const useAvailableSlots = (selectedDate: string) => {
  const [slots, setSlots] = useState<SlotAvailability[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = useCallback(async () => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const slotsData = await fetchAppointmentsFromAPI(selectedDate);
      setSlots(slotsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch slots";
      setError(errorMessage);
      console.error("Error fetching slots:", err);
      
      // Return all slots as available on error (graceful degradation)
      setSlots(TIME_SLOTS.map(time => ({
        date: selectedDate,
        time,
        isBooked: false,
      })));
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const bookSlot = async (date: string, time: string): Promise<boolean> => {
    // Note: Actual booking is handled through the payment flow
    // This function can be used for optimistic updates or future booking API integration
    try {
      await fetchSlots(); // Refresh slots after booking attempt
      return true;
    } catch {
      return false;
    }
  };

  return {
    slots,
    isLoading,
    error,
    bookSlot,
    refetchSlots: fetchSlots,
  };
};
