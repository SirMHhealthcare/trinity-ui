import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { content } from "@/config";
import { treatments } from "@/lib/treatments";
import LogoWatermark from "./LogoWatermark";

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
          {treatments.map((service, index) => {
            const isExpanded = expandedId === service.id;
            
            return (
              <div
                key={service.id}
                className="group bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 card-hover overflow-hidden cursor-pointer self-start"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => toggleExpand(service.id)}
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} — homeopathic treatment at Trinity Homeopathy`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className="font-heading font-semibold text-lg text-foreground mb-2 line-clamp-1"
                      title={service.title}
                    >
                      {service.title}
                    </h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {/* Summary: fixed at 2 lines (…) so every card is the same height; full text when expanded */}
                  <p
                    className={`text-muted-foreground text-sm leading-relaxed min-h-[calc(2*1.625*0.875rem)] ${
                      isExpanded ? "" : "line-clamp-2"
                    }`}
                  >
                    {service.summary}
                  </p>
                  
                  {/* Expanded Content */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {service.cardDetail}
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
