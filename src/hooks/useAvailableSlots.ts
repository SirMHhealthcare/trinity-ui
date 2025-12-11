import { useState, useEffect, useCallback } from "react";

// Mock API base URL - replace with your Cloudflare Workers URL
const API_BASE_URL = "https://api.your-domain.workers.dev";

interface SlotAvailability {
  date: string;
  time: string;
  isBooked: boolean;
}

// ============================================
// MOCK DATA - Replace this section with API call
// ============================================

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
];

// Hardcoded booked slots for demo
const BOOKED_SLOTS: Record<string, string[]> = {
  "2025-12-12": ["10:00 AM", "11:00 AM", "02:30 PM"],
  "2025-12-13": ["10:30 AM", "03:00 PM"],
  "2025-12-14": ["11:30 AM", "05:00 PM", "06:00 PM"],
};

// Session bookings (for demo interactivity)
let sessionBookings: Record<string, string[]> = {};

// Mock API function - TODO: Replace with actual fetch call
const fetchSlotsFromAPI = async (date: string): Promise<SlotAvailability[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay
  
  const bookedForDate = [
    ...(BOOKED_SLOTS[date] || []),
    ...(sessionBookings[date] || []),
  ];

  return TIME_SLOTS.map((time) => ({
    date,
    time,
    isBooked: bookedForDate.includes(time),
  }));
};

// Mock API function - TODO: Replace with actual fetch call
const bookSlotAPI = async (date: string, time: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate network delay
  
  const bookedForDate = [
    ...(BOOKED_SLOTS[date] || []),
    ...(sessionBookings[date] || []),
  ];

  if (bookedForDate.includes(time)) return false;

  sessionBookings[date] = [...(sessionBookings[date] || []), time];
  return true;
};

// ============================================
// END MOCK DATA
// ============================================

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
      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch(`${API_BASE_URL}/slots?date=${selectedDate}`);
      // if (!response.ok) throw new Error("Failed to fetch slots");
      // const data = await response.json();
      // setSlots(data.slots);

      const slotsData = await fetchSlotsFromAPI(selectedDate);
      setSlots(slotsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch slots");
      setSlots([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const bookSlot = async (date: string, time: string): Promise<boolean> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch(`${API_BASE_URL}/book`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ date, time }),
      // });
      // if (!response.ok) return false;

      const success = await bookSlotAPI(date, time);
      if (success) await fetchSlots();
      return success;
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
