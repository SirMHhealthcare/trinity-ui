import { useState, useEffect, useCallback } from "react";

interface BookedSlot {
  date: string;
  time: string;
}

interface SlotAvailability {
  date: string;
  time: string;
  isBooked: boolean;
}

const STORAGE_KEY = "booked_appointments";

// Simulates an API call to get available slots
export const useAvailableSlots = (selectedDate: string) => {
  const [slots, setSlots] = useState<SlotAvailability[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
  ];

  const getBookedSlots = (): BookedSlot[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const fetchSlots = useCallback(async () => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
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
    setIsLoading(false);
  }, [selectedDate]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const bookSlot = (date: string, time: string): boolean => {
    const bookedSlots = getBookedSlots();
    
    // Check if already booked
    const isAlreadyBooked = bookedSlots.some(
      (slot) => slot.date === date && slot.time === time
    );
    
    if (isAlreadyBooked) {
      return false;
    }

    // Add new booking
    bookedSlots.push({ date, time });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookedSlots));
    
    // Refresh slots
    fetchSlots();
    return true;
  };

  return {
    slots,
    isLoading,
    bookSlot,
    refetchSlots: fetchSlots,
  };
};
