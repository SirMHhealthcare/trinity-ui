import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import BookingSection from "@/components/BookingSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <BookingSection />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppChat phoneNumber="919876543210" />
    </div>
  );
};

export default Index;
