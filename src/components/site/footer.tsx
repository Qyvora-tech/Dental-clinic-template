import { Link } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#011838] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Clinic Branding */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center overflow-hidden rounded-md bg-white p-1">
                <Logo className="h-full w-auto object-contain" />
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-white">{CLINIC.name}</p>
                <p className="text-xs uppercase tracking-widest text-sky-400">{CLINIC.tagline}</p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              {CLINIC.promise}. Delivering patient-first dentistry, orthodontics, and clinical
              dermatology in Sialkot with internationally certified standards.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="press inline-flex items-center gap-1.5 rounded-md bg-sky-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-400"
              >
                Book Appointment
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
              <a
                href={CLINIC.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="press inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-950/40 px-3.5 py-2 text-xs font-medium text-emerald-300 hover:bg-emerald-900/50"
              >
                <MessageCircle className="size-3.5" aria-hidden />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dental" className="transition-colors hover:text-white">
                  Dental Care Services
                </Link>
              </li>
              <li>
                <Link to="/skin" className="transition-colors hover:text-white">
                  Skin Clinic & Aesthetics
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="transition-colors hover:text-white">
                  Meet Our Doctors
                </Link>
              </li>
              <li>
                <Link to="/book" className="transition-colors hover:text-white">
                  Book an Appointment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-white">
                  Contact & Clinic FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Treatments */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">Services</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <Link to="/dental" className="transition-colors hover:text-white">
                  Dental Implants
                </Link>
              </li>
              <li>
                <Link to="/dental" className="transition-colors hover:text-white">
                  Clear Aligners & Braces
                </Link>
              </li>
              <li>
                <Link to="/dental" className="transition-colors hover:text-white">
                  Teeth Whitening
                </Link>
              </li>
              <li>
                <Link to="/dental" className="transition-colors hover:text-white">
                  Root Canal Treatment
                </Link>
              </li>
              <li>
                <Link to="/skin" className="transition-colors hover:text-white">
                  Clinical Hydrafacial
                </Link>
              </li>
              <li>
                <Link to="/skin" className="transition-colors hover:text-white">
                  Acne & Scar Protocols
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinic Contact & Hours */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              Clinic Contact
            </p>
            <div className="mt-4 space-y-3 text-sm text-white/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sky-400" aria-hidden />
                <span>{CLINIC.city}, Punjab, Pakistan</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-sky-400" aria-hidden />
                <div>
                  <p>Mon – Sat: 11:00 am – 9:00 pm</p>
                  <p className="text-xs text-white/50">Sun: By appointment</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="size-4 shrink-0 text-sky-400" aria-hidden />
                <a
                  href={CLINIC.phoneHref}
                  className="font-display text-base font-medium text-white hover:text-sky-300"
                >
                  {CLINIC.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {CLINIC.name} {CLINIC.tagline}, {CLINIC.city}. All rights
            reserved.
          </p>
          <p className="tracking-wide">
            Powered by <span className="font-semibold text-white">QYVORA</span>
          </p>
        </div>
      </div>
      <div className="h-16 md:hidden" aria-hidden />
    </footer>
  );
}
