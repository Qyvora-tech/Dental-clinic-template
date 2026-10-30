import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { STAGE_SETS } from "@/lib/clinic";
import { TreatmentModel } from "./tooth-model";
import { Reveal } from "./reveal";

export function TreatmentVisualiser() {
  const [setIndex, setSetIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const stageRef = useRef(0);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{
    pointers: Map<number, { x: number; y: number }>;
    startRot: number;
    startX: number;
    startDist: number;
    startZoom: number;
    moved: boolean;
  }>({
    pointers: new Map(),
    startRot: 0,
    startX: 0,
    startDist: 0,
    startZoom: 1,
    moved: false,
  });

  const activeSet = STAGE_SETS[setIndex]!;
  const stages = activeSet.stages;
  const current = stages[Math.min(stage, stages.length - 1)]!;

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    setStage(0);
    setRotation(0);
    setZoom(1);
  }, [setIndex]);

  const step = (dir: number) => setStage((s) => Math.max(0, Math.min(stages.length - 1, s + dir)));

  // Pinch zoom (two pointers) — wheel is intentionally left to the page.
  const onPointerDown = (e: React.PointerEvent) => {
    const d = drag.current;
    d.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (d.pointers.size === 1) {
      d.startRot = rotation;
      d.startX = e.clientX;
      d.moved = false;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } else if (d.pointers.size === 2) {
      const [a, b] = [...d.pointers.values()];
      d.startDist = Math.hypot(a!.x - b!.x, a!.y - b!.y);
      d.startZoom = zoom;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.pointers.has(e.pointerId)) return;
    d.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (d.pointers.size >= 2) {
      const [a, b] = [...d.pointers.values()];
      const dist = Math.hypot(a!.x - b!.x, a!.y - b!.y);
      if (d.startDist > 0) setZoom(Math.max(1, Math.min(2.2, (d.startZoom * dist) / d.startDist)));
      return;
    }

    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;
    setRotation(Math.max(-38, Math.min(38, d.startRot + dx * 0.35)));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    d.pointers.delete(e.pointerId);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    if (d.pointers.size === 0) {
      // settle rotation gently back toward centre
      setRotation((r) => r * 0.35);
    }
  };

  return (
    <section id="treatment-3d" className="border-y border-border bg-navy/[0.02]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Understand your treatment</p>
            <h2 className="mt-4 text-3xl sm:text-[2.6rem] sm:leading-tight">
              See each stage before you begin
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Clinical illustrations of the treatments patients ask about most. Drag to turn the
              model, swipe or tap a stage to move through the procedure — pinch to zoom on touch
              devices.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            {STAGE_SETS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSetIndex(i)}
                className={`press shrink-0 rounded-md border px-4 py-2 text-sm ${
                  i === setIndex
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-navy hover:bg-ice"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div
              ref={surfaceRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className="relative select-none overflow-hidden rounded-md border border-border bg-card shadow-soft"
              style={{ touchAction: "none", perspective: "1100px" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "radial-gradient(60% 55% at 50% 40%, var(--ice) 0%, transparent 75%)",
                }}
              />
              <div className="relative flex aspect-[4/3] items-center justify-center p-6">
                <div
                  className="h-full w-full max-w-[26rem]"
                  style={{
                    transform: `rotateY(${rotation}deg) scale(${zoom})`,
                    transition: drag.current.pointers.size
                      ? "none"
                      : "transform .6s cubic-bezier(.22,1,.36,1)",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  <TreatmentModel setId={activeSet.id} stage={stage} />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border px-4 py-3">
                <span className="text-xs text-muted-foreground">
                  Drag to rotate model · use controls to change stage
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setRotation(0);
                      setZoom(1);
                    }}
                    className="press inline-flex size-9 items-center justify-center rounded-md border border-border text-navy hover:bg-ice"
                    aria-label="Reset view"
                  >
                    <RotateCcw className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    disabled={stage === 0}
                    className="press inline-flex size-9 items-center justify-center rounded-md border border-border text-navy hover:bg-ice disabled:opacity-40"
                    aria-label="Previous stage"
                  >
                    <ChevronLeft className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    disabled={stage === stages.length - 1}
                    className="press inline-flex size-9 items-center justify-center rounded-md border border-border text-navy hover:bg-ice disabled:opacity-40"
                    aria-label="Next stage"
                  >
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="flex h-full flex-col rounded-md border border-border bg-card p-7 shadow-soft">
              <p className="text-sm text-muted-foreground">{activeSet.intro}</p>
              <div className="mt-6">
                <p className="eyebrow">
                  Stage {stage + 1} of {stages.length}
                </p>
                <h3 className="mt-2 text-2xl">{current.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{current.body}</p>
              </div>

              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-teal"
                  style={{
                    width: `${((stage + 1) / stages.length) * 100}%`,
                    transition: "width .5s cubic-bezier(.22,1,.36,1)",
                  }}
                />
              </div>

              <ol className="mt-6 flex-1 space-y-1">
                {stages.map((s, i) => (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => setStage(i)}
                      className={`press flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm ${
                        i === stage ? "bg-ice text-navy" : "text-muted-foreground hover:bg-ice/60"
                      }`}
                    >
                      <span
                        className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full border text-[0.7rem] ${
                          i <= stage ? "border-teal bg-teal text-teal-foreground" : "border-border"
                        }`}
                      >
                        {i + 1}
                      </span>
                      {s.title}
                    </button>
                  </li>
                ))}
              </ol>

              <a
                href={`/book?treatment=${encodeURIComponent(
                  (
                    {
                      "root-canal": "Root Canal Treatment",
                      braces: "Braces",
                      aligners: "Clear Aligners",
                      implant: "Dental Implants",
                    } as Record<string, string>
                  )[activeSet.id] ?? "General Dentistry",
                )}`}
                className="press mt-6 inline-flex justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/92"
              >
                Discuss this treatment with a dentist
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
