import { Phone, Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Treatments", href: "#treatments" },
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHomePage) {
      e.preventDefault();
      navigate("/" + href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHomePage) {
      e.preventDefault();
      navigate("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/85 backdrop-blur-xl border-b border-primary/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Pops on dark background */}
          <a href="#home" onClick={handleLogoClick} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-primary/30 rounded-xl blur-lg group-hover:bg-primary/40 transition-all duration-300" />
              <img 
                src={logo} 
                alt="Trinity Homeopathy - Healing Naturally" 
                className="relative h-12 md:h-14 w-auto rounded-lg ring-2 ring-primary/40 shadow-xl shadow-black/30 group-hover:ring-primary/60 transition-all duration-300"
              />
            </div>
            <div className="block">
              <p className="font-heading font-semibold text-primary-foreground text-sm md:text-base">Trinity Homeopathy</p>
              <p className="text-xs text-primary-foreground/70">Natural Healing, Lasting Results</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-primary-foreground/80 hover:text-primary font-medium transition-all duration-300 hover:-translate-y-0.5 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:-bottom-1 after:left-0 after:bg-primary after:rounded-full after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 border-primary/50 text-primary-foreground hover:bg-primary/20 hover:text-primary-foreground">
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">Call Now</span>
            </Button>
            <Button variant="hero" size="lg" asChild>
              <a href="#booking" onClick={(e) => handleNavClick(e, "#booking")}>
                <Calendar className="w-4 h-4" />
                Book Appointment
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Dark frosted glass */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-foreground/95 backdrop-blur-xl border-b border-primary/20 transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {/* Mobile Logo Display */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-primary-foreground/20">
            <div className="relative">
              <div className="absolute -inset-1 bg-primary/30 rounded-lg blur-sm" />
              <img 
                src={logo} 
                alt="Trinity Homeopathy logo" 
                className="relative h-12 w-auto rounded-lg ring-2 ring-primary/40 shadow-lg"
              />
            </div>
            <div>
              <p className="font-heading font-semibold text-primary-foreground text-sm">Trinity Homeopathy</p>
              <p className="text-xs text-primary-foreground/70">Natural Healing</p>
            </div>
          </div>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                handleNavClick(e, item.href);
                setIsMenuOpen(false);
              }}
              className="py-3 px-4 text-primary-foreground/90 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 border-t border-primary-foreground/20 mt-2">
            <Button variant="hero" size="lg" className="w-full shadow-lg shadow-accent/30" asChild>
              <a href="#booking" onClick={(e) => handleNavClick(e, "#booking")}>
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
