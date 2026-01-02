import { Award, GraduationCap, Clock, MapPin } from "lucide-react";
import { getPrimaryDoctor, content } from "@/config";

const AboutSection = () => {
  const doctor = getPrimaryDoctor();
  const { about } = content;

  const credentials = [
    { icon: GraduationCap, label: doctor.degree },
    { icon: Award, label: `${doctor.experience}+ Years Experience` },
    { icon: Clock, label: `${doctor.casesTreated} Cases Treated` },
    { icon: MapPin, label: doctor.location },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={doctor.image}
                alt={`${doctor.name} - ${doctor.specialization}`}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-card">
              <p className="text-4xl font-heading font-bold">{doctor.experience}+</p>
              <p className="text-sm opacity-90">{about.experienceBadge}</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {about.badge} {doctor.name}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              {about.headline}
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {doctor.bio.detailed}
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {doctor.bio.approach}
            </p>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
