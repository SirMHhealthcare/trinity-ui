import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">H</span>
              </div>
              <div>
                <p className="font-heading font-semibold">Dr. Mohsin Khan</p>
                <p className="text-xs text-primary-foreground/70">Homeopathy Clinic</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              Classical homeopathy के ज़रिए प्राकृतिक और समग्र उपचार। 
              राजस्थान भर में मरीज़ों को personalized care।
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Services", "Doctor के बारे में", "Appointment Book करें", "संपर्क करें"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-primary-foreground/80 hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">हमारी Services</h4>
            <ul className="space-y-3">
              {["Chronic Diseases", "Skin & Allergies", "Mental Wellness", "Child Health", "Women's Health"].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-primary-foreground/80 hover:text-primary transition-colors text-sm">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">संपर्क करें</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Vaishali Nagar, Near Central Park, Jaipur, Rajasthan - 302021
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919876543210" className="text-primary-foreground/80 hover:text-primary text-sm">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:doctor@homeopathy.com" className="text-primary-foreground/80 hover:text-primary text-sm">
                  doctor@homeopathy.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-primary-foreground/80 text-sm">
                  <p>सोमवार - शनिवार: 10 AM - 7 PM</p>
                  <p>रविवार: Appointment पर</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm text-center md:text-left">
            © 2025 Trinity Homeopathy Clinic. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-primary-foreground/60 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
