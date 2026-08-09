import { Helmet } from "react-helmet-async";
import { clinic } from "@/config/clinic";
import { getPrimaryDoctor } from "@/config/doctors";
import { services } from "@/config/services";

const SEOSchema = () => {
  const doctor = getPrimaryDoctor();
  
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Physician"],
    "@id": "https://trinityhomeopathy.com/#business",
    name: clinic.name,
    alternateName: clinic.shortName,
    description: "India's trusted online homeopathy clinic offering natural treatment for chronic diseases, allergies, skin disorders, mental wellness, and more. 15+ years experience. Online consultations available pan-India.",
    url: "https://trinityhomeopathy.com",
    telephone: clinic.contact.phone,
    email: clinic.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      postalCode: clinic.address.pincode,
      addressCountry: "IN"
    },
    areaServed: {
      "@type": "Country",
      name: "India"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.9124",
      longitude: "75.7873"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00"
      }
    ],
    priceRange: "₹₹",
    image: "https://trinityhomeopathy.com/og-image.jpg",
    sameAs: [
      clinic.socialLinks.facebook,
      clinic.socialLinks.instagram,
      clinic.socialLinks.youtube
    ].filter(link => link !== "#"),
    medicalSpecialty: "Homeopathy",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Homeopathic Treatments",
      itemListElement: services.map(service => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: service.title,
          description: service.description
        }
      }))
    }
  };

  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": "https://trinityhomeopathy.com/#doctor",
    name: doctor.name,
    description: doctor.bio.short,
    image: "https://trinityhomeopathy.com/doctor-portrait.jpg",
    telephone: doctor.phone,
    email: doctor.email,
    jobTitle: "Founder & Lead Consultant",
    address: {
      "@type": "PostalAddress",
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      addressCountry: "IN"
    },
    areaServed: {
      "@type": "Country",
      name: "India"
    },
    medicalSpecialty: {
      "@type": "MedicalSpecialty",
      name: doctor.specialization
    },
    worksFor: {
      "@id": "https://trinityhomeopathy.com/#business"
    },
    alumniOf: doctor.degree,
    knowsAbout: ["Homeopathy", "Natural Medicine", "Chronic Disease Treatment", "Holistic Healing", "Online Consultation", "Classical Homeopathy"]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://trinityhomeopathy.com/#website",
    url: "https://trinityhomeopathy.com",
    name: clinic.name,
    description: "Trusted homeopathy clinic in Jaipur",
    publisher: {
      "@id": "https://trinityhomeopathy.com/#business"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://trinityhomeopathy.com"
      }
    ]
  };

  return (
    <Helmet>
      <title>Trinity Homeopathy | Online Homeopathy Consultation India</title>
      <meta name="description" content="India's trusted online homeopathy clinic. Book a consultation for natural treatment of chronic diseases, allergies, skin, mental wellness and more. 15+ years experience." />
      <link rel="canonical" href="https://trinityhomeopathy.com/" />
      <meta property="og:url" content="https://trinityhomeopathy.com/" />
      <script type="application/ld+json">

        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(physicianSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default SEOSchema;
