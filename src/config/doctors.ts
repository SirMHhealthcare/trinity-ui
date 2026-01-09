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
    experience: 15,
    phone: "+919782301786",
    email: "homeotrinity@gmail.com",
    image: doctorImage,
    location: "19B, Kali Kothi, Near Darbaar School, Jhotwara, Jaipur, Rajasthan - 302015.",
    casesTreated: "10,000+",
    bio: {
      short: "15+ साल के experience के साथ chronic diseases, allergies, और mental health में trusted specialist।",
      detailed: "Dr. Mohsin Khan 15 से ज़्यादा सालों से Classical Homeopathy में practice कर रहे हैं। Chronic diseases, skin conditions, allergies, और mental health issues में उनका experience patients को effective और lasting relief दिलाने में मदद करता है।",
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
