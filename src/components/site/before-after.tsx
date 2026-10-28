import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import before from "@/assets/smile-before.jpg";
import after from "@/assets/smile-after.jpg";
import { Reveal } from "./reveal";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, next)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging.current) setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [setFromClientX]);

  return (
    <section id="results" className="border-y border-border bg-ice/60">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">Before &amp; After</p>
            <h2 className="mt-4 text-3xl sm:text-[2.4rem] sm:leading-tight">
              Results shown honestly
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Drag the handle to compare a treated case. Every case published here is a genuine,
              clinic-approved record — photographed in the same lighting and never digitally
              enhanced. Results vary from patient to patient.
            </p>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-muted-foreground">
              This example is a placeholder set and will be replaced by the clinic's own approved
              case photographs.
            </p>
          </Reveal>

          <Reveal delay={90}>
            <div
              ref={frame}
              onPointerDown={(e) => {
                dragging.current = true;
                setFromClientX(e.clientX);
              }}
              className="relative select-none overflow-hidden rounded-md border border-border bg-card shadow-lift"
              style={{ touchAction: "pan-y" }}
            >
              <img
                src={after}
                alt="Smile after professional cleaning and whitening"
                loading="lazy"
                width={1200}
                height={912}
                className="aspect-[4/3] w-full object-cover"
                decoding="async"
              />
              <div
                className="absolute inset-0 overflow-hidden will-change-[clip-path]"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <img
                  src={before}
                  alt="Smile before treatment"
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="h-full w-full object-cover"
                  decoding="async"
                />
              </div>

              <span className="absolute left-4 top-4 rounded-sm bg-navy/75 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.14em] text-primary-foreground">
                Before
              </span>
              <span className="absolute right-4 top-4 rounded-sm bg-teal/85 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.14em] text-teal-foreground">
                After
              </span>

              <div
                className="absolute inset-y-0 w-px bg-card/90"
                style={{ left: `${pos}%` }}
                aria-hidden
              />
              <button
                type="button"
                role="slider"
                tabIndex={0}
                aria-valuenow={Math.round(pos)}
                aria-valuemin={2}
                aria-valuemax={98}
                aria-orientation="horizontal"
                aria-label="Drag to compare before and after"
                onPointerDown={() => {
                  dragging.current = true;
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                    e.preventDefault();
                    setPos((p) => Math.max(2, p - 4));
                  } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                    e.preventDefault();
                    setPos((p) => Math.min(98, p + 4));
                  } else if (e.key === "Home") {
                    e.preventDefault();
                    setPos(2);
                  } else if (e.key === "End") {
                    e.preventDefault();
                    setPos(98);
                  }
                }}
                className="absolute top-1/2 inline-flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-navy shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ left: `${pos}%` }}
              >
                <MoveHorizontal className="size-5 text-teal" aria-hidden />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
