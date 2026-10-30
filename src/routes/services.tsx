import { createFileRoute } from "@tanstack/react-router";
import { DentalServices } from "@/components/site/dental-services";
import { PageBanner } from "@/components/site/page-banner";
import { SkinClinic } from "@/components/site/skin-clinic";

const title = "City Smiles Services | Dental & Skin Clinic Sialkot";
const description =
  "Browse City Smiles dental and skin clinic services in Sialkot, with clear treatment summaries and consultation pathways.";

export const Route = createFileRoute("/services")({
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
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main>
      <PageBanner
        title="Treatments, explained clearly"
        subtitle="Explore dental and skin care in one calm, considered place. Start with the concern you want to discuss, then book a consultation when you are ready."
        breadcrumb="All Services"
        eyebrow="City Smiles Care Guide"
        badge="Dental + Skin"
      />
      <DentalServices />
      <SkinClinic />
    </main>
  );
}
