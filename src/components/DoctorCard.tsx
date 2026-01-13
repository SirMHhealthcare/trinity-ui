import { GraduationCap, Award, MapPin, Phone, Mail } from "lucide-react";
import { Doctor } from "@/config/doctors";

interface DoctorCardProps {
  doctor: Doctor;
  role?: string;
}

const DoctorCard = ({ doctor, role = "Consultant" }: DoctorCardProps) => {
  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border hover:shadow-elevated transition-shadow duration-300">
      {/* Doctor Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={doctor.image}
          alt={`${doctor.name} - ${doctor.specialization}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {/* Experience Badge */}
        <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-3 py-2 rounded-xl text-sm font-semibold shadow-lg">
          {doctor.experience}+ Years
        </div>
      </div>
      
      {/* Doctor Info */}
      <div className="p-6">
        {/* Role Badge */}
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
          {role}
        </span>
        
        <h3 className="text-xl font-heading font-bold text-foreground mb-1">
          {doctor.name}
        </h3>
        <p className="text-primary font-medium text-sm mb-3">
          {doctor.degree}
        </p>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {doctor.bio.short}
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Award className="w-4 h-4 text-primary" />
            <span>{doctor.casesTreated} Cases</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>{doctor.specialization}</span>
          </div>
        </div>
        
        {/* Contact */}
        <div className="pt-4 border-t border-border space-y-2">
          <a 
            href={`tel:${doctor.phone}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            {doctor.phone.replace("+91", "+91 ")}
          </a>
          <a 
            href={`mailto:${doctor.email}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            {doctor.email}
          </a>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
