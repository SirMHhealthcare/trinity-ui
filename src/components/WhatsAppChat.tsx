import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppChatProps {
  phoneNumber: string;
  defaultMessage?: string;
}

const WhatsAppChat = ({ phoneNumber, defaultMessage = "Namaste! Mujhe appointment book karna hai." }: WhatsAppChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show button after a short delay
    const buttonTimer = setTimeout(() => setShowButton(true), 1000);
    // Auto-open popup after 2 seconds
    const popupTimer = setTimeout(() => setIsOpen(true), 2000);

    return () => {
      clearTimeout(buttonTimer);
      clearTimeout(popupTimer);
    };
  }, []);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center ${
          showButton ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        aria-label="WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Popup */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#128C7E] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Dr. Homeopathy</p>
              <p className="text-xs text-white/80">Online | Reply within minutes</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/10 rounded-full p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="p-4 bg-[#ECE5DD] min-h-[120px]">
          <div className="bg-white rounded-lg p-3 shadow-sm max-w-[85%]">
            <p className="text-sm text-foreground">
              नमस्ते! 👋 आपकी सेहत से जुड़ी कोई भी बात हो, हम यहाँ हैं। WhatsApp पर संपर्क करें!
            </p>
            <p className="text-[10px] text-muted-foreground mt-1 text-right">अभी</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-card">
          <Button
            onClick={handleWhatsAppClick}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-medium"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp पर Chat करें
          </Button>
        </div>
      </div>
    </>
  );
};

export default WhatsAppChat;
