// Booking configuration

export const bookingConfig = {
  apiBaseUrl: "https://trinity-homeopathy-704273852426.asia-south2.run.app",
  doctorId: "101",
  appointmentDurationMinutes: 30,
  maxAdvanceBookingMonths: 2,
};

export const bookingContent = {
  sectionBadge: "Appointment Book करें",
  sectionTitle: "अपनी सेहत की यात्रा शुरू करें",
  sectionSubtitle: "Free Online Consultation Book करें",
  
  steps: {
    personal: {
      title: "आपकी जानकारी",
      stepLabel: "Step 1 of 3",
    },
    dateTime: {
      title: "तारीख़ और समय चुनें",
      stepLabel: "Step 2 of 3",
    },
    confirmation: {
      title: "🎉 Appointment Confirmed!",
    },
  },
  
  form: {
    labels: {
      name: "पूरा नाम *",
      age: "उम्र (Optional)",
      gender: "Gender (Optional)",
      phone: "Phone Number *",
      email: "Email Address *",
      concern: "Health Concern (Optional)",
      selectDate: "तारीख़ चुनें",
      selectTime: "समय चुनें",
    },
    placeholders: {
      name: "अपना नाम लिखें",
      age: "आपकी उम्र",
      phone: "+91 98765 43210",
      email: "your@email.com",
      concern: "अपनी health problem संक्षेप में बताएँ...",
      selectDate: "तारीख़ चुनें",
    },
    genderOptions: [
      { value: "", label: "चुनें" },
      { value: "male", label: "Male (पुरुष)" },
      { value: "female", label: "Female (महिला)" },
      { value: "other", label: "Other (अन्य)" },
    ],
    validation: {
      phoneInvalid: "Phone number में सिर्फ digits, + और spaces हो सकते हैं",
      phoneMinDigits: "Phone number कम से कम 10 digits होना चाहिए",
      emailInvalid: "सही email address डालें",
      ageInvalid: "उम्र 1 से 120 के बीच होनी चाहिए",
    },
  },
  
  buttons: {
    next: "आगे बढ़ें",
    back: "वापस",
    bookAppointment: "Appointment Book करें",
    booking: "Booking...",
    addToCalendar: "Calendar",
    shareWhatsApp: "WhatsApp",
    bookAnother: "एक और Appointment book करें",
  },
  
  messages: {
    slotsLoading: "Slots load हो रहे हैं...",
    selectDateFirst: "पहले तारीख़ चुनें",
    booked: "Booked",
    confirmationNotice: "Appointment details save करने के लिए WhatsApp share करें या Calendar में add करें।",
  },
  
  toasts: {
    bookingSuccess: {
      title: "Appointment Booked! 🎉",
      description: "आपकी appointment successfully book हो गई है।",
    },
    bookingFailed: {
      title: "Booking Failed",
      description: "कुछ गड़बड़ हो गई। कृपया फिर से try करें।",
    },
    fillRequired: {
      title: "Please fill all required fields",
    },
    fixValidation: {
      title: "Please fix validation errors",
    },
    selectDateTime: {
      title: "Please select date and time",
    },
  },
  
  confirmation: {
    labels: {
      name: "नाम",
      date: "तारीख़",
      time: "समय",
      email: "Email",
      ref: "Ref:",
    },
  },
  
  calendar: {
    eventTitle: "Homeopathy Consultation - Dr. Mohsin Khan",
    eventDetails: "Online Consultation",
  },
  
  whatsApp: {
    messageTemplate: (dateStr: string, time: string, appointmentRef: string, email: string) => 
      `✅ *Appointment Confirmed!*

📋 *Trinity Homeopathy*
👨‍⚕️ Dr. Mohsin Khan

📅 तारीख़: ${dateStr}
🕐 समय: ${time}
${appointmentRef ? `🔖 Ref: ${appointmentRef}` : ""}

🏥 Online Video Consultation
📧 ${email}`,
  },
};
