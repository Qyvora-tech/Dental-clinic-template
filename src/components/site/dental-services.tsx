import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import braces from "@/assets/braces.jpg";
import cleaning from "@/assets/cleaning.jpg";
import smileAfter from "@/assets/smile-after.jpg";
import clinic from "@/assets/clinic-interior.jpg";
import { DENTAL_SERVICES } from "@/lib/clinic";
import { Reveal } from "./reveal";
import { ServiceDetails } from "./service-details";

const FEATURED: { slug: string; img: string; alt: string }[] = [
  {
    slug: "dental-cleaning",
    img: cleaning,
    alt: "Dentist performing an ultrasonic dental cleaning on a patient",
  },
  { slug: "braces", img: braces, alt: "Young woman smiling with ceramic braces in the clinic" },
  {
    slug: "teeth-whitening",
    img: smileAfter,
    alt: "Close-up of a natural smile after professional whitening",
  },
  { slug: "general-dentistry", img: clinic, alt: "Reception and waiting area of the clinic" },
];

export function DentalServices() {
  const [filter, setFilter] = useState<string>("All");
  const groups = ["All", "General", "Restorative", "Orthodontics", "Cosmetic", "Family"];
  const list =
    filter === "All" ? DENTAL_SERVICES : DENTAL_SERVICES.filter((s) => s.group === filter);

  return (
    <section id="dental" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Dental Care</p>
              <h2 className="mt-4 text-3xl sm:text-[2.6rem] sm:leading-tight">
                Complete dentistry, planned around one patient at a time
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              From a routine cleaning to a full smile makeover — every treatment begins with an
              examination, an honest explanation and a written plan.
            </p>
          </div>
        </Reveal>

        {/* Featured treatments with photography */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {FEATURED.map((item, i) => {
            const service = DENTAL_SERVICES.find((s) => s.slug === item.slug);
            if (!service) return null;
            return (
              <Reveal key={item.slug} delay={i * 90}>
                <article className="lift group h-full overflow-hidden rounded-md border border-border bg-card shadow-soft">
                  <div className="flex min-h-64 flex-col justify-between p-7 lg:min-h-72 lg:p-8">
                    <p className="eyebrow">{service.group}</p>
                    <h3 className="mt-3 text-2xl">{service.title}</h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                      {service.blurb}
                    </p>
                    <div className="mt-6 flex items-center gap-5">
                      <ServiceDetails {...service} treatment={service.title} label="Learn more" />
                      <Link
                        to="/book"
                        search={{ treatment: service.title }}
                        className="press text-sm text-navy underline decoration-teal/50 underline-offset-4 hover:decoration-teal"
                      >
                        Book appointment
                      </Link>
                    </div>
                  </div>
                  <div className="overflow-hidden border-t border-border bg-ice">
                    <img
                      src={item.img}
                      alt={item.alt}
                      loading="lazy"
                      width={1200}
                      height={912}
                      className="img-zoom aspect-[16/9] w-full object-cover"
                      decoding="async"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Full treatment list */}
        <Reveal className="mt-16">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            {groups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setFilter(g)}
                aria-pressed={filter === g}
                className={`press shrink-0 rounded-full border px-4 py-2 text-sm ${
                  filter === g
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-navy hover:bg-ice"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {list.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={Math.min(i, 8) * 45} className="bg-card">
              <div className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-ice">
                <h3 className="text-base font-semibold tracking-tight">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.blurb}
                </p>
                <Link
                  to="/book"
                  search={{ treatment: service.title }}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-teal"
                >
                  Book appointment
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
                <ServiceDetails {...service} treatment={service.title} />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
