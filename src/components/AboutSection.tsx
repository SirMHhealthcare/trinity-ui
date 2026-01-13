import { Heart, Leaf, Shield, Users } from "lucide-react";
import { content, clinic } from "@/config";
import LogoWatermark from "./LogoWatermark";
import TeamSection from "./TeamSection";
import logoImage from "@/assets/logo.png";

const AboutSection = () => {
  const { about } = content;

  const values = [
    { icon: Heart, label: "Patient-First Care", description: "Your health journey is our priority" },
    { icon: Leaf, label: "100% Natural", description: "Gentle remedies, no side effects" },
    { icon: Shield, label: "Trusted Expertise", description: "15+ years of healing experience" },
    { icon: Users, label: "Pan-India Reach", description: "Online consultations nationwide" },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Logo Watermark */}
      <LogoWatermark className="top-10 right-10" size="lg" opacity={0.04} />
      <LogoWatermark className="bottom-10 left-10" size="md" opacity={0.03} />
      
      <div className="container mx-auto px-4">
        {/* Clinic Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Logo & Visual */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary p-4 shadow-elevated">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden border-4 border-primary/20">
                  <img
                    src={logoImage}
                    alt={clinic.name}
                    className="w-3/4 h-3/4 object-contain"
                  />
                </div>
              </div>
              {/* Trust Badge */}
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-2xl shadow-card">
                <p className="text-3xl font-heading font-bold">15+</p>
                <p className="text-sm opacity-90">Years of Trust</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {about.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-2">
              {about.headline}
            </h2>
            <p className="text-lg md:text-xl text-primary font-medium mb-6">
              {about.subheadline}
            </p>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {about.mission}
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {about.values}
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground block">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section - Scalable for multiple doctors */}
      <TeamSection />
    </section>
  );
};

export default AboutSection;
