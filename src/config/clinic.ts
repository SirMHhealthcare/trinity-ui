export interface ClinicInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
    whatsapp: string;
  };
  hours: {
    weekdays: string;
    sunday: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  policies: {
    freeFollowupDays: number;
    cancellationHours: number;
  };
}

export const clinic: ClinicInfo = {
  name: "Trinity Homeopathy Clinic",
  shortName: "Trinity Homeopathy",
  tagline: "Natural Healing, Lasting Results",
  description: "Trusted homeopathic care through classical homeopathy. Personalized treatment for patients across India via online consultations.",
  address: {
    street: "19B, Kali Kothi, Near Darbaar School, Jhotwara",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302015",
    full: "19B, Kali Kothi, Near Darbaar School, Jhotwara, Jaipur, Rajasthan - 302015.",
  },
  contact: {
    phone: "+919782301786",
    phoneDisplay: "+91 97823 01786",
    email: "homeotrinity@gmail.com",
    whatsapp: "919782301786",
  },
  hours: {
    weekdays: "सोमवार - शनिवार: 10 AM - 7 PM",
    sunday: "रविवार: Appointment पर",
  },
  socialLinks: {
    facebook: "https://www.facebook.com/profile.php?id=61583780979394#",
    instagram: "https://www.instagram.com/trinityhomeopathy/",
    youtube: "#",
  },
  policies: {
    freeFollowupDays: 30,
    cancellationHours: 2,
  },
};
