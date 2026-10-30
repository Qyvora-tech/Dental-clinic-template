import { createFileRoute } from "@tanstack/react-router";
import clinicInteriorImg from "@/assets/clinic-interior.jpg";
import { PageBanner } from "@/components/site/page-banner";
import { Contact, Faqs } from "@/components/site/contact";

const title = "Contact City Smiles Clinic Sialkot | Address, Phone & Hours";
const description =
  "Contact City Smiles Dental & Skin Clinic in Sialkot. Find clinic address, opening hours, Google Maps directions, reception numbers, and FAQs.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main>
      <PageBanner
        title="Contact City Smiles Dental & Skin Clinic"
        subtitle="We welcome appointments and walk-in patients during clinic hours. Call our reception desk, message on WhatsApp, or get instant driving directions via Google Maps."
        breadcrumb="Contact & FAQs"
        eyebrow="Clinic Information"
        badge="Sialkot, Pakistan"
        image={clinicInteriorImg}
        imageAlt="Visit City Smiles Dental and Skin Clinic in Sialkot"
      />

      {/* 1. Clinic Contact Info, Timings & Google Maps */}
      <Contact />

      {/* 2. Interactive FAQs Accordion */}
      <Faqs />
    </main>
  );
}
