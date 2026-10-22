import { useParams, Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import { ArrowLeft } from "lucide-react";
import { clinic } from "@/config";
import { treatments, getTreatment } from "@/lib/treatments";
import Markdown from "@/components/Markdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TreatmentCTA from "@/components/TreatmentCTA";
import WhatsAppChat from "@/components/WhatsAppChat";
import treatmentHero from "@/assets/treatment-hero.jpg";

const SITE_URL = "https://trinityhomeopathy.com";

const TreatmentPage = () => {
  const { treatmentId } = useParams<{ treatmentId: string }>();
  const treatment = getTreatment(treatmentId);

  if (!treatment) {
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

  const pageUrl = `${SITE_URL}/treatment/${treatment.id}`;
  const relatedTreatments = treatments.filter(t => t.id !== treatment.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title={treatment.seoTitle} description={treatment.seoDescription} url={pageUrl} ogType="article">
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: treatment.pageTitle,
            description: treatment.seoDescription,
            url: pageUrl,
            about: { "@type": "MedicalProcedure", name: treatment.pageTitle },
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
              { "@type": "ListItem", position: 3, name: treatment.pageTitle, item: pageUrl },
            ],
          })}
        </script>
      </PageMeta>

      <Header />
      
      <main className="pt-20 pb-24">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={treatment.hero ?? treatmentHero}
            alt={`Homeopathic ${treatment.title.toLowerCase()} treatment at Trinity Homeopathy`}
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
              <li className="text-foreground">{treatment.pageTitle}</li>
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
            {treatment.pageTitle}
          </h1>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <Markdown source={treatment.body} />
          </div>
        </div>

        {/* Related treatments - internal linking */}
        <div className="container mx-auto px-4 pb-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Other Treatments We Offer
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {relatedTreatments.map(s => (
                <li key={s.id}>
                  <Link
                    to={`/treatment/${s.id}`}
                    className="block rounded-lg border border-border bg-card p-4 hover:border-primary transition-colors"
                  >
                    <span className="font-medium text-foreground">{s.title}</span>
                    <span className="block text-sm text-muted-foreground mt-1">{s.summary}</span>
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
