import {
  HeartHandshake,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { TRUST_POINTS } from "@/lib/clinic";
import { Reveal } from "./reveal";

const ICONS = [Stethoscope, MonitorSmartphone, HeartHandshake, ShieldCheck, Sparkles];

export function Trust() {
  return (
    <section className="border-y border-border bg-ice/70">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Why patients choose us</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Care You Can Feel Confident About</h2>
          </div>
        </Reveal>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {TRUST_POINTS.map((point, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            return (
              <Reveal as="li" key={point.title} delay={i * 70} className="bg-card">
                <div className="group h-full p-6 transition-colors duration-300 hover:bg-accent/40">
                  <Icon
                    className="size-6 text-teal transition-transform duration-500 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
