import { Play } from "lucide-react";
import { EDUCATION_TOPICS } from "@/lib/clinic";
import { Reveal } from "./reveal";

export function Education() {
  return (
    <section id="education" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Patient education</p>
              <h2 className="mt-4 text-3xl sm:text-[2.6rem] sm:leading-tight">
                Know Your Treatment Before You Begin
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Short explanations recorded at the clinic. Each video is published once filmed with
              our own doctors and equipment.
            </p>
          </div>
        </Reveal>

        <div className="no-scrollbar mt-10 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {EDUCATION_TOPICS.map((topic, i) => (
            <Reveal
              key={topic.title}
              delay={Math.min(i, 5) * 70}
              className="w-[78%] shrink-0 snap-start lg:w-auto"
            >
              <article className="lift group flex h-full flex-col overflow-hidden rounded-md border border-border bg-card shadow-soft">
                <div className="relative flex aspect-[16/9] items-center justify-center bg-ice">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(135deg, var(--ice) 0%, var(--mint) 130%)",
                    }}
                  />
                  <span className="relative inline-flex size-14 items-center justify-center rounded-full border border-border bg-card text-primary shadow-soft transition-transform duration-300 group-hover:scale-105">
                    <Play className="size-5 translate-x-[1px]" aria-hidden />
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-sm bg-card/85 px-2 py-1 text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
                    Video coming soon
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow">{topic.topic}</p>
                  <h3 className="mt-2.5 text-lg font-semibold tracking-tight">{topic.title}</h3>
                  <p className="mt-auto pt-4 text-xs text-muted-foreground">
                    Approx. {topic.minutes}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
