// Admin page configuration and content strings

export const adminConfig = {
  pageTitle: "Admin Dashboard",
  appointmentsSection: {
    title: "Appointments",
    description: "View and manage all clinic appointments",
  },
};

export const adminContent = {
  filters: {
    dateLabel: "Filter by Date",
    datePlaceholder: "Select date",
    searchLabel: "Search",
    searchPlaceholder: "Search by reference, symptoms...",
    clearFilters: "Clear Filters",
    allDates: "All Dates",
  },
  table: {
    headers: {
      dateTime: "Date & Time",
      patientName: "Patient Name",
      patientPhone: "Phone",
      patientEmail: "Email",
      doctorName: "Doctor",
      status: "Status",
      appointmentRef: "Ref #",
      actions: "Details",
    },
    expandedDetails: {
      doctorId: "Doctor ID",
      appointmentRef: "Reference",
      appointmentDateTime: "Date & Time",
      status: "Status",
      symptoms: "Symptoms",
      patientName: "Patient Name",
      patientPhone: "Phone",
      patientEmail: "Email",
      meetingLink: "Meeting Link",
      createdAt: "Created At",
      updatedAt: "Updated At",
    },
    noData: "No appointments found",
    loading: "Loading appointments...",
    error: "Failed to load appointments",
    noMeetingLink: "Not available",
    noSymptoms: "None specified",
  },
  status: {
    SCHEDULED: "Scheduled",
    CONFIRMED: "Confirmed",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    NO_SHOW: "No Show",
    RESCHEDULED: "Rescheduled",
  },
};
