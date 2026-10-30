import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import clinic from "@/assets/clinic-interior.jpg";
import { CLINIC, FAQS } from "@/lib/clinic";
import { Reveal } from "./reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faqs() {
  return (
    <section id="faqs" className="bg-background">
      <div className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-24">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-4 text-3xl sm:text-[2.4rem] sm:leading-tight">
            Before your first visit
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-8">
          <Accordion
            type="single"
            collapsible
            className="rounded-md border border-border bg-card px-2"
          >
            {FAQS.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="px-4 text-left text-base text-navy hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-ice/60">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-4 text-3xl sm:text-[2.6rem] sm:leading-tight">Visit City Smiles</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Call, message or simply walk in during clinic hours. Our reception will guide you to
              the right doctor.
            </p>

            <ul className="mt-9 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 text-teal" aria-hidden />
                <span>
                  <a
                    href={CLINIC.phoneHref}
                    className="font-display text-2xl text-navy hover:text-primary"
                  >
                    {CLINIC.phoneDisplay}
                  </a>
                  <span className="block text-muted-foreground">Reception &amp; appointments</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 size-5 text-teal" aria-hidden />
                <span>
                  <a
                    href={CLINIC.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-navy hover:text-primary"
                  >
                    WhatsApp {CLINIC.whatsappDisplay}
                  </a>
                  <span className="block text-muted-foreground">
                    Send photos, reports or questions
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 text-teal" aria-hidden />
                <span>
                  <a
                    href={CLINIC.mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-navy hover:text-primary"
                  >
                    Open City Smiles on Google Maps
                  </a>
                  <span className="block text-muted-foreground">{CLINIC.address}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-5 text-teal" aria-hidden />
                <span>
                  {CLINIC.hours.map((h) => (
                    <span key={h.days} className="block text-navy">
                      {h.days}: <span className="text-muted-foreground">{h.time}</span>
                    </span>
                  ))}
                </span>
              </li>
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={CLINIC.phoneHref}
                className="press rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/92"
              >
                Call Now
              </a>
              <a
                href={CLINIC.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="press rounded-md bg-teal px-5 py-3 text-sm font-medium text-teal-foreground hover:bg-teal/92"
              >
                WhatsApp
              </a>
              <a
                href={CLINIC.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="press rounded-md border border-border px-5 py-3 text-sm font-medium text-navy hover:bg-card"
              >
                Get Directions
              </a>
              <Link
                to="/book"
                className="press rounded-md border border-border px-5 py-3 text-sm font-medium text-navy hover:bg-card"
              >
                Book Appointment
              </Link>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <a
              href={CLINIC.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="lift block overflow-hidden rounded-md border border-border bg-card shadow-soft"
            >
              <img
                src={clinic}
                alt="Interior of the City Smiles clinic reception and waiting area"
                loading="lazy"
                width={1408}
                height={1008}
                className="img-zoom aspect-[4/3] w-full object-cover"
                decoding="async"
              />
              <span className="flex items-center gap-2 px-5 py-4 text-sm text-navy">
                <MapPin className="size-4 text-teal" aria-hidden />
                Open City Smiles on Google Maps
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
