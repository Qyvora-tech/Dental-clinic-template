import { UserRound } from "lucide-react";
import { DOCTORS } from "@/lib/clinic";
import { Reveal } from "./reveal";

export function Doctors() {
  return (
    <section id="doctors" className="border-y border-border bg-navy/[0.02]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">The team</p>
            <h2 className="mt-4 text-3xl sm:text-[2.6rem] sm:leading-tight">
              Meet Your Clinical Team
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Our doctors' photographs, qualifications and biographies are published exactly as
              provided by the clinic. Nothing on this page is invented or generated — placeholders
              remain until the real details are supplied.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {DOCTORS.map((doc, i) => (
            <Reveal key={doc.role} delay={i * 90}>
              <article className="lift flex h-full flex-col overflow-hidden rounded-md border border-border bg-card shadow-soft">
                <div className="flex aspect-[4/5] items-center justify-center bg-ice">
                  <div className="text-center">
                    <span className="inline-flex size-16 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
                      <UserRound className="size-7" aria-hidden />
                    </span>
                    <p className="mt-3 px-6 text-xs text-muted-foreground">
                      Photograph to be supplied by the clinic
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow">{doc.role}</p>
                  <h3 className="mt-2.5 text-xl">{doc.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{doc.quals}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{doc.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PatientStories() {
  return (
    <section id="stories" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <Reveal>
          <div className="grid gap-8 rounded-md border border-border bg-card p-8 shadow-soft lg:grid-cols-[1fr_1fr] lg:items-center lg:p-12">
            <div>
              <p className="eyebrow">Patient stories</p>
              <h2 className="mt-4 text-3xl sm:text-[2.3rem] sm:leading-tight">
                Real People. Real Experiences.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                We publish only genuine reviews and photographs shared with the patient's written
                consent. No invented testimonials, no purchased ratings, no manufactured results.
              </p>
            </div>
            <div className="rounded-md border border-dashed border-border bg-ice/60 p-7">
              <p className="text-sm font-semibold text-navy">
                Approved patient reviews will appear here
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Once the clinic uploads consented photographs and written experiences, they will be
                shown in this section along with the treatment received.
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Visited us already? Share your experience on WhatsApp and we will ask before
                publishing anything.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
