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
  tagline: "प्राकृतिक उपचार, स्थायी परिणाम",
  description: "Classical homeopathy के ज़रिए प्राकृतिक और समग्र उपचार। राजस्थान भर में मरीज़ों को personalized care।",
  address: {
    street: "123 Vaishali Nagar, Near Central Park",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302021",
    full: "123 Vaishali Nagar, Near Central Park, Jaipur, Rajasthan - 302021",
  },
  contact: {
    phone: "+919876543210",
    phoneDisplay: "+91 98765 43210",
    email: "doctor@homeopathy.com",
    whatsapp: "919876543210",
  },
  hours: {
    weekdays: "सोमवार - शनिवार: 10 AM - 7 PM",
    sunday: "रविवार: Appointment पर",
  },
  socialLinks: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },
  policies: {
    freeFollowupDays: 30,
    cancellationHours: 2,
  },
};
