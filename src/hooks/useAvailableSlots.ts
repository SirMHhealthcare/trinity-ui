import { useState, useEffect, useCallback } from "react";

// Mock API base URL - replace with your Cloudflare Workers URL
const API_BASE_URL = "https://api.your-domain.workers.dev";

interface BookedSlot {
  date: string;
  time: string;
}

interface SlotAvailability {
  date: string;
  time: string;
  isBooked: boolean;
}

interface ApiSlotsResponse {
  slots: SlotAvailability[];
}

// Hardcoded booked slots for demo - TODO: Replace with API call to CF Workers
const HARDCODED_BOOKED_SLOTS: BookedSlot[] = [
  { date: "2025-06-12", time: "10:00 AM" },
  { date: "2025-06-12", time: "11:00 AM" },
  { date: "2025-06-12", time: "02:30 PM" },
  { date: "2025-06-13", time: "10:30 AM" },
  { date: "2025-06-13", time: "03:00 PM" },
  { date: "2025-06-14", time: "11:30 AM" },
  { date: "2025-06-14", time: "05:00 PM" },
  { date: "2025-06-14", time: "06:00 PM" },
];

// Local bookings made in current session (for demo interactivity)
let sessionBookings: BookedSlot[] = [];

const getBookedSlots = (): BookedSlot[] => {
  return [...HARDCODED_BOOKED_SLOTS, ...sessionBookings];
};

export const useAvailableSlots = (selectedDate: string) => {
  const [slots, setSlots] = useState<SlotAvailability[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
  ];

  const fetchSlots = useCallback(async () => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Uncomment when CF Workers backend is ready
      // const response = await fetch(`${API_BASE_URL}/slots?date=${selectedDate}`);
      // if (!response.ok) throw new Error("Failed to fetch slots");
      // const data: ApiSlotsResponse = await response.json();
      // setSlots(data.slots);

      // Mock implementation - simulates API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const bookedSlots = getBookedSlots();
      const slotsWithAvailability = timeSlots.map((time) => ({
        date: selectedDate,
        time,
        isBooked: bookedSlots.some(
          (slot) => slot.date === selectedDate && slot.time === time
        ),
      }));

      setSlots(slotsWithAvailability);
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
      // TODO: Uncomment when CF Workers backend is ready
      // const response = await fetch(`${API_BASE_URL}/book`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ date, time }),
      // });
      // if (!response.ok) return false;
      // await fetchSlots();
      // return true;

      // Mock implementation - adds to session bookings
      const bookedSlots = getBookedSlots();
      const isAlreadyBooked = bookedSlots.some(
        (slot) => slot.date === date && slot.time === time
      );
      
      if (isAlreadyBooked) return false;

      sessionBookings.push({ date, time });
      await fetchSlots();
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
