export interface Service {
  id: string;
  iconName: string; // Lucide icon name
  title: string;
  description: string;
  colorClass: string;
  imagePath: string;
}

export const services: Service[] = [
  {
    id: "asthma",
    iconName: "Wind",
    title: "Asthma",
    description: "Asthma is a chronic condition affecting the airways of the lungs.",
    colorClass: "bg-sky-100 text-sky-600",
    imagePath: "/services/asthma.jpg",
  },
  {
    id: "chronic",
    iconName: "Heart",
    title: "Chronic Diseases",
    description: "Diabetes, thyroid, arthritis जैसी पुरानी बीमारियों का कारगर इलाज",
    colorClass: "bg-red-100 text-red-600",
    imagePath: "/services/chronic-diseases.jpg",
  },
  {
    id: "allergies",
    iconName: "Leaf",
    title: "Allergies & Skin",
    description: "Allergies, eczema, psoriasis और skin problems के लिए natural remedies",
    colorClass: "bg-green-100 text-green-600",
    imagePath: "/services/allergies-skin.jpg",
  },
  {
    id: "mental",
    iconName: "Brain",
    title: "Mental Wellness",
    description: "Stress, anxiety, depression और नींद की समस्याओं का इलाज",
    colorClass: "bg-purple-100 text-purple-600",
    imagePath: "/services/mental-wellness.jpg",
  },
  {
    id: "child",
    iconName: "Baby",
    title: "Child Health",
    description: "बच्चों की immunity, growth और आम बीमारियों के लिए gentle remedies",
    colorClass: "bg-blue-100 text-blue-600",
    imagePath: "/services/child-health.jpg",
  },
  {
    id: "joint",
    iconName: "Bone",
    title: "Joint & Muscle",
    description: "कमर दर्द, जोड़ों की तकलीफ़ और muscle problems से राहत",
    colorClass: "bg-orange-100 text-orange-600",
    imagePath: "/services/joint-muscle.jpg",
  },
  {
    id: "digestive",
    iconName: "Droplets",
    title: "Digestive Health",
    description: "Acidity, IBS, constipation और पेट की समस्याओं का इलाज",
    colorClass: "bg-teal-100 text-teal-600",
    imagePath: "/services/digestive-health.jpg",
  },
  {
    id: "women",
    iconName: "Sparkles",
    title: "Women's Health",
    description: "PCOS, periods की समस्या, menopause और hormonal balance",
    colorClass: "bg-pink-100 text-pink-600",
    imagePath: "/services/womens-health.jpg",
  },
  {
    id: "immunity",
    iconName: "Shield",
    title: "Immunity Boost",
    description: "शरीर की प्राकृतिक रोग प्रतिरोधक क्षमता को मज़बूत करें",
    colorClass: "bg-yellow-100 text-yellow-600",
    imagePath: "/services/immunity-boost.jpg",
  },
];
