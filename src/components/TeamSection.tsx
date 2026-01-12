import { doctors } from "@/config/doctors";
import { content } from "@/config/content";
import DoctorCard from "./DoctorCard";

const TeamSection = () => {
  const { team } = content;

  return (
    <section id="team" className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {team.badge}
          </span>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
            {team.headline}
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {team.description}
          </p>
        </div>

        {/* Doctor Cards Grid - Scalable for future doctors */}
        <div className={`grid gap-8 ${doctors.length === 1 ? 'max-w-sm mx-auto' : 'md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'}`}>
          {doctors.map((doctor, index) => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              role={index === 0 ? "Founder & Lead Consultant" : "Consultant"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
