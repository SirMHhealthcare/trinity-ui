import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clinic } from "@/config";

const TreatmentCTA = () => {
  const scrollToBooking = () => {
    window.location.href = "/#booking";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm">
            <a 
              href={`tel:${clinic.contact.phone}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{clinic.contact.phoneDisplay}</span>
            </a>
            <a 
              href={`mailto:${clinic.contact.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{clinic.contact.email}</span>
            </a>
          </div>
          <Button onClick={scrollToBooking} size="lg" className="w-full sm:w-auto">
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TreatmentCTA;
