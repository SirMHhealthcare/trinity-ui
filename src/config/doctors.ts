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
      short: "प्राकृतिक Homeopathic treatment से हज़ारों मरीज़ों को ठीक किया है।",
      detailed: "Dr. Mohsin Khan ने पिछले 25 सालों में हज़ारों मरीज़ों को प्राकृतिक Homeopathic treatment से ठीक किया है। उनका मानना है कि हर मरीज़ unique है और इसीलिए treatment भी personalized होना चाहिए।",
      approach: "Chronic diseases, allergies, skin problems, mental health - किसी भी health issue में Dr. Mohsin Khan का gentle और effective approach आपको natural healing की राह दिखाता है।",
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
