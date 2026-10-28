/**
 * Medical-illustration style SVG models used by the treatment visualiser.
 * Deliberately drawn as clean clinical illustrations, not game-style assets.
 */

const enamel = "var(--sand)";
const enamelEdge = "oklch(0.86 0.02 230)";
const dentine = "oklch(0.93 0.03 80)";
const pulp = "oklch(0.62 0.13 25)";
const infected = "oklch(0.55 0.11 55)";
const metal = "oklch(0.72 0.02 240)";
const bone = "oklch(0.9 0.03 60)";
const gum = "oklch(0.72 0.09 20)";

function ToothBody({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <path
        d="M100 34c26 0 44 13 44 34 0 17-6 27-9 46-3 20-6 46-13 60-4 8-13 8-16-1-4-13-4-30-6-40-2 10-2 27-6 40-3 9-12 9-16 1-7-14-10-40-13-60-3-19-9-29-9-46 0-21 18-34 44-34Z"
        fill={enamel}
        stroke={enamelEdge}
        strokeWidth="2"
      />
      <path
        d="M100 52c18 0 30 8 30 21 0 13-5 22-8 38-2 15-5 35-10 45-3 6-8 6-10 0-3-9-2-24-3-32-1 8 0 23-3 32-2 6-7 6-10 0-5-10-8-30-10-45-3-16-8-25-8-38 0-13 12-21 32-21Z"
        fill={dentine}
        opacity="0.75"
      />
      {children}
    </>
  );
}

function Canals({ color, opacity = 1 }: { color: string; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <path
        d="M100 62c-9 0-15 5-15 12 0 9 4 14 6 26 2 13 4 32 7 40"
        stroke={color}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M100 62c9 0 15 5 15 12 0 9-4 14-6 26-2 13-4 32-7 40"
        stroke={color}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

function RootCanal({ stage }: { stage: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      role="img"
      aria-label={`Root canal stage ${stage + 1}`}
    >
      <ToothBody>
        {stage === 0 && <Canals color={pulp} />}
        {stage === 1 && (
          <>
            <Canals color={infected} />
            <circle cx="100" cy="70" r="14" fill={infected} opacity="0.35" />
            <circle cx="100" cy="70" r="22" fill={infected} opacity="0.15" />
          </>
        )}
        {stage >= 2 && stage <= 3 && (
          <>
            <Canals
              color={stage === 2 ? infected : "oklch(0.85 0.02 230)"}
              opacity={stage === 2 ? 0.9 : 0.7}
            />
            <path d="M88 44h24v14H88z" fill="var(--ice)" stroke={enamelEdge} strokeWidth="1.5" />
            {stage === 3 && (
              <path d="M100 22v26" stroke={metal} strokeWidth="4" strokeLinecap="round" />
            )}
          </>
        )}
        {stage === 4 && (
          <>
            <Canals color="oklch(0.9 0.04 200)" />
            <path d="M88 44h24v14H88z" fill="var(--ice)" stroke={enamelEdge} strokeWidth="1.5" />
            <circle cx="100" cy="34" r="6" fill="var(--teal)" opacity="0.5" />
          </>
        )}
        {stage === 5 && (
          <>
            <Canals color="var(--primary)" />
            <path d="M88 44h24v14H88z" fill="var(--ice)" stroke={enamelEdge} strokeWidth="1.5" />
          </>
        )}
        {stage === 6 && (
          <>
            <Canals color="var(--primary)" opacity={0.5} />
            <path
              d="M100 34c26 0 44 13 44 34 0 10-2 17-4 24H60c-2-7-4-14-4-24 0-21 18-34 44-34Z"
              fill="var(--mint)"
              stroke="var(--teal)"
              strokeWidth="2"
              opacity="0.85"
            />
          </>
        )}
      </ToothBody>
    </svg>
  );
}

function Braces({ stage }: { stage: number }) {
  const offsets = [
    [-7, 5, -4, 6, -6],
    [-7, 5, -4, 6, -6],
    [-5, 3, -3, 4, -4],
    [-2, 1, -1, 2, -2],
    [0, 0, 0, 0, 0],
  ];
  const row = offsets[Math.min(stage, offsets.length - 1)]!;
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      role="img"
      aria-label={`Braces stage ${stage + 1}`}
    >
      <path
        d="M20 128c22 16 58 24 80 24s58-8 80-24"
        stroke={gum}
        strokeWidth="10"
        fill="none"
        opacity="0.35"
      />
      {row.map((dx, i) => {
        const x = 30 + i * 30 + dx;
        return (
          <g
            key={i}
            style={{ transition: "transform .7s cubic-bezier(.22,1,.36,1)" }}
            transform={`translate(${x} 0)`}
          >
            <rect
              x="0"
              y="60"
              width="26"
              height="52"
              rx="7"
              fill={enamel}
              stroke={enamelEdge}
              strokeWidth="2"
            />
            {stage >= 1 && <rect x="7" y="78" width="12" height="12" rx="2" fill={metal} />}
          </g>
        );
      })}
      {stage >= 2 && (
        <path
          d={`M32 ${86} ${row.map((dx, i) => `L${43 + i * 30 + dx} 86`).join(" ")} L188 86`}
          stroke="var(--teal)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function Aligners({ stage }: { stage: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      role="img"
      aria-label={`Clear aligner stage ${stage + 1}`}
    >
      {stage === 0 && (
        <g>
          <path
            d="M40 60h120M40 80h120M40 100h120"
            stroke="var(--teal)"
            strokeWidth="1"
            opacity="0.35"
          />
          <path
            d="M60 40v120M100 40v120M140 40v120"
            stroke="var(--teal)"
            strokeWidth="1"
            opacity="0.35"
          />
        </g>
      )}
      <path
        d="M46 74c0-22 24-36 54-36s54 14 54 36c0 30-16 62-54 62s-54-32-54-62Z"
        fill="none"
        stroke={enamelEdge}
        strokeWidth="2"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = -125 + i * 50;
        const rad = (angle * Math.PI) / 180;
        const shift = stage >= 3 ? 0 : (i % 2 === 0 ? 5 : -5) * (3 - Math.min(stage, 3));
        return (
          <rect
            key={i}
            x={100 + Math.cos(rad) * 52 - 11 + shift}
            y={92 + Math.sin(rad) * 40 - 12}
            width="22"
            height="26"
            rx="6"
            fill={enamel}
            stroke={enamelEdge}
            strokeWidth="1.5"
            style={{ transition: "x .7s cubic-bezier(.22,1,.36,1)" }}
          />
        );
      })}
      {stage >= 2 && (
        <path
          d="M40 72c0-25 26-40 60-40s60 15 60 40c0 33-18 68-60 68s-60-35-60-68Z"
          fill="var(--mint)"
          opacity="0.28"
          stroke="var(--teal)"
          strokeWidth="1.5"
        />
      )}
      {stage === 1 && <path d="M100 150h0" />}
    </svg>
  );
}

function Implant({ stage }: { stage: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      role="img"
      aria-label={`Dental implant stage ${stage + 1}`}
    >
      <path d="M24 96h152v54a10 10 0 0 1-10 10H34a10 10 0 0 1-10-10z" fill={bone} opacity="0.55" />
      <path d="M24 96h152" stroke={gum} strokeWidth="8" opacity="0.4" />
      {stage === 0 && <path d="M84 100h32v10H84z" fill={gum} opacity="0.35" />}
      {stage >= 1 && (
        <g>
          <path d="M92 100h16v48a8 8 0 0 1-16 0z" fill={metal} />
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M92 ${108 + i * 8}h16`}
              stroke="oklch(0.6 0.02 240)"
              strokeWidth="2"
            />
          ))}
        </g>
      )}
      {stage >= 2 && <path d="M94 84h12v18H94z" fill="oklch(0.66 0.02 240)" />}
      {stage >= 3 && (
        <path
          d="M100 40c20 0 32 10 32 25 0 12-4 20-6 31H74c-2-11-6-19-6-31 0-15 12-25 32-25Z"
          fill={enamel}
          stroke={enamelEdge}
          strokeWidth="2"
        />
      )}
    </svg>
  );
}

export function TreatmentModel({ setId, stage }: { setId: string; stage: number }) {
  if (setId === "braces") return <Braces stage={stage} />;
  if (setId === "aligners") return <Aligners stage={stage} />;
  if (setId === "implant") return <Implant stage={stage} />;
  return <RootCanal stage={stage} />;
}
