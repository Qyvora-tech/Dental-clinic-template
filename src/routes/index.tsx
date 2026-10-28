import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { Hero } from "@/components/site/hero";
import { CoreHighlights } from "@/components/site/core-highlights";
import { Trust } from "@/components/site/trust";
import { FeaturedShowcase } from "@/components/site/featured-showcase";
import { DoctorLead } from "@/components/site/doctor-lead";
import { PatientStories } from "@/components/site/doctors";
import { Faqs } from "@/components/site/contact";
import { CLINIC } from "@/lib/clinic";

const title = "City Smiles Dental & Skin Clinic, Sialkot | Modern Dentistry & Aesthetics";
const description =
  "City Smiles Dental & Skin Clinic in Sialkot offers advanced dental implants, clear aligners, laser teeth whitening, root canal, and clinical skin care. Book a consultation today.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <>
      <main>
        {/* 1. Hero with Location Quick-Bar */}
        <Hero />

        {/* 2. 4 Core Highlight Service Cards (Emergency, Implants, Braces, Skin) */}
        <CoreHighlights />

        {/* 3. Alternating Feature Showcases */}
        <FeaturedShowcase />

        {/* 4. Trust Standards & Clinical Protocol */}
        <Trust />

        {/* 5. Lead Doctor Credentials Banner */}
        <DoctorLead />

        {/* 6. Patient Reviews & Verified Transformations */}
        <PatientStories />

        {/* 7. Quick Consultation Handoff Banner */}
        <section className="bg-sky-500 py-16 text-white">
          <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Smile &amp; Skin?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
              Schedule your examination with our specialists in Sialkot. Every consultation includes
              a digital diagnosis and clear treatment options with transparent costs.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/book"
                className="press inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-navy shadow-soft hover:bg-slate-100"
              >
                <CalendarCheck className="size-4" aria-hidden />
                Book Your Appointment
              </Link>
              <a
                href={CLINIC.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="press inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20"
              >
                <MessageCircle className="size-4" aria-hidden />
                Message on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* 8. FAQs Section */}
        <Faqs />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            name: "City Smiles Dental & Skin Clinic",
            telephone: "+92 312 0083540",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Sialkot",
              addressRegion: "Punjab",
              addressCountry: "PK",
            },
            openingHours: "Mo-Sa 11:00-21:00",
            medicalSpecialty: ["Dentistry", "Orthodontics", "Dermatology"],
          }),
        }}
      />
    </>
  );
}
