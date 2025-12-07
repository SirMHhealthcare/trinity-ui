import { Phone, Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "हमारे बारे में", href: "#about" },
    { label: "Booking करें", href: "#process" },
    { label: "संपर्क करें", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg md:text-xl">H</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-semibold text-foreground text-sm md:text-base">Dr. Mohsin Khan</p>
              <p className="text-xs text-muted-foreground">Homeopathy Clinic</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">+91 98765 43210</span>
            </Button>
            <Button variant="hero" size="default" asChild>
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
