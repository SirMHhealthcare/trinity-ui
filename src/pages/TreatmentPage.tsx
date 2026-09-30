import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { services, clinic } from "@/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TreatmentCTA from "@/components/TreatmentCTA";
import WhatsAppChat from "@/components/WhatsAppChat";
import treatmentHero from "@/assets/treatment-hero.jpg";

// Structured content blocks for richer treatment pages. Wrap text in **double asterisks** for bold.
type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

const renderInline = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );

// Placeholder detailed content for each service (Hinglish)
const treatmentDetails: Record<string, { title: string; content: string[]; blocks?: ContentBlock[] }> = {
  asthma: {
    title: "Asthma: Causes, Symptoms and Homeopathic Management",
    content: [],
    blocks: [
      { type: "h2", text: "What is Asthma?" },
      { type: "p", text: "Asthma is a **chronic condition affecting the airways of the lungs**. In people with asthma, the airways can become inflamed and narrowed, making it difficult for air to move in and out of the lungs." },
      { type: "p", text: "Asthma symptoms may come and go and can vary from mild to severe. Common symptoms include **coughing, wheezing, chest tightness and shortness of breath**. Symptoms may be triggered by allergens, respiratory infections, exercise, cold air, smoke, air pollution and other factors." },
      { type: "h2", text: "Common Symptoms of Asthma" },
      { type: "ul", items: [
        "Recurrent cough",
        "Wheezing or whistling sound while breathing",
        "Shortness of breath",
        "Chest tightness",
        "Difficulty breathing",
        "Cough that is worse at night or early morning",
        "Breathlessness during exercise",
        "Recurrent symptoms after exposure to dust, smoke or allergens",
      ] },
      { type: "h2", text: "Common Triggers of Asthma" },
      { type: "p", text: "Asthma triggers are different for different individuals. Common triggers include:" },
      { type: "ul", items: [
        "House dust and dust mites",
        "Pollen",
        "Animal allergens",
        "Smoke and tobacco smoke",
        "Air pollution",
        "Strong perfumes and chemical fumes",
        "Cold air",
        "Respiratory infections",
        "Exercise",
        "Stress and strong emotions",
        "Occupational dust or chemicals",
      ] },
      { type: "h2", text: "Homeopathic Management of Asthma" },
      { type: "p", text: "At **Trinity Homeopathy**, we believe in an individualized approach to patients with respiratory complaints. The patient's symptoms, triggers, frequency of attacks, type of cough, character of mucus, breathing pattern and associated complaints are considered during consultation." },
      { type: "p", text: "In traditional homeopathic practice, remedies such as **Arsenicum album, Ipecacuanha, Antimonium tartaricum, Spongia tosta, Blatta orientalis, Natrum sulphuricum and Kali carbonicum** may be considered depending on the individual's symptom pattern." },
      { type: "h3", text: "Arsenicum Album" },
      { type: "p", text: "Traditionally considered in cases where there is breathlessness accompanied by **restlessness, anxiety and a feeling of weakness**, particularly when symptoms have a characteristic pattern of aggravation." },
      { type: "h3", text: "Ipecacuanha" },
      { type: "p", text: "Traditionally considered when asthma is associated with **persistent coughing, wheezing and nausea**, especially when there is difficulty bringing up mucus." },
      { type: "h3", text: "Antimonium Tartaricum" },
      { type: "p", text: "Traditionally considered in certain respiratory cases with **noisy breathing, chest congestion and difficulty expectorating mucus**." },
      { type: "h3", text: "Spongia Tosta" },
      { type: "p", text: "Traditionally considered when there is a **dry, barking or irritating cough** with characteristic breathing symptoms." },
      { type: "h3", text: "Blatta Orientalis" },
      { type: "p", text: "Traditionally discussed in homeopathic practice for some cases of **allergic or bronchial respiratory complaints**, particularly when symptoms have a clear relationship with allergens." },
      { type: "h3", text: "Natrum Sulphuricum" },
      { type: "p", text: "Traditionally considered when respiratory symptoms appear to have a relationship with **damp weather or environmental changes**." },
      { type: "h3", text: "Kali Carbonicum" },
      { type: "p", text: "Traditionally considered in selected cases involving **breathlessness and characteristic chest or back symptoms**, according to the individual symptom picture." },
    ],
  },
  chronic: {
    title: "Chronic Diseases Treatment",
    content: [
      "Chronic diseases जैसे diabetes, thyroid disorders और arthritis के लिए एक holistic approach ज़रूरी है जो सिर्फ symptoms manage करने की जगह root cause को address करे। Trinity Homeopathy Clinic में हम classical homeopathy के through इन conditions का specialized treatment करते हैं, जो आपके body का natural balance restore करता है।",
      "हमारा treatment protocol एक comprehensive case-taking session से शुरू होता है जहाँ हम आपकी complete medical history, lifestyle factors और आपके body की unique response को समझते हैं। यह individualized approach ensure करता है कि selected remedy आपके constitution से perfectly match करे।",
      "ज़्यादातर patients को treatment के पहले कुछ हफ्तों में ही significant improvement महसूस होती है, और कई patients की conventional medications पर dependency भी धीरे-धीरे कम हो जाती है। हमारा goal सिर्फ condition manage करना नहीं, बल्कि आपके body को naturally heal होने में मदद करना है।",
      "हम आपकी healing journey में continuous support provide करते हैं, regular follow-ups के साथ progress monitor करते हैं और ज़रूरत के हिसाब से treatment adjust करते हैं। हमारे कई patients ने successfully अपनी chronic conditions manage की हैं और better quality of life पाई है।"
    ]
  },
  allergies: {
    title: "Allergies & Skin Treatment",
    content: [
      "Skin conditions और allergies अक्सर body की internal imbalances को express करने का तरीका होती हैं। चाहे आप eczema, psoriasis, urticaria या seasonal allergies से deal कर रहे हों, हमारा homeopathic approach underlying cause को target करके lasting relief provide करता है।",
      "Topical treatments के विपरीत जो सिर्फ symptoms suppress करते हैं, homeopathy अंदर से काम करती है - आपके immune system को strengthen करती है और hypersensitivity को reduce करती है। इसका मतलब है कम flare-ups और condition की severity में gradual reduction।",
      "हमारा treatment dietary habits, stress levels और genetic predispositions जैसे various factors को consider करता है। हम carefully selected homeopathic remedies के साथ-साथ lifestyle modifications को include करते हुए एक comprehensive treatment plan बनाते हैं।",
      "कई patients जो सालों से chronic skin issues से struggle कर रहे थे, हमारे treatment से significant relief पाते हैं। Homeopathy की gentle nature इसे सभी ages के लिए suitable बनाती है, including infants और sensitive skin वाले elderly patients।"
    ]
  },
  mental: {
    title: "Mental Wellness Treatment",
    content: [
      "Mental health उतनी ही important है जितनी physical health, और homeopathy anxiety, depression, stress और sleep disorders जैसी conditions के लिए एक gentle yet effective approach offer करती है। हमारी remedies emotional और mental plane पर काम करती हैं ताकि inner peace और balance restore हो सके।",
      "हम समझते हैं कि mental health issues deeply personal होते हैं और अक्सर physical symptoms से interconnected होते हैं। हमारी detailed consultation process complete picture समझने में मदद करती है, including आपके emotional patterns, fears और life circumstances।",
      "Mental wellness के लिए homeopathic treatment non-addictive है और conventional psychiatric medications से जुड़े common side effects से free है। कई patients treatment शुरू करने के हफ्तों में ही improved mood, better sleep और enhanced mental clarity experience करते हैं।",
      "हम अपने patients के लिए एक supportive और judgment-free environment provide करते हैं। Regular follow-ups आपकी progress track करने और optimal results के लिए necessary adjustments करने में help करते हैं।"
    ]
  },
  child: {
    title: "Child Health Treatment",
    content: [
      "Children homeopathic treatment पर exceptionally well respond करते हैं क्योंकि उनकी high vitality और untainted constitutions होती है। हम recurrent infections, growth issues, behavioral problems और common childhood ailments सहित wide range की pediatric conditions treat करते हैं।",
      "हमारी gentle remedies safe, pleasant-tasting और easy to administer हैं, जो treatment को बच्चों और parents दोनों के लिए stress-free बनाती हैं। हम strong medications से symptoms suppress करने की जगह आपके बच्चे की natural immunity build करने पर focus करते हैं।",
      "Common conditions जो हम treat करते हैं उनमें recurrent colds और coughs, tonsillitis, adenoids, allergies, asthma, digestive issues और attention difficulties शामिल हैं। हमारा holistic approach bedwetting, night terrors और teething troubles जैसे issues को भी address करता है।",
      "हम parents के साथ closely work करते हैं ताकि हर बच्चे के unique temperament और health patterns को समझ सकें। यह collaborative approach ensure करता है कि आपके बच्चे को personalized care मिले जो उनकी overall growth और development को support करे।"
    ]
  },
  joint: {
    title: "Joint & Muscle Treatment",
    content: [
      "Joint और muscle pain आपकी quality of life को significantly impact कर सकता है, mobility और daily activities को limit करता है। हमारा homeopathic approach arthritis, back pain, sciatica, frozen shoulder और sports injuries जैसी conditions को root cause पर address करता है।",
      "Painkillers पर rely करने की जगह जो सिर्फ symptoms mask करते हैं, हम constitutional remedies use करते हैं जो inflammation reduce करने, damaged tissues repair करने और joint health naturally restore करने में काम करती हैं। कई patients हफ्तों में ही improved mobility और reduced pain experience करते हैं।",
      "हमारा treatment protocol acute pain relief के लिए specific remedies को long-term healing के लिए constitutional treatment के साथ combine कर सकता है। हम joint health support करने वाले exercises और lifestyle modifications पर guidance भी provide करते हैं।",
      "चाहे आप age-related joint degeneration से deal कर रहे हों या injury-related muscle pain से, हमारे personalized treatment plans conventional pain management के side effects के बिना function restore करने और quality of life improve करने का aim रखते हैं।"
    ]
  },
  digestive: {
    title: "Digestive Health Treatment",
    content: [
      "Digestive health overall well-being के लिए fundamental है, और acidity, IBS, constipation और bloating जैसी issues daily life को severely affect कर सकती हैं। हमारा homeopathic treatment आपके gut का natural balance restore करके digestive disorders address करता है।",
      "हम एक comprehensive approach लेते हैं, dietary habits, stress levels और lifestyle patterns जैसे factors को consider करते हुए जो digestive issues में contribute करते हैं। यह हमें सिर्फ symptoms नहीं बल्कि आपकी condition के underlying causes treat करने की allow करता है।",
      "Common conditions जो हम treat करते हैं उनमें GERD, gastritis, ulcerative colitis, Crohn's disease, food intolerances और functional digestive disorders शामिल हैं। हमारी remedies digestive tract heal करने और normal function restore करने में काम करती हैं।",
      "कई patients सालों से persist कर रहे chronic digestive issues से relief experience करते हैं। हमारा gentle approach particularly उनके लिए beneficial है जिन्होंने conventional digestive medications से sensitivity develop कर ली है।"
    ]
  },
  women: {
    title: "Women's Health Treatment",
    content: [
      "Women's health में hormonal balance, reproductive health और life transitions से related unique conditions शामिल हैं। हम PCOS, irregular periods, menstrual pain, infertility और menopausal symptoms का classical homeopathy के through specialized treatment करते हैं।",
      "हमारा approach recognize करता है कि women's health issues अक्सर emotional और hormonal factors से interconnected होते हैं। हम detailed consultations conduct करते हैं ताकि आपकी complete symptom picture समझ सकें और truly individualized treatment provide कर सकें।",
      "Homeopathy fibroids, ovarian cysts, endometriosis और hormonal imbalances जैसी conditions के लिए hormone replacement therapy के side effects के बिना एक safe और effective alternative offer करती है। कई महिलाओं को lasting relief और improved quality of life मिलती है।",
      "हम महिलाओं को pregnancy planning, postpartum recovery और menopause जैसी life transitions में भी support करते हैं। हमारी gentle remedies इन sensitive periods में safe हैं और naturally optimal health maintain करने में help करती हैं।"
    ]
  },
  immunity: {
    title: "Immunity Boost Treatment",
    content: [
      "एक strong immune system illness के खिलाफ आपकी best defense है। अगर आप frequently बीमार पड़ते हैं, recovery में ज्यादा time लगता है, या energy low feel होती है, तो हमारा immunity-boosting treatment आपकी natural defenses strengthen करने में मदद कर सकता है।",
      "हमारा approach simple supplements से beyond जाकर low immunity के root causes address करता है। हम chronic stress, sleep patterns, nutritional deficiencies और underlying health conditions जैसे factors consider करते हैं जो आपके immune function को compromise कर रहे हों।",
      "Constitutional homeopathic treatment आपके body की vital force enhance करने में काम करता है, जिससे आप infections के against more resistant बनते हैं और overall vitality improve होती है। कई patients कम बीमारियाँ और faster recovery times report करते हैं।",
      "चाहे आप prolonged illness से recover कर रहे हों, seasonal changes के लिए prepare कर रहे हों, या simply अपनी health optimize करना चाहते हों, हमारे personalized immunity treatment plans naturally robust health achieve और maintain करने में आपकी help कर सकते हैं।"
    ]
  }
};

const TreatmentPage = () => {
  const { treatmentId } = useParams<{ treatmentId: string }>();
  const service = services.find(s => s.id === treatmentId);
  const details = treatmentDetails[treatmentId || ""];

  if (!service || !details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Treatment not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-24">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={treatmentHero}
            alt={service.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Title Section */}
        <div className="container mx-auto px-4 py-8">
          <Link 
            to="/#services" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            {details.title}
          </h1>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto space-y-6">
            {details.blocks
              ? details.blocks.map((block, index) => {
                  switch (block.type) {
                    case "h2":
                      return (
                        <h2 key={index} className="text-2xl md:text-3xl font-heading font-bold text-foreground pt-4">
                          {block.text}
                        </h2>
                      );
                    case "h3":
                      return (
                        <h3 key={index} className="text-xl font-heading font-semibold text-foreground pt-2">
                          {block.text}
                        </h3>
                      );
                    case "ul":
                      return (
                        <ul key={index} className="list-disc pl-6 space-y-2 text-muted-foreground text-lg leading-relaxed">
                          {block.items.map((item, i) => (
                            <li key={i}>{renderInline(item)}</li>
                          ))}
                        </ul>
                      );
                    default:
                      return (
                        <p key={index} className="text-muted-foreground text-lg leading-relaxed">
                          {renderInline(block.text)}
                        </p>
                      );
                  }
                })
              : details.content.map((paragraph, index) => (
                  <p 
                    key={index} 
                    className="text-muted-foreground text-lg leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
          </div>
        </div>
      </main>

      <Footer />
      <TreatmentCTA />
      <WhatsAppChat phoneNumber={clinic.contact.whatsapp} />
    </div>
  );
};

export default TreatmentPage;
