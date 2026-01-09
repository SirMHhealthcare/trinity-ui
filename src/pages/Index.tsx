import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import BookingSection from "@/components/BookingSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import SEOSchema from "@/components/SEOSchema";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOSchema />
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <Services />
        <HowItWorks />
        <BookingSection />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppChat phoneNumber="00919782301786" />
    </div>
  );
};

export default Index;
