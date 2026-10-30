import { BookOpen, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CONSULTATION_QUESTIONS, STAGE_SETS } from "@/lib/clinic";
import { Reveal } from "./reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Education({ skin = false }: { skin?: boolean }) {
  const guides = skin
    ? [
        {
          id: "consultation",
          label: "Your skin consultation",
          intro: "Start with a structured assessment of your skin type, history and concerns.",
          stages: [
            {
              title: "Your concerns",
              body: "Make a note of the changes you have noticed and the questions you want to discuss.",
            },
            {
              title: "Your current routine",
              body: "Bring a list of products and medicines you currently use. Come with clean skin if possible.",
            },
            {
              title: "Your next steps",
              body: "Discuss treatment options, expected visits and costs with the clinician.",
            },
          ],
        },
        {
          id: "questions",
          label: "Questions worth asking",
          intro: "Use your consultation to understand the proposed plan before deciding.",
          stages: CONSULTATION_QUESTIONS.Skin.map((q, i) => ({
            title: `Question ${i + 1}`,
            body: q,
          })),
        },
      ]
    : STAGE_SETS;
  return (
    <section id="education" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-mint text-primary">
                <BookOpen className="size-5" aria-hidden />
              </span>
              <p className="eyebrow mt-6">Patient guides</p>
              <h2 className="mt-4 text-3xl sm:text-4xl">
                Understand the journey.
                <br />
                Ask with confidence.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {skin
                  ? "A useful starting point for your first skin consultation."
                  : "Explore the stages of common dental treatments, at your own pace."}{" "}
                Your clinician will explain the plan for your individual needs.
              </p>
              <Link
                to="/book"
                search={{ treatment: skin ? "Skin Consultation (Skin)" : "General Dentistry" }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                Talk through your options <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
            <Accordion
              type="single"
              collapsible
              defaultValue={guides[0]?.id}
              className="rounded-md border border-border bg-card px-6"
            >
              {guides.map((guide) => (
                <AccordionItem key={guide.id} value={guide.id}>
                  <AccordionTrigger className="py-6 text-left font-display text-xl text-navy hover:no-underline">
                    {guide.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                      {guide.intro}
                    </p>
                    <ol className="space-y-5 pb-3">
                      {guide.stages.map((stage, i) => (
                        <li key={stage.title} className="flex gap-4">
                          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-ice text-xs text-primary">
                            {i + 1}
                          </span>
                          <div>
                            <h3 className="text-base font-medium">{stage.title}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {stage.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
