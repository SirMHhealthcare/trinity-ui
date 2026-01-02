import { ClipboardList, Calendar, Video, LucideIcon } from "lucide-react";
import { content, getPrimaryDoctor, clinic } from "@/config";

const iconMap: Record<string, LucideIcon> = {
  ClipboardList,
  Calendar,
  Video,
};

const HowItWorks = () => {
  const { howItWorks } = content;
  const doctor = getPrimaryDoctor();
  const colors = ["bg-primary", "bg-leaf-green", "bg-accent"];
  const icons = [ClipboardList, Calendar, Video];

  return (
    <section id="process" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            {howItWorks.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            {howItWorks.headline}
          </h2>
          <p className="text-muted-foreground text-lg">
            {howItWorks.description}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[16%] right-[16%] h-1 bg-gradient-to-r from-primary via-leaf-green to-accent rounded-full" />

          <div className="grid sm:grid-cols-3 gap-8">
            {howItWorks.steps.map((item, index) => {
              const IconComponent = icons[index];
              return (
                <div key={item.step} className="relative text-center group">
                  {/* Step Number */}
                  <div className={`w-20 h-20 mx-auto ${colors[index]} rounded-full flex items-center justify-center mb-6 shadow-card group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <IconComponent className="w-10 h-10 text-primary-foreground" />
                  </div>
                  
                  {/* Step Badge */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-8 h-8 bg-card border-2 border-primary rounded-full flex items-center justify-center z-20">
                    <span className="text-primary font-bold text-sm">{item.step}</span>
                  </div>

                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description.includes("Dr.") ? item.description : item.description.replace("Online मिलें", `${doctor.name} से online मिलें`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 md:mt-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-border rounded-2xl p-6 md:p-8 text-center">
          <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
            {howItWorks.infoBox.title}
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <strong>Free Follow-ups:</strong> {howItWorks.infoBox.freeFollowups}
            <br />
            <strong>आसान Cancellation:</strong> {howItWorks.infoBox.cancellation}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
