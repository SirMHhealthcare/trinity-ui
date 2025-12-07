import { Award, GraduationCap, Clock, MapPin } from "lucide-react";
import doctorImage from "@/assets/doctor-portrait.jpg";

const AboutSection = () => {
  const credentials = [
    { icon: GraduationCap, label: "BHMS, MD (Homeopathy)" },
    { icon: Award, label: "25+ Years Experience" },
    { icon: Clock, label: "10,000+ Cases Treated" },
    { icon: MapPin, label: "Jaipur, Rajasthan" },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={doctorImage}
                alt="Dr. Sharma - Homeopathy Specialist"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-card">
              <p className="text-4xl font-heading font-bold">25+</p>
              <p className="text-sm opacity-90">Years of Healing</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              About Dr. Sharma
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              आपकी सेहत के लिए समर्पित
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Dr. Sharma ने पिछले 25 सालों में हज़ारों मरीज़ों को प्राकृतिक Homeopathic treatment से ठीक किया है। उनका मानना है कि हर मरीज़ unique है और इसीलिए treatment भी personalized होना चाहिए।
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Chronic diseases, allergies, skin problems, mental health - किसी भी health issue में Dr. Sharma का gentle और effective approach आपको natural healing की राह दिखाता है।
            </p>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
