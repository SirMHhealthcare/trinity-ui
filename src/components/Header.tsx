import { Phone, Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Book Now", href: "#booking" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-cream/95 via-warm-white/95 to-sage/20 backdrop-blur-md border-b border-leaf-green/20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Trinity Homeopathy - Healing Naturally" 
              className="h-14 md:h-[4.5rem] w-auto rounded-lg"
            />
            <div className="hidden sm:block">
              <p className="font-heading font-semibold text-foreground text-sm md:text-base">Dr. Mohsin Khan</p>
              <p className="text-xs text-muted-foreground">Trinity Homeopathy</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-primary font-medium transition-all duration-200 hover:scale-110"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 border-primary/30 hover:bg-primary/10">
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">Call Now</span>
            </Button>
            <Button variant="hero" size="lg" className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all" asChild>
              <a href="#booking">
                <Calendar className="w-4 h-4" />
                Book Appointment
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="py-3 px-4 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 border-t border-border mt-2">
            <Button variant="hero" size="lg" className="w-full" asChild>
              <a href="#booking">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
