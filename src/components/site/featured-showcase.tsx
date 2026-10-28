import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import cleaning from "@/assets/cleaning.jpg";
import braces from "@/assets/braces.jpg";
import smileAfter from "@/assets/smile-after.jpg";
import skinConsult from "@/assets/skin-consult.jpg";
import { Reveal } from "./reveal";

const SHOWCASES = [
  {
    eyebrow: "Restorative & Implant Dentistry",
    title: "Permanent Implants & Ceramic Veneers",
    subtitle: "Rebuild your bite, natural chewing function, and aesthetic confidence.",
    body: "Restore missing teeth, chewing function, and jaw structure with foreign-certified dental implants. Custom shade-matched zirconia crowns ensure a seamless, natural look.",
    points: [
      "Titanium implant posts with permanent bone integration",
      "Custom shade-matched zirconia and porcelain crowns",
      "Ultrasonic bone-preserving extraction and placement",
    ],
    image: cleaning,
    alt: "Dentist performing dental restoration procedure",
    linkText: "Learn more about restorative care",
    href: "/dental",
    reversed: false,
  },
  {
    eyebrow: "Modern Digital Orthodontics",
    title: "Clear Aligners & Esthetic Braces",
    subtitle: "Straighten teeth discreetly with 3D intra-oral computer planning.",
    body: "Discreet, digitally mapped clear aligners and tooth-colored ceramic brackets. Straighten crowding and close gaps comfortably with full 3D visual preview before starting.",
    points: [
      "Custom 3D scanned aligners changed on a guided schedule",
      "Ceramic tooth-colored brackets for minimal visibility",
      "Regular digital check-ins and retainers included",
    ],
    image: braces,
    alt: "Patient smiling with ceramic braces in clinic",
    linkText: "Explore orthodontic solutions",
    href: "/dental",
    reversed: true,
  },
  {
    eyebrow: "Professional Teeth Whitening",
    title: "Natural Shade Whitening & Polishing",
    subtitle: "Brighten discolored or stained teeth safely under clinical supervision.",
    body: "Safely lift stubborn stains from tea, coffee, and aging under direct dental supervision. Achieve an even, natural white shade in one 45-minute visit without enamel damage.",
    points: [
      "Ultrasonic plaque scaling and prophylactic polish included",
      "Even, supervised shade lightening in one 45-minute visit",
      "Post-treatment sensitivity prevention protocol",
    ],
    image: smileAfter,
    alt: "Bright white, healthy smile after cosmetic treatment",
    linkText: "View cosmetic dental treatments",
    href: "/dental",
    reversed: false,
  },
  {
    eyebrow: "Medical Dermatology & Facial Care",
    title: "Clinical Skin Rejuvenation & Hydrafacial",
    subtitle: "Evidence-based dermatological care suited to South Asian skin tones.",
    body: "Evidence-based clinical treatments including medical Hydrafacial, gentle chemical peels, and acne care. Formulated specifically for safety and lasting glow without bleach or steroids.",
    points: [
      "Medical Hydrafacial: deep pore vacuum cleanse and serum infusion",
      "Graded chemical peels and micro-needling for texture and marks",
      "Supervised acne and pigmentation treatment regimens",
    ],
    image: skinConsult,
    alt: "Dermatologist conducting clinical skin examination",
    linkText: "Discover clinical skin treatments",
    href: "/skin",
    reversed: true,
  },
];

export function FeaturedShowcase() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">
              Clinical Highlights
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Precision Care Planned Around You
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Explore our core clinical specialties. Every treatment begins with a thorough
              diagnostic exam, clear options, and a written estimate.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-20 lg:space-y-24">
          {SHOWCASES.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  item.reversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`overflow-hidden rounded-xl border border-border bg-card shadow-soft ${item.reversed ? "lg:col-start-2" : ""}`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                    {item.eyebrow}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-slate-700">{item.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>

                  <ul className="mt-6 space-y-2.5 text-xs text-slate-700 sm:text-sm">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      to={item.href}
                      className="press group inline-flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight
                        className="size-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                    <Link
                      to="/book"
                      className="press text-xs font-semibold text-sky-600 underline decoration-sky-300 underline-offset-4 hover:text-sky-700"
                    >
                      Book Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
