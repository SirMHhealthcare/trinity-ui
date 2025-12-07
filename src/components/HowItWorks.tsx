import { ClipboardList, Calendar, Video, MessageCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      icon: ClipboardList,
      title: "जानकारी भरें",
      description: "अपनी basic details और health concern बताएँ",
      color: "bg-primary",
    },
    {
      step: "2",
      icon: Calendar,
      title: "समय चुनें",
      description: "अपनी सुविधा के अनुसार slot चुनें",
      color: "bg-leaf-green",
    },
    {
      step: "3",
      icon: MessageCircle,
      title: "Payment करें",
      description: "₹500 consultation fee दें और Google Meet link पाएँ",
      color: "bg-accent",
    },
    {
      step: "4",
      icon: Video,
      title: "Video Consultation",
      description: "Dr. Sharma से online मिलें और treatment plan पाएँ",
      color: "bg-earth",
    },
  ];

  return (
    <section id="process" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            आसान Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            4 आसान Steps में Book करें
          </h2>
          <p className="text-muted-foreground text-lg">
            घर बैठे अपनी consultation लें
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-1 bg-gradient-to-r from-primary via-leaf-green to-accent rounded-full" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={item.title} className="relative text-center group">
                {/* Step Number */}
                <div className={`w-20 h-20 mx-auto ${item.color} rounded-full flex items-center justify-center mb-6 shadow-card group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <item.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                
                {/* Step Badge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-8 h-8 bg-card border-2 border-primary rounded-full flex items-center justify-center z-20">
                  <span className="text-primary font-bold text-sm">{item.step}</span>
                </div>

                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 md:mt-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-border rounded-2xl p-6 md:p-8 text-center">
          <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
            💡 ज़रूरी जानकारी
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <strong>Free Follow-ups:</strong> पहली consultation के बाद, 1 महीने तक सभी follow-up FREE हैं!
            <br />
            <strong>आसान Cancellation:</strong> Appointment से 2 घंटे पहले cancel करें और full refund पाएँ।
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
