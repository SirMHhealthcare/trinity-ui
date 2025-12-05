import { 
  Leaf, 
  Heart, 
  Brain, 
  Baby, 
  Bone, 
  Droplets,
  Sparkles,
  Shield 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Chronic Diseases",
      description: "Long-term treatment for diabetes, thyroid, arthritis, and other chronic conditions",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Leaf,
      title: "Allergies & Skin",
      description: "Natural remedies for allergies, eczema, psoriasis, and skin disorders",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Brain,
      title: "Mental Wellness",
      description: "Stress, anxiety, depression, and sleep disorders treatment",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Baby,
      title: "Child Health",
      description: "Gentle remedies for children's immunity, growth, and common ailments",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Bone,
      title: "Joint & Muscle",
      description: "Pain relief for back pain, joint issues, and muscle problems",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Droplets,
      title: "Digestive Health",
      description: "Treatment for acidity, IBS, constipation, and digestive issues",
      color: "bg-teal-100 text-teal-600",
    },
    {
      icon: Sparkles,
      title: "Women's Health",
      description: "PCOS, menstrual issues, menopause, and hormonal balance",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: Shield,
      title: "Immunity Boost",
      description: "Strengthen your body's natural defense system",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Holistic Treatment for Every Need
          </h2>
          <p className="text-muted-foreground text-lg">
            We treat the person, not just the disease. Natural remedies tailored to your unique health needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
