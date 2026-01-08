import { Helmet } from "react-helmet-async";
import { clinic } from "@/config/clinic";
import { getPrimaryDoctor } from "@/config/doctors";
import { services } from "@/config/services";

const SEOSchema = () => {
  const doctor = getPrimaryDoctor();
  
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness", "Physician"],
    "@id": "https://drsharma-homeopathy.com/#business",
    name: clinic.name,
    alternateName: clinic.shortName,
    description: "Trusted homeopathy doctor in Jaipur offering natural treatment for chronic diseases, allergies, skin disorders, and more. 25+ years experience.",
    url: "https://drsharma-homeopathy.com",
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
    image: "https://drsharma-homeopathy.com/og-image.jpg",
    sameAs: [
      clinic.socialLinks.facebook,
      clinic.socialLinks.instagram,
      clinic.socialLinks.youtube
    ].filter(link => link !== "#"),
    medicalSpecialty: "Homeopathy",
    availableService: services.map(service => ({
      "@type": "MedicalProcedure",
      name: service.title,
      description: service.description
    }))
  };

  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": "https://drsharma-homeopathy.com/#doctor",
    name: doctor.name,
    description: doctor.bio.short,
    image: "https://drsharma-homeopathy.com/doctor-portrait.jpg",
    telephone: doctor.phone,
    email: doctor.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      addressCountry: "IN"
    },
    medicalSpecialty: {
      "@type": "MedicalSpecialty",
      name: doctor.specialization
    },
    worksFor: {
      "@id": "https://drsharma-homeopathy.com/#business"
    },
    alumniOf: doctor.degree,
    knowsAbout: ["Homeopathy", "Natural Medicine", "Chronic Disease Treatment", "Holistic Healing"]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://drsharma-homeopathy.com/#website",
    url: "https://drsharma-homeopathy.com",
    name: clinic.name,
    description: "Trusted homeopathy clinic in Jaipur",
    publisher: {
      "@id": "https://drsharma-homeopathy.com/#business"
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
        item: "https://drsharma-homeopathy.com"
      }
    ]
  };

  return (
    <Helmet>
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
