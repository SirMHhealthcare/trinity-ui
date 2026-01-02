import { Star, Quote, Play } from "lucide-react";
import { testimonials as testimonialsData, content } from "@/config";

const Testimonials = () => {
  const { testimonials: testimonialsContent } = content;

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {testimonialsContent.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            {testimonialsContent.headline}
          </h2>
          <p className="text-muted-foreground text-lg">
            {testimonialsContent.description}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card p-6 rounded-2xl border border-border shadow-card hover:shadow-elevated transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Media Content (for image/video testimonials) */}
              {testimonial.type === "image" && testimonial.mediaUrl && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={testimonial.mediaUrl} 
                    alt={`${testimonial.name} testimonial`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {testimonial.type === "video" && testimonial.mediaUrl && (
                <div className="mb-4 rounded-lg overflow-hidden relative group cursor-pointer">
                  <img 
                    src={testimonial.thumbnailUrl || testimonial.mediaUrl} 
                    alt={`${testimonial.name} video testimonial`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-heading font-bold text-primary">
              {testimonialsContent.trustIndicators.rating.value}
            </p>
            <div className="flex justify-center gap-1 my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {testimonialsContent.trustIndicators.rating.label}
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-heading font-bold text-primary">
              {testimonialsContent.trustIndicators.patients.value}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {testimonialsContent.trustIndicators.patients.label}
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-heading font-bold text-primary">
              {testimonialsContent.trustIndicators.experience.value}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {testimonialsContent.trustIndicators.experience.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
