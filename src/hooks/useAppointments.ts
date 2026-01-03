import { useState, useEffect, useCallback } from "react";
import { bookingConfig } from "@/config/booking";

export interface Appointment {
  id: string;
  doctorId: string;
  appointmentRef: string;
  appointmentDateTime: string;
  status: "SCHEDULED" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "NO_SHOW" | "RESCHEDULED";
  symptoms: string | null;
  meetingLink: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UseAppointmentsReturn {
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useAppointments = (): UseAppointmentsReturn => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
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

      const data: Appointment[] = await response.json();
      // Sort by date descending (newest first)
      const sorted = data.sort((a, b) => 
        new Date(b.appointmentDateTime).getTime() - new Date(a.appointmentDateTime).getTime()
      );
      setAppointments(sorted);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch appointments";
      setError(errorMessage);
      console.error("Error fetching appointments:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    isLoading,
    error,
    refetch: fetchAppointments,
  };
};
