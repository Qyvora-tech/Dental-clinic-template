import { Link } from "@tanstack/react-router";
import skin from "@/assets/skin-consult.jpg";
import { SKIN_SERVICES } from "@/lib/clinic";
import { Reveal } from "./reveal";

export function SkinClinic() {
  return (
    <section id="skin" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-md border border-border shadow-soft">
              <img
                src={skin}
                alt="Dermatologist examining a patient's skin during a consultation"
                loading="lazy"
                width={1200}
                height={912}
                className="img-zoom aspect-[4/5] w-full object-cover"
                decoding="async"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">Skin Clinic</p>
              <h2 className="mt-4 text-3xl sm:text-[2.6rem] sm:leading-tight">
                Skin Care With A Clinical Approach
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Skin is assessed medically before anything is recommended. Treatments are selected
                for your skin type, history and tolerance — with realistic timelines and no unsafe
                shortcuts.
              </p>
            </Reveal>

            <ul className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {SKIN_SERVICES.map((s, i) => (
                <Reveal as="li" key={s.title} delay={Math.min(i, 8) * 45} className="bg-card">
                  <div className="h-full p-5 transition-colors duration-300 hover:bg-accent/40">
                    <h3 className="text-sm font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted-foreground">
                      {s.blurb}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120}>
              <Link
                to="/book"
                className="press mt-8 inline-flex rounded-md border border-border px-6 py-3.5 text-sm font-medium text-navy hover:bg-ice"
              >
                Book a skin consultation
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
