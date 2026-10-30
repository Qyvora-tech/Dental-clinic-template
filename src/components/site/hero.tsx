import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero-clinic.jpg";
import { CLINIC } from "@/lib/clinic";

export function Hero() {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);

  return (
    <>
      <section
        id="top"
        className="relative flex min-h-[540px] w-full flex-col overflow-visible bg-[#011f4b] pt-24 pb-16 sm:pt-28 sm:pb-20 lg:h-[580px] lg:min-h-[580px] lg:mb-16 lg:pt-24 lg:pb-24 xl:h-[620px] xl:min-h-[620px] xl:mb-20"
      >
        {/* Full-bleed Background Photograph */}
        <img
          src={heroImg}
          alt={`${CLINIC.name} modern clinical treatment room in ${CLINIC.city}`}
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] select-none"
        />

        {/* Signature Dental Aesthetics Royal Navy Tint Overlay (#012c7099 with gradient depth) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#011a42]/92 via-[#012c70]/80 to-[#012c70]/68 backdrop-blur-[0.5px]"
        />

        {/* Hero Content Layer - Centered vertically between the top navbar and the bottom floating card */}
        <div className="relative z-20 mx-auto flex flex-1 w-full max-w-7xl items-center px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            {/* Main Heading — Dental Aesthetics Clean Bold Sans-Serif */}
            <h1 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-[46px] lg:leading-[1.16]">
              Experience The Best Dental &amp; Skin Care.
            </h1>

            {/* Subheading */}
            <p className="mt-3 font-sans text-lg font-normal text-white/95 sm:text-xl">
              Let Us Make Your Smile Look Perfect
            </p>

            {/* Single Crisp Dental Aesthetics Pill CTA */}
            <div className="mt-7">
              <Link
                to="/book"
                className="group inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-xs font-bold uppercase tracking-wider text-[#012c70] shadow-xl transition-all duration-200 hover:scale-105 hover:bg-slate-50 active:scale-95"
              >
                <span>GET A CONSULTATION</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Signature Overlapping Floating Card (Elevated by 25% for tight visual harmony) */}
        <div
          aria-label="Clinic Quick Information & Locations"
          className="absolute bottom-0 left-1/2 z-30 hidden w-[calc(100%-4rem)] max-w-6xl -translate-x-1/2 translate-y-[24%] grid-cols-3 divide-x divide-white/12 rounded-[22px] border border-white/15 bg-[#011f4b] p-5 shadow-[0_16px_40px_rgba(0,12,40,0.38)] lg:grid xl:p-6"
        >
          {/* Column 1: Main Sialkot Clinic */}
          <div className="flex items-center justify-between pr-5 xl:pr-6">
            <div className="flex items-start gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white">
                <MapPin className="size-4 text-sky-300" aria-hidden />
              </div>
              <div>
                <h2 className="font-sans text-base font-semibold tracking-tight text-white">
                  {CLINIC.name} Sialkot
                </h2>
                <p className="font-sans text-xs text-white/70">{CLINIC.shortAddress}</p>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <a
                    href={CLINIC.phoneHref}
                    className="font-sans font-semibold text-sky-300 transition-colors hover:text-white"
                  >
                    {CLINIC.phoneDisplay}
                  </a>
                  <span className="text-white/40">·</span>
                  <span className="font-sans text-[11px] text-white/60">Mon–Sat: 11am–9pm</span>
                </div>
              </div>
            </div>

            <a
              href={CLINIC.mapsHref}
              target="_blank"
              rel="noreferrer"
              title="Get directions to City Smiles on Google Maps"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[#011f4b] shadow-md transition-all hover:scale-105 hover:bg-sky-50 active:scale-95"
            >
              <Navigation className="size-4 fill-current rotate-45" aria-hidden />
              <span className="sr-only">Directions to City Smiles Sialkot</span>
            </a>
          </div>

          {/* Column 2: Emergency & Same-Day Care */}
          <div className="flex items-center justify-between px-5 xl:px-6">
            <div className="flex items-start gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white">
                <AlertCircle className="size-4 text-amber-300" aria-hidden />
              </div>
              <div>
                <h2 className="font-sans text-base font-semibold tracking-tight text-white">
                  Emergency &amp; Walk-Ins
                </h2>
                <p className="font-sans text-xs text-amber-200/80">
                  Same-Day Relief &amp; Priority Triage
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <a
                    href={CLINIC.phoneHref}
                    className="font-sans font-semibold text-amber-300 transition-colors hover:text-white"
                  >
                    Call Emergency Helpline
                  </a>
                  <span className="text-white/40">·</span>
                  <span className="font-sans text-[11px] text-white/60">Severe pain / trauma</span>
                </div>
              </div>
            </div>

            <a
              href={CLINIC.phoneHref}
              title="Call emergency triage helpline immediately"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[#011f4b] shadow-md transition-all hover:scale-105 hover:bg-amber-50 active:scale-95"
            >
              <Navigation className="size-4 fill-current rotate-45" aria-hidden />
              <span className="sr-only">Call emergency helpline</span>
            </a>
          </div>

          {/* Column 3: Dermatology & Aesthetic Skin Clinic */}
          <div className="flex items-center justify-between pl-5 xl:pl-6">
            <div className="flex items-start gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white">
                <Sparkles className="size-4 text-teal-300" aria-hidden />
              </div>
              <div>
                <h2 className="font-sans text-base font-semibold tracking-tight text-white">
                  Aesthetic Skin Clinic
                </h2>
                <p className="font-sans text-xs text-teal-200/80">
                  Hydrafacial, Acne &amp; Laser Glow
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <a
                    href={CLINIC.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans font-semibold text-teal-300 transition-colors hover:text-white"
                  >
                    Chat on WhatsApp
                  </a>
                  <span className="text-white/40">·</span>
                  <span className="font-sans text-[11px] text-white/60">
                    Consult &amp; photo triage
                  </span>
                </div>
              </div>
            </div>

            <a
              href={CLINIC.whatsappHref}
              target="_blank"
              rel="noreferrer"
              title="Chat with City Smiles reception on WhatsApp"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[#011f4b] shadow-md transition-all hover:scale-105 hover:bg-emerald-50 active:scale-95"
            >
              <Navigation className="size-4 fill-current rotate-45" aria-hidden />
              <span className="sr-only">Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Responsive Mobile Highlights Card (< lg) with Tab Switcher */}
      <div className="relative z-30 mx-4 -mt-6 mb-10 rounded-2xl border border-white/15 bg-[#011f4b] p-4 text-white shadow-xl sm:mx-6 lg:hidden">
        {/* Tab Switcher Pills */}
        <div className="flex rounded-full bg-white/10 p-1">
          <button
            type="button"
            onClick={() => setActiveTab(0)}
            className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition-all ${
              activeTab === 0
                ? "bg-white text-[#011f4b] shadow-xs"
                : "text-white/80 hover:text-white"
            }`}
          >
            Main Clinic
          </button>
          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition-all ${
              activeTab === 1
                ? "bg-white text-[#011f4b] shadow-xs"
                : "text-white/80 hover:text-white"
            }`}
          >
            Emergency Care
          </button>
          <button
            type="button"
            onClick={() => setActiveTab(2)}
            className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition-all ${
              activeTab === 2
                ? "bg-white text-[#011f4b] shadow-xs"
                : "text-white/80 hover:text-white"
            }`}
          >
            Skin Clinic
          </button>
        </div>

        {/* Tab 0: Main Sialkot Clinic */}
        {activeTab === 0 && (
          <div className="mt-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                <MapPin className="size-4 text-sky-300" aria-hidden />
              </div>
              <div>
                <h3 className="font-sans text-sm font-semibold text-white">
                  {CLINIC.name} Sialkot
                </h3>
                <p className="font-sans text-xs text-white/70">{CLINIC.address}</p>
                <p className="mt-1 flex items-center gap-1.5 font-sans text-[11px] text-white/60">
                  <Clock className="size-3 text-sky-300" aria-hidden />
                  <span>Mon – Sat: 11:00 am – 9:00 pm</span>
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={CLINIC.phoneHref}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
              >
                <Phone className="size-3.5 text-sky-300" aria-hidden />
                <span>Call Reception</span>
              </a>
              <a
                href={CLINIC.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white py-2.5 text-xs font-bold text-[#011f4b] transition-colors hover:bg-slate-100"
              >
                <Navigation className="size-3.5 fill-current rotate-45" aria-hidden />
                <span>Directions</span>
              </a>
            </div>
          </div>
        )}

        {/* Tab 1: Emergency & Walk-In Care */}
        {activeTab === 1 && (
          <div className="mt-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                <AlertCircle className="size-4" aria-hidden />
              </div>
              <div>
                <h3 className="font-sans text-sm font-semibold text-white">
                  Emergency &amp; Same-Day Care
                </h3>
                <p className="font-sans text-xs text-amber-200/80">
                  Priority triage for acute toothache, swelling &amp; trauma
                </p>
                <p className="mt-1 font-sans text-[11px] text-white/60">
                  Walk-ins handled with urgent care
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={CLINIC.phoneHref}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-400 py-2.5 text-xs font-bold text-[#011f4b] transition-colors hover:bg-amber-300"
              >
                <Phone className="size-3.5 fill-current" aria-hidden />
                <span>Call Helpline</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
              >
                <span>Emergency Info</span>
              </Link>
            </div>
          </div>
        )}

        {/* Tab 2: Aesthetic Skin Clinic */}
        {activeTab === 2 && (
          <div className="mt-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal-200">
                <Sparkles className="size-4" aria-hidden />
              </div>
              <div>
                <h3 className="font-sans text-sm font-semibold text-white">
                  Aesthetic &amp; Skin Clinic
                </h3>
                <p className="font-sans text-xs text-teal-200/80">
                  Clinical Hydrafacial, acne therapy &amp; medical glow
                </p>
                <p className="mt-1 font-sans text-[11px] text-white/60">
                  Supervised by qualified dermatological staff
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={CLINIC.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366] py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#20ba5a]"
              >
                <MessageCircle className="size-3.5 fill-current" aria-hidden />
                <span>WhatsApp</span>
              </a>
              <Link
                to="/skin"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
              >
                <span>Treatments</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
