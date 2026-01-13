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
      short: "Trusted specialist in chronic diseases, allergies, and mental health with 15+ years of experience.",
      detailed: "Dr. Mohsin Khan has been practicing Classical Homeopathy for over 15 years. His extensive experience in treating chronic diseases, skin conditions, allergies, and mental health issues helps patients achieve effective and lasting relief.",
      approach: "Dr. Khan's treatment approach focuses on understanding each patient's individual needs to provide personalized care. The goal is permanent healing by addressing the root cause through natural remedies.",
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
