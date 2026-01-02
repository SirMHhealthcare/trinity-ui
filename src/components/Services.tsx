import { 
  Leaf, 
  Heart, 
  Brain, 
  Baby, 
  Bone, 
  Droplets,
  Sparkles,
  Shield,
  LucideIcon
} from "lucide-react";
import { services as servicesData, content } from "@/config";

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, LucideIcon> = {
  Heart,
  Leaf,
  Brain,
  Baby,
  Bone,
  Droplets,
  Sparkles,
  Shield,
};

const Services = () => {
  const { services: servicesContent } = content;

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/30">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Heart;
            return (
              <div
                key={service.id}
                className="group bg-card p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl ${service.colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
