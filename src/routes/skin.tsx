import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, MessageCircle, Phone, Sparkles } from "lucide-react";
import { PageBanner } from "@/components/site/page-banner";
import { SkinClinic } from "@/components/site/skin-clinic";
import { Education } from "@/components/site/education";
import { CLINIC } from "@/lib/clinic";
import { VisitGuide } from "@/components/site/visit-guide";

const title = "Skin Clinic in Sialkot | Clinical Dermatology, Acne & Hydrafacial";
const description =
  "City Smiles Skin Clinic Sialkot provides clinical dermatological care: Hydrafacial, acne scars, pigmentation, chemical peels, and anti-aging treatments.";

export const Route = createFileRoute("/skin")({
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
  component: SkinPage,
});

function SkinPage() {
  return (
    <main>
      <PageBanner
        title="Clinical Dermatology & Skin Aesthetics"
        subtitle="Skin care starts with understanding your concerns, history and routine. Explore consultation and treatment options tailored to your skin in Sialkot."
        breadcrumb="Skin Clinic"
        eyebrow="Dermatology Department"
        badge="13 Medical Protocols"
      />

      {/* 1. Full Medical Dermatology Section */}
      <SkinClinic />
      <VisitGuide skin />

      {/* 2. Patient Education Videos */}
      <Education skin />

      {/* 3. Skin Care Consultation CTA */}
      <section className="border-t border-border bg-[#011e4d] py-16 text-white">
        <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-300">
            <Sparkles className="size-3.5" aria-hidden />
            <span>Structured Dermatological Assessment</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Book Your Clinical Skin Consultation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Every skin journey begins with an in-depth examination of your skin type, medical
            history, and current routine. Receive a customized, clinically validated treatment plan.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book"
              className="press inline-flex items-center gap-2 rounded-md bg-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-sky-400"
            >
              <CalendarCheck className="size-4" aria-hidden />
              Book Skin Consultation
            </Link>
            <a
              href={CLINIC.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="press inline-flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-950/40 px-6 py-3.5 text-sm font-semibold text-emerald-300 hover:bg-emerald-900/50"
            >
              <MessageCircle className="size-4" aria-hidden />
              Send Photos on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
