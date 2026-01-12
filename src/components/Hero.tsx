import { Button } from "@/components/ui/button";
import { Calendar, Shield, Award, Users, Sparkles } from "lucide-react";
import { content, clinic } from "@/config";
import logoImage from "@/assets/logo.jpg";

const Hero = () => {
  const { hero } = content;

  const stats = [
    { icon: Users, value: hero.stats.patients.value, label: hero.stats.patients.label },
    { icon: Award, value: hero.stats.experience.value, label: hero.stats.experience.label },
    { icon: Shield, value: hero.stats.natural.value, label: hero.stats.natural.label },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 md:pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-cream opacity-80" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">{hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-4">
              {hero.headline}
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-6">
              {hero.headlineHighlight}
            </p>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button variant="hero" size="xl" asChild>
                <a href="#booking">
                  <Calendar className="w-5 h-5" />
                  {hero.ctaPrimary}
                </a>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href="#treatments">
                  {hero.ctaSecondary}
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <stat.icon className="w-5 h-5 text-accent" />
                    <span className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clinic Logo Visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-slide-up">
            <div className="relative">
              {/* Main Logo Container */}
              <div className="w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-3xl bg-gradient-to-br from-card to-secondary shadow-elevated flex items-center justify-center p-8 border border-border">
                <img
                  src={logoImage}
                  alt={clinic.name}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              
              {/* Trust Badge */}
              <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-2xl shadow-card border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{hero.trustBadge.title}</p>
                    <p className="text-xs text-muted-foreground">Pan-India Service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
