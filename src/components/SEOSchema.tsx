import PageMeta from "@/components/PageMeta";

const HOME_TITLE = "Trinity Homeopathy | Online Homeopathy Consultation India";
const HOME_DESCRIPTION =
  "India's trusted online homeopathy clinic. Book a consultation for natural treatment of chronic diseases, allergies, skin, mental wellness and more. 15+ years experience.";

/**
 * Homepage head tags. Sitewide structured data (MedicalBusiness, Physician,
 * FAQPage) lives statically in index.html so crawlers see it without JS —
 * it is intentionally not repeated here.
 */
const SEOSchema = () => <PageMeta title={HOME_TITLE} description={HOME_DESCRIPTION} url="https://trinityhomeopathy.com/" />;

export default SEOSchema;
