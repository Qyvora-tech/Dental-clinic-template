import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import { CLINIC, DENTAL_SERVICES, DOCTORS, SKIN_SERVICES } from "@/lib/clinic";
import { Reveal } from "./reveal";

const STEPS = ["Treatment", "Doctor", "Date", "Time", "Your details", "Confirm"];
const TIMES = ["11:30 am", "12:30 pm", "2:00 pm", "3:30 pm", "5:00 pm", "6:30 pm", "8:00 pm"];

function nextDays(count: number) {
  const out: { key: string; day: string; date: string; month: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    out.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      day: d.toLocaleDateString("en-PK", { weekday: "short" }),
      date: String(d.getDate()),
      month: d.toLocaleDateString("en-PK", { month: "short" }),
    });
  }
  return out;
}

export function Booking() {
  const [step, setStep] = useState(0);
  const [treatment, setTreatment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const days = useMemo(() => nextDays(12), []);

  const treatments = [
    ...DENTAL_SERVICES.map((s) => s.title),
    ...SKIN_SERVICES.map((s) => `${s.title} (Skin)`),
  ];

  const cleanPhone = phone.trim().replace(/[\s\-()]/g, "");
  const digitsOnly = phone.replace(/\D/g, "");
  const isPhoneValid =
    /^(\+92|0)?[0-9]{10,11}$/.test(cleanPhone) ||
    (digitsOnly.length >= 10 && digitsOnly.length <= 13 && /^[+\d\s\-()]+$/.test(phone.trim()));

  const canContinue = Boolean(
    [
      Boolean(treatment),
      Boolean(doctor),
      Boolean(date),
      Boolean(time),
      name.trim().length > 1 && isPhoneValid,
      true,
    ][step],
  );

  const summary = `Assalam o Alaikum, I would like to book an appointment at City Smiles.
Treatment: ${treatment}
Doctor: ${doctor}
Date: ${date}
Time: ${time}
Name: ${name}
Phone: ${phone}${notes ? `\nNotes: ${notes}` : ""}`;

  const phoneRaw =
    (CLINIC as { phoneRaw?: string }).phoneRaw ?? CLINIC.phoneHref.replace(/\D/g, "");
  const waHref = `https://wa.me/${phoneRaw}?text=${encodeURIComponent(summary)}`;

  return (
    <section id="book" className="border-y border-border bg-ice/60">
      <div className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Appointments</p>
            <h2 className="mt-4 text-3xl sm:text-[2.6rem] sm:leading-tight">
              Book in under a minute
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Choose a treatment, doctor and time. We confirm every appointment personally by phone
              or WhatsApp.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 overflow-hidden rounded-md border border-border bg-card shadow-lift">
            {/* Stepper */}
            <ol className="no-scrollbar flex items-center gap-2 overflow-x-auto border-b border-border px-5 py-4">
              {STEPS.map((label, i) => (
                <li key={label} className="flex shrink-0 items-center gap-2">
                  <span
                    className={`inline-flex size-7 items-center justify-center rounded-full border text-[0.7rem] transition-colors duration-300 ${
                      i < step
                        ? "border-teal bg-teal text-teal-foreground"
                        : i === step
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check className="size-3.5" aria-hidden /> : i + 1}
                  </span>
                  <span className={`text-xs ${i === step ? "text-navy" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                  {i < STEPS.length - 1 && <span className="mx-1 h-px w-6 bg-border" aria-hidden />}
                </li>
              ))}
            </ol>

            <div className="p-6 lg:p-8">
              {step === 0 && (
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    Which treatment do you need?
                  </h3>
                  <div className="mt-4 max-h-72 overflow-y-auto rounded-md border border-border">
                    {treatments.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTreatment(t)}
                        aria-pressed={treatment === t}
                        className={`press flex w-full items-center justify-between border-b border-border px-4 py-3 text-left text-sm last:border-b-0 ${
                          treatment === t ? "bg-ice text-navy" : "hover:bg-ice/60"
                        }`}
                      >
                        {t}
                        {treatment === t && <Check className="size-4 text-teal" aria-hidden />}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Not sure? Choose General Dentistry or Skin Consultation and we will guide you.
                  </p>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">Preferred doctor</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {["No preference — first available", ...DOCTORS.map((d) => d.role)].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDoctor(d)}
                        aria-pressed={doctor === d}
                        className={`press rounded-md border px-4 py-4 text-left text-sm ${
                          doctor === d
                            ? "border-primary bg-ice text-navy"
                            : "border-border hover:bg-ice/60"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">Pick a date</h3>
                  <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
                    {days.map((d) => (
                      <button
                        key={d.key}
                        type="button"
                        onClick={() => setDate(`${d.day} ${d.date} ${d.month}`)}
                        aria-pressed={date === `${d.day} ${d.date} ${d.month}`}
                        className={`press w-[4.5rem] shrink-0 rounded-md border px-2 py-3 text-center ${
                          date === `${d.day} ${d.date} ${d.month}`
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:bg-ice"
                        }`}
                      >
                        <span className="block text-[0.7rem] uppercase tracking-[0.1em] opacity-80">
                          {d.day}
                        </span>
                        <span className="mt-1 block font-display text-xl">{d.date}</span>
                        <span className="block text-[0.7rem] opacity-80">{d.month}</span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Clinic hours: {CLINIC.hours[0].days}, {CLINIC.hours[0].time}.{" "}
                    {CLINIC.hours[1].days}: {CLINIC.hours[1].time}.
                  </p>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">Available times</h3>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        aria-pressed={time === t}
                        className={`press rounded-md border px-3 py-3 text-sm ${
                          time === t
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:bg-ice"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-1">
                    <span className="text-sm text-navy">Full name</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
                      placeholder="e.g. Ahmed Raza"
                    />
                  </label>
                  <label className="block sm:col-span-1">
                    <span className="text-sm text-navy">Mobile number</span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      inputMode="tel"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
                      placeholder="03XX XXXXXXX"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm text-navy">Anything we should know? (optional)</span>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
                      placeholder="Pain, previous treatment, medication…"
                    />
                  </label>
                  <p className="text-xs text-muted-foreground sm:col-span-2">
                    Your details are used only to confirm this appointment.
                  </p>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">Confirm your appointment</h3>
                  <dl className="mt-4 divide-y divide-border rounded-md border border-border text-sm">
                    {[
                      ["Treatment", treatment],
                      ["Doctor", doctor],
                      ["Date", date],
                      ["Time", time],
                      ["Name", name],
                      ["Mobile", phone],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-6 px-4 py-3">
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="text-right text-navy">{v || "—"}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer"
                      className="press inline-flex items-center gap-2 rounded-md bg-teal px-5 py-3 text-sm font-medium text-teal-foreground hover:bg-teal/92"
                    >
                      <MessageCircle className="size-4" aria-hidden />
                      Send on WhatsApp
                    </a>
                    <a
                      href={CLINIC.phoneHref}
                      className="press inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-navy hover:bg-ice"
                    >
                      <Phone className="size-4 text-teal" aria-hidden />
                      Call {CLINIC.phoneDisplay}
                    </a>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Reception confirms every request personally — your slot is reserved once we
                    reply.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="press inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-navy hover:bg-ice disabled:opacity-40"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Back
              </button>
              <span className="text-xs text-muted-foreground">
                Step {step + 1} of {STEPS.length}
              </span>
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                disabled={step === STEPS.length - 1 || !canContinue}
                className="press group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/92 disabled:opacity-40"
              >
                Continue
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
