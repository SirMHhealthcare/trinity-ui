import { services as servicesData, content } from "@/config";

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
            return (
              <div
                key={service.id}
                className="group bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 card-hover overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={service.imagePath}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
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
