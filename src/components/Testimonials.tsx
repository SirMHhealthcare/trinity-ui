import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Jaipur",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "Dr. Sharma treated my thyroid problem without any side effects. After 3 months, my reports are normal now. Very grateful! 🙏",
    },
    {
      name: "Rajesh Kumar",
      location: "Jodhpur",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "I was suffering from chronic back pain for 2 years. Homeopathic treatment gave me relief when nothing else worked.",
    },
    {
      name: "Sunita Devi",
      location: "Ajmer",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      text: "My daughter had severe allergies. Dr. Sharma's treatment improved her immunity. She's much healthier now!",
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Patient Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            What Our Patients Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Real experiences from real patients across Rajasthan
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
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
            <p className="text-3xl md:text-4xl font-heading font-bold text-primary">4.9</p>
            <div className="flex justify-center gap-1 my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Google Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-heading font-bold text-primary">10,000+</p>
            <p className="text-sm text-muted-foreground mt-2">Happy Patients</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-heading font-bold text-primary">25+</p>
            <p className="text-sm text-muted-foreground mt-2">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
