import { useParams, Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import { ArrowLeft } from "lucide-react";
import { services, clinic } from "@/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TreatmentCTA from "@/components/TreatmentCTA";
import WhatsAppChat from "@/components/WhatsAppChat";
import treatmentHero from "@/assets/treatment-hero.jpg";

const SITE_URL = "https://trinityhomeopathy.com";

// Unique search metadata per treatment page
const treatmentSeo: Record<string, { title: string; description: string }> = {
  chronic: {
    title: "Homeopathy for Chronic Diseases | Trinity Homeopathy",
    description:
      "Homeopathic treatment for diabetes, thyroid and arthritis. Root-cause care with 15+ years experience. Online consultation across India.",
  },
  allergies: {
    title: "Homeopathy for Allergies & Skin Problems | Trinity",
    description:
      "Natural homeopathic care for eczema, psoriasis, urticaria and seasonal allergies. Lasting relief without suppressing symptoms. Online consultation.",
  },
  mental: {
    title: "Homeopathy for Anxiety, Stress & Sleep | Trinity",
    description:
      "Gentle, non-addictive homeopathic treatment for anxiety, depression, stress and insomnia. Personalised care online, anywhere in India.",
  },
  child: {
    title: "Child Health Homeopathy Treatment | Trinity Homeopathy",
    description:
      "Safe homeopathic remedies for kids: recurrent colds, tonsillitis, allergies, immunity and growth. Pleasant-tasting and side-effect free.",
  },
  joint: {
    title: "Homeopathy for Joint & Muscle Pain | Trinity Homeopathy",
    description:
      "Treatment for arthritis, back pain, sciatica and frozen shoulder. Reduce inflammation and restore mobility without painkiller side effects.",
  },
  digestive: {
    title: "Homeopathy for Acidity, IBS & Digestion | Trinity",
    description:
      "Homeopathic care for acidity, GERD, IBS, gastritis and constipation. Restore gut balance naturally with online consultation across India.",
  },
  women: {
    title: "Women's Health Homeopathy: PCOS & Periods | Trinity",
    description:
      "Homeopathic treatment for PCOS, irregular or painful periods, fibroids and menopause. Hormonal balance without HRT side effects.",
  },
  immunity: {
    title: "Immunity Boost Homeopathy Treatment | Trinity",
    description:
      "Strengthen natural immunity with constitutional homeopathy. Fewer infections, faster recovery and better energy. Online consultation in India.",
  },
};

// Placeholder detailed content for each service (Hinglish)
const treatmentDetails: Record<string, { title: string; content: string[] }> = {

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

  const seo = treatmentSeo[service.id] ?? {
    title: `${details.title} | Trinity Homeopathy`,
    description: service.description,
  };
  const pageUrl = `${SITE_URL}/treatment/${service.id}`;
  const relatedServices = services.filter(s => s.id !== service.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title={seo.title} description={seo.description} url={pageUrl} ogType="article">
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: details.title,
            description: seo.description,
            url: pageUrl,
            about: { "@type": "MedicalProcedure", name: details.title },
            provider: { "@id": `${SITE_URL}/#business` },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Treatments", item: `${SITE_URL}/#treatments` },
              { "@type": "ListItem", position: 3, name: details.title, item: pageUrl },
            ],
          })}
        </script>
      </PageMeta>

      <Header />
      
      <main className="pt-20 pb-24">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={treatmentHero}
            alt={`Homeopathic ${service.title.toLowerCase()} treatment at Trinity Homeopathy`}
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Title Section */}
        <div className="container mx-auto px-4 py-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/#treatments" className="hover:text-primary transition-colors">Treatments</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{details.title}</li>
            </ol>
          </nav>
          <Link 
            to="/#treatments" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Treatments
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            {details.title}
          </h1>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto space-y-6">
            {details.content.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-muted-foreground text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Related treatments - internal linking */}
        <div className="container mx-auto px-4 pb-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Other Treatments We Offer
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {relatedServices.map(s => (
                <li key={s.id}>
                  <Link
                    to={`/treatment/${s.id}`}
                    className="block rounded-lg border border-border bg-card p-4 hover:border-primary transition-colors"
                  >
                    <span className="font-medium text-foreground">{s.title}</span>
                    <span className="block text-sm text-muted-foreground mt-1">{s.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted-foreground">
              Ready to start?{" "}
              <Link to="/#booking" className="text-primary underline underline-offset-4">
                Book a free online consultation
              </Link>{" "}
              or{" "}
              <Link to="/#about" className="text-primary underline underline-offset-4">
                learn more about Trinity Homeopathy
              </Link>
              .
            </p>
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
