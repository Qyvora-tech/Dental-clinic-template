import { createFileRoute } from "@tanstack/react-router";
import { Clock, HelpCircle, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { PageBanner } from "@/components/site/page-banner";
import { Booking } from "@/components/site/booking";
import { CLINIC, validateBookingSearch } from "@/lib/clinic";

const title = "Book an Appointment | City Smiles Dental & Skin Clinic Sialkot";
const description =
  "Schedule your dental or skin consultation at City Smiles in Sialkot in under a minute. Quick WhatsApp and phone confirmation with qualified specialists.";

export const Route = createFileRoute("/book")({
  validateSearch: validateBookingSearch,
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
  component: BookPage,
});

function BookPage() {
  const { treatment } = Route.useSearch();
  return (
    <main>
      <PageBanner
        title="Schedule Your Clinic Visit in Sialkot"
        subtitle="Select your preferred treatment, specialist doctor, and date. Our reception team directly confirms your reservation on WhatsApp or phone call."
        breadcrumb="Book Appointment"
        eyebrow="Easy Online Reservation"
        badge="Instant Handoff"
      />

      {/* 1. Full 6-Step Booking Wizard */}
      <Booking key={treatment ?? "all"} initialTreatment={treatment ?? ""} />

      {/* 2. Reassurance & Preparation Tips */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 shadow-2xs">
              <ShieldCheck className="size-6 text-teal" aria-hidden />
              <h3 className="mt-3 text-base font-semibold text-navy">No Upfront Payment</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                No payment is collected through this website. Ask reception about consultation fees
                and discuss the treatment estimate during your visit.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-2xs">
              <Clock className="size-6 text-sky-600" aria-hidden />
              <h3 className="mt-3 text-base font-semibold text-navy">Same-Day Walk-ins</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Walk-ins are welcome during clinic hours ({CLINIC.hours[0].time}). Call reception to
                check clinician availability before travelling.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-2xs">
              <MessageCircle className="size-6 text-emerald-600" aria-hidden />
              <h3 className="mt-3 text-base font-semibold text-navy">Direct WhatsApp Support</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Have questions before visiting or want to send x-rays or skin photos? Message
                reception directly on WhatsApp {CLINIC.whatsappDisplay}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
