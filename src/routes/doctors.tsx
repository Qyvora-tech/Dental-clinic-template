import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, Phone, UserCheck } from "lucide-react";
import clinicInteriorImg from "@/assets/clinic-interior.jpg";
import { PageBanner } from "@/components/site/page-banner";
import { ClinicalTeam } from "@/components/site/clinical-team";
import { VisitGuide } from "@/components/site/visit-guide";
import { CLINIC } from "@/lib/clinic";

const title = "Our Doctors & Specialists | City Smiles Clinic Sialkot";
const description =
  "Explore dental, orthodontic and skin consultations at City Smiles in Sialkot. Contact reception for clinician details and appointment availability.";

export const Route = createFileRoute("/doctors")({
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
  component: DoctorsPage,
});

function DoctorsPage() {
  return (
    <main>
      <PageBanner
        title="Meet Our Clinical Team & Specialists"
        subtitle="Find the right consultation for your smile and skin. Explore our care departments and speak with reception about clinician availability."
        breadcrumb="Doctors & Team"
        eyebrow="Clinical Specialists"
        badge="Dental & Skin Care"
        image={clinicInteriorImg}
        imageAlt="City Smiles modern clinical treatment rooms and specialists"
      />

      {/* 1. Doctors Cards */}
      <ClinicalTeam />

      {/* 2. Clinical Credentials Spotlight */}
      <VisitGuide />

      {/* 3. Real Patient Experiences & Stories */}

      {/* Bottom Consultation CTA */}
      <section className="border-t border-border bg-[#011e4d] py-16 text-white">
        <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-300">
            <UserCheck className="size-3.5" aria-hidden />
            <span>Consult With Your Preferred Specialist</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Schedule an In-Person Consultation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Discuss your smile or skin goals directly with our doctors. We ensure unhurried
            appointments with detailed explanations for every case.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book"
              className="press inline-flex items-center gap-2 rounded-md bg-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-sky-400"
            >
              <CalendarCheck className="size-4" aria-hidden />
              Book Appointment Now
            </Link>
            <a
              href={CLINIC.phoneHref}
              className="press inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/10"
            >
              <Phone className="size-4 text-sky-400" aria-hidden />
              Call Reception {CLINIC.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
