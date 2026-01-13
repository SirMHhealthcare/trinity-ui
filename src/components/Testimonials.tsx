import { useState } from "react";
import { Star, Quote, Play, X } from "lucide-react";
import { testimonials as testimonialsData, content } from "@/config";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Testimonial } from "@/config/testimonials";

const Testimonials = () => {
  const { testimonials: testimonialsContent } = content;
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);

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
                <div 
                  className="mb-4 rounded-lg overflow-hidden relative group cursor-pointer"
                  onClick={() => setActiveVideo(testimonial)}
                >
                  <img 
                    src={testimonial.thumbnailUrl || testimonial.mediaUrl} 
                    alt={`${testimonial.name} video testimonial`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {testimonial.type === "facebook-video" && testimonial.facebookEmbedUrl && (
                <div 
                  className="mb-4 rounded-lg overflow-hidden relative group cursor-pointer"
                  onClick={() => setActiveVideo(testimonial)}
                >
                  {testimonial.thumbnailUrl ? (
                    <img 
                      src={testimonial.thumbnailUrl} 
                      alt={`${testimonial.name} video testimonial`}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-muted flex items-center justify-center">
                      <Play className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-14 h-14 bg-[#1877F2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white ml-1" />
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

      {/* Video Lightbox Modal */}
      <Dialog open={!!activeVideo} onOpenChange={() => setActiveVideo(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-none">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute right-3 top-3 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          {activeVideo?.type === "facebook-video" && activeVideo?.facebookEmbedUrl && (
            <div className="aspect-square w-full max-w-[476px] mx-auto">
              <iframe
                src={activeVideo.facebookEmbedUrl}
                className="w-full h-full rounded-lg"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          )}
          {activeVideo?.type === "video" && activeVideo?.mediaUrl && (
            <div className="aspect-video w-full">
              <video
                src={activeVideo.mediaUrl}
                controls
                autoPlay
                className="w-full h-full rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {activeVideo && (
            <div className="p-4 bg-card">
              <div className="flex items-center gap-3">
                <img
                  src={activeVideo.image}
                  alt={activeVideo.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{activeVideo.name}</p>
                  <p className="text-sm text-muted-foreground">{activeVideo.location}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Testimonials;
