import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { services } from "@/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TreatmentCTA from "@/components/TreatmentCTA";
import treatmentHero from "@/assets/treatment-hero.jpg";

// Placeholder detailed content for each service
const treatmentDetails: Record<string, { title: string; content: string[] }> = {
  chronic: {
    title: "Chronic Diseases Treatment",
    content: [
      "Chronic diseases like diabetes, thyroid disorders, and arthritis require a holistic approach that addresses the root cause rather than just managing symptoms. At Trinity Homeopathy Clinic, we specialize in treating these conditions through classical homeopathy, which aims to restore your body's natural balance.",
      "Our treatment protocol begins with a comprehensive case-taking session where we understand your complete medical history, lifestyle factors, and the unique way your body responds to illness. This individualized approach ensures that the remedy selected is perfectly matched to your constitution.",
      "Patients often experience significant improvement in their symptoms within the first few weeks of treatment, with many reporting reduced dependence on conventional medications over time. Our goal is not just to manage your condition but to help your body heal itself naturally.",
      "We provide continuous support throughout your healing journey, with regular follow-ups to monitor progress and adjust treatment as needed. Many of our patients have successfully managed their chronic conditions and regained a better quality of life through our care."
    ]
  },
  allergies: {
    title: "Allergies & Skin Treatment",
    content: [
      "Skin conditions and allergies are often the body's way of expressing internal imbalances. Whether you're dealing with eczema, psoriasis, urticaria, or seasonal allergies, our homeopathic approach targets the underlying cause to provide lasting relief.",
      "Unlike topical treatments that only suppress symptoms, homeopathy works from within to strengthen your immune system and reduce hypersensitivity. This means fewer flare-ups and a gradual reduction in the severity of your condition.",
      "Our treatment takes into account various factors including dietary habits, stress levels, and genetic predispositions. We create a comprehensive treatment plan that may include lifestyle modifications alongside carefully selected homeopathic remedies.",
      "Many patients who have struggled with chronic skin issues for years find significant relief through our treatment. The gentle nature of homeopathy makes it suitable for all ages, including infants and elderly patients with sensitive skin."
    ]
  },
  mental: {
    title: "Mental Wellness Treatment",
    content: [
      "Mental health is as important as physical health, and homeopathy offers a gentle yet effective approach to treating conditions like anxiety, depression, stress, and sleep disorders. Our remedies work on the emotional and mental plane to restore inner peace and balance.",
      "We understand that mental health issues are deeply personal and often interconnected with physical symptoms. Our detailed consultation process helps us understand the complete picture, including your emotional patterns, fears, and life circumstances.",
      "Homeopathic treatment for mental wellness is non-addictive and free from the side effects commonly associated with conventional psychiatric medications. Many patients experience improved mood, better sleep, and enhanced mental clarity within weeks of starting treatment.",
      "We provide a supportive and judgment-free environment for our patients. Regular follow-ups help us track your progress and make necessary adjustments to ensure optimal results on your journey to mental wellness."
    ]
  },
  child: {
    title: "Child Health Treatment",
    content: [
      "Children respond exceptionally well to homeopathic treatment due to their high vitality and untainted constitutions. We treat a wide range of pediatric conditions including recurrent infections, growth issues, behavioral problems, and common childhood ailments.",
      "Our gentle remedies are safe, pleasant-tasting, and easy to administer, making treatment stress-free for both children and parents. We focus on building your child's natural immunity rather than suppressing symptoms with strong medications.",
      "Common conditions we treat include recurrent colds and coughs, tonsillitis, adenoids, allergies, asthma, digestive issues, and attention difficulties. Our holistic approach also addresses issues like bedwetting, night terrors, and teething troubles.",
      "We work closely with parents to understand each child's unique temperament and health patterns. This collaborative approach ensures that your child receives personalized care that supports their overall growth and development."
    ]
  },
  joint: {
    title: "Joint & Muscle Treatment",
    content: [
      "Joint and muscle pain can significantly impact your quality of life, limiting mobility and daily activities. Our homeopathic approach addresses conditions like arthritis, back pain, sciatica, frozen shoulder, and sports injuries at their root cause.",
      "Rather than relying on painkillers that only mask symptoms, we use constitutional remedies that work to reduce inflammation, repair damaged tissues, and restore joint health naturally. Many patients experience improved mobility and reduced pain within weeks.",
      "Our treatment protocol may include specific remedies for acute pain relief combined with constitutional treatment for long-term healing. We also provide guidance on exercises and lifestyle modifications that support joint health.",
      "Whether you're dealing with age-related joint degeneration or injury-related muscle pain, our personalized treatment plans aim to restore function and improve your quality of life without the side effects of conventional pain management."
    ]
  },
  digestive: {
    title: "Digestive Health Treatment",
    content: [
      "Digestive health is fundamental to overall well-being, and issues like acidity, IBS, constipation, and bloating can severely affect daily life. Our homeopathic treatment addresses digestive disorders by restoring the natural balance of your gut.",
      "We take a comprehensive approach, considering factors like dietary habits, stress levels, and lifestyle patterns that contribute to digestive issues. This allows us to treat not just the symptoms but the underlying causes of your condition.",
      "Common conditions we treat include GERD, gastritis, ulcerative colitis, Crohn's disease, food intolerances, and functional digestive disorders. Our remedies work to heal the digestive tract and restore normal function.",
      "Many patients experience relief from chronic digestive issues that have persisted for years. Our gentle approach is particularly beneficial for those who have developed sensitivity to conventional digestive medications."
    ]
  },
  women: {
    title: "Women's Health Treatment",
    content: [
      "Women's health encompasses a unique set of conditions related to hormonal balance, reproductive health, and life transitions. We specialize in treating PCOS, irregular periods, menstrual pain, infertility, and menopausal symptoms through classical homeopathy.",
      "Our approach recognizes that women's health issues are often interconnected with emotional and hormonal factors. We conduct detailed consultations to understand your complete symptom picture and provide truly individualized treatment.",
      "Homeopathy offers a safe and effective alternative for conditions like fibroids, ovarian cysts, endometriosis, and hormonal imbalances without the side effects of hormone replacement therapy. Many women find lasting relief and improved quality of life.",
      "We also support women through life transitions like pregnancy planning, postpartum recovery, and menopause. Our gentle remedies are safe during these sensitive periods and help maintain optimal health naturally."
    ]
  },
  immunity: {
    title: "Immunity Boost Treatment",
    content: [
      "A strong immune system is your best defense against illness. If you find yourself frequently falling sick, experiencing prolonged recovery times, or feeling low on energy, our immunity-boosting treatment can help strengthen your natural defenses.",
      "Our approach goes beyond simple supplements to address the root causes of low immunity. We consider factors like chronic stress, sleep patterns, nutritional deficiencies, and underlying health conditions that may be compromising your immune function.",
      "Constitutional homeopathic treatment works to enhance your body's vital force, making you more resistant to infections and improving overall vitality. Many patients report fewer illnesses and faster recovery times after starting treatment.",
      "Whether you're recovering from a prolonged illness, preparing for seasonal changes, or simply want to optimize your health, our personalized immunity treatment plans can help you achieve and maintain robust health naturally."
    ]
  }
};

const TreatmentPage = () => {
  const { treatmentId } = useParams<{ treatmentId: string }>();
  const service = services.find(s => s.id === treatmentId);
  const details = treatmentDetails[treatmentId || ""];

  if (!service || !details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Treatment not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-24">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={treatmentHero}
            alt={service.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Title Section */}
        <div className="container mx-auto px-4 py-8">
          <Link 
            to="/#services" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            {details.title}
          </h1>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto space-y-6">
            {details.content.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-muted-foreground text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <TreatmentCTA />
    </div>
  );
};

export default TreatmentPage;
