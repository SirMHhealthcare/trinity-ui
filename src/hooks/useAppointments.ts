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
  patientName: string | null;
  patientEmail: string | null;
  patientPhone: string | null;
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
      // Sort by scheduled status first, then by date ascending (most recent first within each group)
      const statusPriority: Record<Appointment["status"], number> = {
        SCHEDULED: 1,
        CONFIRMED: 2,
        IN_PROGRESS: 3,
        RESCHEDULED: 4,
        COMPLETED: 5,
        CANCELLED: 6,
        NO_SHOW: 7,
      };
      const sorted = data.sort((a, b) => {
        // First sort by status priority (SCHEDULED first)
        const statusDiff = statusPriority[a.status] - statusPriority[b.status];
        if (statusDiff !== 0) return statusDiff;
        // Then sort by date ascending (earliest first)
        return new Date(a.appointmentDateTime).getTime() - new Date(b.appointmentDateTime).getTime();
      });
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
