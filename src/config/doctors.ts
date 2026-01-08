import doctorImage from "@/assets/doctor-portrait.jpg";

export interface Doctor {
  id: string;
  name: string;
  degree: string;
  specialization: string;
  experience: number;
  phone: string;
  email: string;
  image: string;
  location: string;
  casesTreated: string;
  bio: {
    short: string;
    detailed: string;
    approach: string;
  };
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

export const doctors: Doctor[] = [
  {
    id: "101",
    name: "Dr. Mohsin Khan",
    degree: "BHMS, MD (Homeopathy)",
    specialization: "Classical Homeopathy",
    experience: 25,
    phone: "+919876543210",
    email: "doctor@homeopathy.com",
    image: doctorImage,
    location: "Jaipur, Rajasthan",
    casesTreated: "10,000+",
    bio: {
      short: "25+ साल के experience के साथ chronic diseases, allergies, और mental health में trusted specialist।",
      detailed: "Dr. Mohsin Khan 25 से ज़्यादा सालों से Classical Homeopathy में practice कर रहे हैं। Chronic diseases, skin conditions, allergies, और mental health issues में उनका experience patients को effective और lasting relief दिलाने में मदद करता है।",
      approach: "Dr. Khan का treatment approach हर patient की individual needs को समझकर personalized care देने पर focused है। Natural remedies के ज़रिए root cause को address करके permanent healing का लक्ष्य।",
    },
    socialLinks: {
      facebook: "#",
      instagram: "#",
      youtube: "#",
    },
  },
];

// Helper to get primary doctor (for single-doctor use cases)
export const getPrimaryDoctor = (): Doctor => doctors[0];

// Helper to get doctor by ID
export const getDoctorById = (id: string): Doctor | undefined => 
  doctors.find((doc) => doc.id === id);
