import { createFileRoute } from "@tanstack/react-router";
import { Clock, HelpCircle, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { PageBanner } from "@/components/site/page-banner";
import { Booking } from "@/components/site/booking";
import { CLINIC } from "@/lib/clinic";

const title = "Book an Appointment | City Smiles Dental & Skin Clinic Sialkot";
const description =
  "Schedule your dental or skin consultation at City Smiles in Sialkot in under a minute. Quick WhatsApp and phone confirmation with qualified specialists.";

export const Route = createFileRoute("/book")({
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
      <Booking />

      {/* 2. Reassurance & Preparation Tips */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 shadow-2xs">
              <ShieldCheck className="size-6 text-teal" aria-hidden />
              <h3 className="mt-3 text-base font-semibold text-navy">No Upfront Payment</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Booking your slot is completely free. All examination and procedural fees are paid
                at the clinic after your doctor consultation.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-2xs">
              <Clock className="size-6 text-sky-600" aria-hidden />
              <h3 className="mt-3 text-base font-semibold text-navy">Same-Day Walk-ins</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                In acute pain or need urgent attention? Walk in during clinic hours (
                {CLINIC.hours[0].time}) and our staff will accommodate you.
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
