// Centralized UI text content for easy maintenance and future i18n

export const content = {
  // Hero Section
  hero: {
    badge: "Natural Healing, Lasting Results",
    headline: "Heal Naturally with",
    headlineHighlight: "Classical Homeopathy",
    description: "Personalized homeopathic treatment tailored to your needs. Trusted care for chronic diseases, allergies, and lifestyle disorders. Online consultations available across India.",
    ctaPrimary: "Book Online Consultation",
    ctaSecondary: "View Services",
    stats: {
      patients: { value: "10,000+", label: "Happy Patients" },
      experience: { value: "25+", label: "Years Experience" },
      natural: { value: "100%", label: "Natural Treatment" },
    },
    trustBadge: {
      title: "Verified Doctor",
    },
  },

  // About Section
  about: {
    badge: "About",
    headline: "Trusted Care, Natural Healing",
    subheadline: "Classical Homeopathy के ज़रिए complete wellness",
    experienceBadge: "Years of Healing",
  },

  // Services Section
  services: {
    badge: "Our Services",
    headline: "Specialized Treatment Areas",
    description: "हर patient की unique health needs के लिए personalized homeopathic care। Symptoms नहीं, root cause का treatment।",
  },

  // Testimonials Section
  testimonials: {
    badge: "मरीज़ों के अनुभव",
    headline: "हमारे मरीज़ क्या कहते हैं",
    description: "राजस्थान भर के मरीज़ों के सच्चे अनुभव",
    trustIndicators: {
      rating: { value: "4.9", label: "Google Rating" },
      patients: { value: "10,000+", label: "खुश मरीज़" },
      experience: { value: "15+", label: "साल का अनुभव" },
    },
  },

  // How It Works Section
  howItWorks: {
    badge: "आसान Process",
    headline: "3 आसान Steps में Book करें",
    description: "घर बैठे अपनी consultation लें",
    steps: [
      {
        step: "1",
        title: "जानकारी भरें",
        description: "अपनी basic details और health concern बताएँ",
      },
      {
        step: "2",
        title: "समय चुनें",
        description: "अपनी सुविधा के अनुसार slot चुनें और book करें",
      },
      {
        step: "3",
        title: "Video Consultation",
        description: "Online मिलें और treatment plan पाएँ",
      },
    ],
    infoBox: {
      title: "💡 ज़रूरी जानकारी",
      freeFollowups: "पहली consultation के बाद, 1 महीने तक सभी follow-up FREE हैं!",
      cancellation: "Appointment से 2 घंटे पहले cancel करके reschedule कर सकते हैं।",
    },
  },

  // Booking Section
  booking: {
    headline: "Online Consultation बुक करें",
    description: "घर बैठे Doctor से मिलें। आपकी सुविधा, आपका समय।",
    steps: {
      details: "जानकारी",
      datetime: "समय चुनें",
      confirmed: "Confirmed",
    },
    form: {
      name: "आपका नाम",
      namePlaceholder: "पूरा नाम",
      email: "Email Address",
      emailPlaceholder: "your.email@example.com",
      phone: "Phone Number",
      phonePlaceholder: "+91 98765 43xxx",
      age: "Age",
      agePlaceholder: "30",
      gender: "Gender",
      genderOptions: ["पुरुष", "महिला", "अन्य"],
      concern: "आपकी समस्या (optional)",
      concernPlaceholder: "अपनी health problem के बारे में थोड़ा बताएँ...",
    },
    buttons: {
      next: "आगे बढ़ें",
      back: "वापस",
      confirm: "Confirm Booking",
      booking: "Booking...",
    },
    confirmation: {
      headline: "Appointment Confirmed! ✅",
      reference: "Reference",
      date: "तारीख़",
      time: "समय",
      consultationType: "Online Video Consultation",
      notice: "Appointment details save करने के लिए WhatsApp share करें या Calendar में add करें।",
    },
  },

  // Footer
  footer: {
    quickLinks: {
      title: "Quick Links",
      links: ["Home", "Services", "Doctor के बारे में", "Appointment Book करें", "संपर्क करें"],
    },
    servicesTitle: "हमारी Services",
    servicesList: ["Chronic Diseases", "Skin & Allergies", "Mental Wellness", "Child Health", "Women's Health"],
    contactTitle: "संपर्क करें",
    copyright: "All rights reserved.",
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },

  // Common
  common: {
    loading: "Loading...",
    error: "कुछ गलत हुआ। कृपया दोबारा कोशिश करें।",
    noSlots: "इस तारीख़ को कोई slot available नहीं है।",
    selectDate: "तारीख़ चुनें",
    selectTime: "समय चुनें",
  },
};
