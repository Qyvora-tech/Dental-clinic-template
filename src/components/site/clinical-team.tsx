import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, MessageCircle, UserRound } from "lucide-react";
import { CLINIC, CONSULTATIONS } from "@/lib/clinic";
import clinic from "@/assets/clinic-interior.jpg";
import { Reveal } from "./reveal";

export function ClinicalTeam() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">The right place to start</p>
              <h2 className="mt-4 text-3xl sm:text-4xl">
                Care built around
                <br />
                your questions.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Choose the consultation that fits your concern. Reception can help with clinician
              availability and appointment preferences.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CONSULTATIONS.map((item, i) => (
            <Reveal key={item.role} delay={i * 70}>
              <article className="lift flex h-full flex-col rounded-md border border-border bg-card p-7 shadow-soft">
                <span className="flex size-12 items-center justify-center rounded-full bg-mint text-primary">
                  <UserRound className="size-6" aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl">{item.role}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.intro}</p>
                <ul className="my-6 space-y-3">
                  {item.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
                      {topic}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book"
                  search={{ treatment: item.treatment }}
                  className="mt-auto inline-flex items-center gap-2 border-t border-border pt-5 text-sm font-medium text-primary"
                >
                  Request consultation <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 grid overflow-hidden rounded-md border border-border bg-ice md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <p className="eyebrow">Demo team directory</p>
            <h3 className="mt-4 text-2xl">
              Meet your clinician
              <br />
              before treatment begins.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              This demo shows consultation departments. Individual doctor names, portraits and
              verified qualifications will be added when the clinic provides them.
            </p>
            <a
              href={CLINIC.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <MessageCircle className="size-4" aria-hidden />
              Ask reception about the team
            </a>
          </div>
          <img
            src={clinic}
            alt="Clinic interior illustration"
            width={1408}
            height={1008}
            className="h-full max-h-96 w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
