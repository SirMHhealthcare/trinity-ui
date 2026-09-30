import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { services as servicesData, content } from "@/config";
import LogoWatermark from "./LogoWatermark";

// Placeholder expanded descriptions for each service
const expandedDescriptions: Record<string, string> = {
  asthma: "In people with asthma, the airways can become inflamed and narrowed, making it difficult for air to move in and out of the lungs. Common symptoms include coughing, wheezing, chest tightness and shortness of breath.",
  chronic: "Chronic diseases require a holistic approach that addresses root causes. Our classical homeopathy treatment helps manage conditions like diabetes, thyroid disorders, and arthritis naturally, reducing dependence on conventional medications while improving quality of life.",
  allergies: "Skin conditions and allergies often indicate internal imbalances. Our treatment strengthens your immune system and reduces hypersensitivity, providing lasting relief from eczema, psoriasis, urticaria, and seasonal allergies without harsh topical treatments.",
  mental: "Mental wellness is crucial for overall health. Our gentle remedies address anxiety, depression, stress, and sleep disorders by restoring emotional balance. Experience improved mood and mental clarity without the side effects of conventional medications.",
  child: "Children respond exceptionally well to homeopathy. We treat recurrent infections, growth issues, and behavioral problems with safe, pleasant-tasting remedies that build natural immunity and support healthy development.",
  joint: "Joint and muscle pain can limit your daily life. Our constitutional remedies reduce inflammation, repair tissues, and restore mobility naturally. Experience relief from arthritis, back pain, and sports injuries without relying on painkillers.",
  digestive: "Digestive health is fundamental to well-being. We treat acidity, IBS, constipation, and bloating by addressing underlying causes and restoring gut balance. Many patients find relief from issues that persisted for years.",
  women: "Women's health requires specialized care. We effectively treat PCOS, irregular periods, menstrual pain, and menopausal symptoms through individualized treatment that addresses hormonal and emotional factors safely.",
  immunity: "A strong immune system is your best defense. Our treatment enhances your body's vital force, making you more resistant to infections. Experience fewer illnesses and faster recovery times naturally."
};

const Services = () => {
  const { services: servicesContent } = content;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="treatments" className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
      {/* Logo Watermarks */}
      <LogoWatermark className="top-20 left-5" size="lg" opacity={0.04} />
      <LogoWatermark className="bottom-20 right-5" size="md" opacity={0.03} />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {servicesContent.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            {servicesContent.headline}
          </h2>
          <p className="text-muted-foreground text-lg">
            {servicesContent.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-start">
          {servicesData.map((service, index) => {
            const isExpanded = expandedId === service.id;
            
            return (
              <div
                key={service.id}
                className="group bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 card-hover overflow-hidden cursor-pointer self-start"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => toggleExpand(service.id)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`${service.imagePath}?v=3`}
                    alt={`${service.title} — homeopathic treatment at Trinity Homeopathy`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {service.title}
                    </h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Expanded Content */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {expandedDescriptions[service.id]}
                      </p>
                      <Link
                        to={`/treatment/${service.id}`}
                        className="inline-block text-primary text-sm font-medium hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.scrollTo(0, 0);
                        }}
                      >
                        See more →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
