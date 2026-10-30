import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Phone } from "lucide-react";
import cleaningImg from "@/assets/cleaning.jpg";
import { PageBanner } from "@/components/site/page-banner";
import { DentalServices } from "@/components/site/dental-services";
import { TreatmentVisualiser } from "@/components/site/treatment-visualiser";
import { BeforeAfter } from "@/components/site/before-after";
import { Education } from "@/components/site/education";
import { CLINIC } from "@/lib/clinic";
import { VisitGuide } from "@/components/site/visit-guide";

const title = "Dental Services in Sialkot | Implants, Braces & General Dentistry";
const description =
  "Explore complete dental treatments at City Smiles Sialkot: teeth cleaning, root canal, dental implants, ceramic braces, clear aligners, and aesthetic smile makeovers.";

export const Route = createFileRoute("/dental")({
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
  component: DentalPage,
});

function DentalPage() {
  return (
    <main>
      <PageBanner
        title="Comprehensive Dental Care & Aesthetics"
        subtitle="Precision dentistry tailored for each patient — from routine ultrasonic scaling and painless root canals to permanent titanium implants and digital orthodontics in Sialkot."
        breadcrumb="Dental Services"
        eyebrow="Dental Care Department"
        badge="16 Clinical Treatments"
        image={cleaningImg}
        imageAlt="Comprehensive dental care and treatments at City Smiles"
      />

      {/* 1. All Categorized Dental Services */}
      <DentalServices />
      <VisitGuide />

      {/* 2. Interactive 3D Treatment Visualiser */}
      <TreatmentVisualiser />

      {/* 3. Before & After Smile Transformations */}
      <BeforeAfter />

      {/* 4. Patient Video Guides */}
      <Education />

      {/* Bottom CTA Banner */}
      <section className="border-t border-border bg-[#011e4d] py-16 text-white">
        <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Book Your Dental Examination Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Consult with our dental surgeons. We provide a thorough diagnosis, discuss all treatment
            options, and provide a clear written estimate before starting.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book"
              className="press inline-flex items-center gap-2 rounded-md bg-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-sky-400"
            >
              <CalendarCheck className="size-4" aria-hidden />
              Book Dental Consultation
            </Link>
            <a
              href={CLINIC.phoneHref}
              className="press inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/10"
            >
              <Phone className="size-4 text-sky-400" aria-hidden />
              Call {CLINIC.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
