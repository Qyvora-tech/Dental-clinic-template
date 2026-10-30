import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Clock, MessageCircle } from "lucide-react";
import { CLINIC, VISIT_STEPS } from "@/lib/clinic";
import { Reveal } from "./reveal";

export function VisitGuide({ skin = false }: { skin?: boolean }) {
  return (
    <section className="border-y border-border bg-ice/60">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <p className="eyebrow">Your first visit</p>
              <h2 className="mt-4 text-3xl sm:text-4xl">
                A little clarity.
                <br />A more confident next step.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {skin
                  ? "Bring a list of the products and medicines you currently use, and the concerns you would like to discuss."
                  : "Bring your questions and any previous dental reports you would like to discuss with the clinician."}
              </p>
              <Link
                to="/book"
                search={{ treatment: skin ? "Skin Consultation (Skin)" : "General Dentistry" }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Plan your consultation <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
            <ol className="space-y-6">
              {VISIT_STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-5 border-b border-border pb-6 last:border-0 last:pb-0"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mint font-display text-lg text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 rounded-md border border-border bg-card p-6 sm:grid-cols-3">
          <p className="flex items-start gap-3 text-sm">
            <Clock className="size-5 shrink-0 text-teal" aria-hidden />
            <span>
              {CLINIC.hours[0].days}
              <span className="block text-muted-foreground">{CLINIC.hours[0].time}</span>
            </span>
          </p>
          <p className="flex items-start gap-3 text-sm">
            <Check className="size-5 shrink-0 text-teal" aria-hidden />
            <span>
              Discuss the plan first
              <span className="block text-muted-foreground">Options, visits and costs</span>
            </span>
          </p>
          <a
            href={CLINIC.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 text-sm hover:text-primary"
          >
            <MessageCircle className="size-5 shrink-0 text-teal" aria-hidden />
            <span>
              Questions before visiting?
              <span className="block text-muted-foreground">Message reception on WhatsApp ↗</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
