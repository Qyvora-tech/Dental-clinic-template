import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import { Logo } from "./logo";

type Msg = { from: "clinic" | "you"; text: string };

const QUICK = [
  "Book Appointment",
  "Dental Treatments",
  "Skin Treatments",
  "Braces & Aligners",
  "Root Canal",
  "FAQs",
  "Talk to Reception",
];

/** Approved reception answers only — never diagnostic or prescriptive. */
const ANSWERS: { match: RegExp; reply: string }[] = [
  {
    match:
      /pain|swelling|bleed|infection|medicine|tablet|prescri|diagnos|toothache|ache|hurt|hurting|emergency|urgent|abscess|dard|takleef|treatment for my|what do i have/i,
    reply:
      "Our clinical team can advise you after an appropriate consultation. If you're in pain, please call reception on " +
      CLINIC.phoneDisplay +
      " so we can arrange an early appointment.",
  },
  {
    match: /book|appointment|slot|timing|schedule/i,
    reply: `You can book in a few taps using the appointment section on this page, or message reception directly on WhatsApp ${CLINIC.whatsappDisplay}. Clinic hours are ${CLINIC.hours[0].days}, ${CLINIC.hours[0].time}; Sunday by appointment only.`,
  },
  {
    match:
      /dental|teeth|tooth|cleaning|whitening|filling|crown|bridge|implant|wisdom|gum|child|kid/i,
    reply:
      "Our dental services include general dentistry, cleaning, whitening, fillings, root canal, crowns, bridges, implants, wisdom tooth treatment, gum treatment, pediatric and cosmetic dentistry, smile makeovers and veneers. Tell me which one you're interested in and I'll point you to the right section.",
  },
  {
    match: /skin|acne|scar|pigment|melasma|peel|hydrafacial|laser|aging|hair|scalp|facial/i,
    reply:
      "The skin clinic offers consultations, acne and acne-scar treatment, pigmentation and melasma care, rejuvenation, chemical peels, Hydrafacial, laser treatments, anti-aging, brightening, plus hair and scalp treatments. A consultation is always the first step.",
  },
  {
    match: /brace|aligner|invisalign|orthodont/i,
    reply:
      "We offer metal and ceramic braces as well as clear aligners. You can see each stage of both treatments in the treatment visualiser on this page. Duration and cost are confirmed after an orthodontic assessment.",
  },
  {
    match: /root canal|rct|endodont/i,
    reply:
      "Root canal treatment saves an infected tooth. The tooth is numbed, the canals are cleaned and disinfected, then sealed — usually followed by a crown. Most cases are completed in one or two visits.",
  },
  {
    match: /price|cost|fee|charge|kitna|rate/i,
    reply:
      "Costs depend on the treatment and are always confirmed in writing after an examination. Reception can share the consultation fee and a range on WhatsApp before you visit.",
  },
  {
    match: /where|location|address|direction|map|parking/i,
    reply: `We're in ${CLINIC.city}. Tap "Get Directions" in the contact section to open City Smiles on Google Maps.`,
  },
  {
    match: /hour|open|close|sunday|holiday/i,
    reply: `${CLINIC.hours[0].days}: ${CLINIC.hours[0].time}. ${CLINIC.hours[1].days}: ${CLINIC.hours[1].time}.`,
  },
  {
    match: /faq|question|prepare|before visit|first visit/i,
    reply:
      "The FAQs section on this page covers first visits, preparation, opening hours and what to expect. Anything not answered there, reception can help with directly.",
  },
  {
    match: /reception|human|call|talk|staff/i,
    reply: `Of course — call ${CLINIC.phoneDisplay} or message WhatsApp ${CLINIC.whatsappDisplay} and a member of our reception team will reply.`,
  },
];

function answerFor(input: string) {
  for (const item of ANSWERS) if (item.match.test(input)) return item.reply;
  return `I can help with appointments, treatments, clinic hours, location and general preparation. For anything about your own symptoms, our clinical team can advise you after an appropriate consultation — call ${CLINIC.phoneDisplay} or message WhatsApp ${CLINIC.whatsappDisplay}.`;
}

export function Support() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "clinic", text: "Hi! How can we help you today?" },
  ]);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMsgs((m) => [...m, { from: "you", text: value }]);
    setInput("");
    window.setTimeout(
      () => setMsgs((m) => [...m, { from: "clinic", text: answerFor(value) }]),
      420,
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="press fixed bottom-20 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium text-navy shadow-lift md:bottom-6 md:right-6"
        aria-expanded={open}
      >
        {open ? (
          <X className="size-4" aria-hidden />
        ) : (
          <MessageSquare className="size-4 text-teal" aria-hidden />
        )}
        {open ? "Close" : "Need Help?"}
      </button>

      {open && (
        <div
          className="fixed bottom-36 right-4 z-40 flex max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-md border border-border bg-card shadow-lift md:bottom-24 md:right-6"
          style={{ animation: "scale-in .18s ease-out, fade-in .25s ease-out" }}
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Logo className="h-9 w-auto" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-navy">{CLINIC.name} Support</p>
              <p className="text-[0.7rem] text-muted-foreground">
                Reception assistant · replies instantly
              </p>
            </div>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-md px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.from === "clinic"
                    ? "bg-ice text-navy"
                    : "ml-auto bg-primary text-primary-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-border px-3 py-2.5">
            {QUICK.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="press shrink-0 rounded-full border border-border px-3 py-1.5 text-xs text-navy hover:bg-ice"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border px-3 py-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write a message…"
              aria-label="Write a message to reception"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
            <button
              type="submit"
              className="press inline-flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground"
              aria-label="Send message"
            >
              <Send className="size-4" aria-hidden />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
