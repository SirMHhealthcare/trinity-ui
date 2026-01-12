import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { getPrimaryDoctor, clinic, footerQuickLinks, services as servicesData, content } from "@/config";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const doctor = getPrimaryDoctor();
  const { footer } = content;

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      {/* Large Logo Brand Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/20 rounded-2xl blur-lg" />
              <img 
                src={logo} 
                alt="Trinity Homeopathy - Healing Naturally" 
                className="relative h-24 md:h-28 w-auto rounded-xl shadow-xl shadow-primary/30"
              />
            </div>
          <div className="text-center md:text-left">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">Trinity Homeopathy</h3>
              <p className="text-primary-foreground/80 text-lg">Natural Healing, Lasting Results</p>
              <p className="text-primary-foreground/60 text-sm mt-1">Trusted Care • Pan-India Service</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="Trinity Homeopathy - Healing Naturally" 
                className="h-14 w-auto rounded-lg shadow-lg shadow-primary/20"
              />
              <div>
                <p className="font-heading font-semibold">Trinity Homeopathy</p>
                <p className="text-xs text-primary-foreground/70">Natural Healing Clinic</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              {clinic.description}
            </p>
            <div className="flex gap-3">
              <a href={clinic.socialLinks.facebook} className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={clinic.socialLinks.instagram} className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={clinic.socialLinks.youtube} className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">{footer.quickLinks.title}</h4>
            <ul className="space-y-3">
              {footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-primary-foreground/80 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">{footer.servicesTitle}</h4>
            <ul className="space-y-3">
              {servicesData.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <a href="#treatments" className="text-primary-foreground/80 hover:text-primary transition-colors text-sm">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">{footer.contactTitle}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  {clinic.address.full}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href={`tel:${clinic.contact.phone}`} className="text-primary-foreground/80 hover:text-primary text-sm">
                  {clinic.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href={`mailto:${clinic.contact.email}`} className="text-primary-foreground/80 hover:text-primary text-sm">
                  {clinic.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-primary-foreground/80 text-sm">
                  <p>{clinic.hours.weekdays}</p>
                  <p>{clinic.hours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} {clinic.name}. {footer.copyright}
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-primary-foreground/60 hover:text-primary transition-colors">
              {footer.legal.privacy}
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary transition-colors">
              {footer.legal.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
