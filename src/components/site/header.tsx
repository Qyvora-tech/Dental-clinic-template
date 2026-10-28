import { useEffect, useState, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  Clock,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  X,
  ArrowRight,
  CalendarCheck,
} from "lucide-react";
import { Logo } from "./logo";
import { CLINIC, DENTAL_SERVICES, SKIN_SERVICES } from "@/lib/clinic";

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dentalOpen, setDentalOpen] = useState(false);
  const [skinOpen, setSkinOpen] = useState(false);
  const dentalRef = useRef<HTMLDivElement>(null);
  const skinRef = useRef<HTMLDivElement>(null);

  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
    setDentalOpen(false);
    setSkinOpen(false);
  }, [currentPath]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dentalRef.current && !dentalRef.current.contains(e.target as Node)) {
        setDentalOpen(false);
      }
      if (skinRef.current && !skinRef.current.contains(e.target as Node)) {
        setSkinOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const featuredDental = DENTAL_SERVICES.slice(0, 5);
  const featuredSkin = SKIN_SERVICES.slice(0, 5);

  const searchResults = searchQuery.trim()
    ? [
        ...DENTAL_SERVICES.filter(
          (s) =>
            s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.blurb.toLowerCase().includes(searchQuery.toLowerCase()),
        ).map((s) => ({ ...s, type: "Dental", href: "/dental" })),
        ...SKIN_SERVICES.filter(
          (s) =>
            s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.blurb.toLowerCase().includes(searchQuery.toLowerCase()),
        ).map((s) => ({ ...s, type: "Skin", href: "/skin" })),
      ].slice(0, 6)
    : [];

  return (
    <header className="fixed inset-x-0 top-0 z-50 shadow-sm">
      {/* 1. Top Bar: Luxury White Tier with Logo, Contact, and Royal Navy Pill Button */}
      <div className="border-b border-slate-200/80 bg-white px-4 py-2.5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Logo & Clinic Branding */}
          <Link to="/" className="press flex items-center gap-3" aria-label={`${CLINIC.name} home`}>
            <div className="flex size-11 items-center justify-center overflow-hidden rounded-md bg-white p-1">
              <Logo className="h-full w-auto object-contain" />
            </div>
            <div className="leading-tight">
              <span className="block font-sans text-xl font-bold tracking-tight text-[#011838]">
                {CLINIC.name}
              </span>
              <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-600">
                {CLINIC.tagline}
              </span>
            </div>
          </Link>

          {/* Right Area: Timings / City + Phone + Pill Book CTA + Search */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Subtle City & Timings indicator (Desktop) */}
            <div className="hidden items-center gap-4 text-xs text-slate-600 xl:flex">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-sky-600" aria-hidden />
                <span className="font-medium">{CLINIC.city}, Pakistan</span>
              </span>
              <span className="h-3 w-px bg-slate-200" aria-hidden />
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-sky-600" aria-hidden />
                <span>Mon – Sat: 11am – 9pm</span>
              </span>
            </div>

            {/* Direct Phone Link */}
            <a
              href={CLINIC.phoneHref}
              className="hidden items-center gap-1.5 text-xs font-semibold text-[#012c70] transition-colors hover:text-sky-600 md:inline-flex"
            >
              <Phone className="size-3.5 text-sky-600" aria-hidden />
              <span>{CLINIC.phoneDisplay}</span>
            </a>

            {/* Dental Aesthetics style Royal Navy Pill CTA */}
            <Link
              to="/book"
              className="press inline-flex items-center gap-2 rounded-full bg-[#012c70] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#011f4b] hover:shadow-md"
            >
              <CalendarCheck className="size-3.5" aria-hidden />
              <span>BOOK A CONSULTATION</span>
            </Link>

            {/* Quick Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="press inline-flex size-9 items-center justify-center rounded-full border border-slate-200 text-[#012c70] transition-colors hover:bg-slate-100"
              aria-label="Search treatments"
            >
              <Search className="size-4" aria-hidden />
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="press inline-flex size-9 items-center justify-center rounded-md border border-slate-200 text-[#012c70] transition-colors hover:bg-slate-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Lower Navigation Bar: Royal Navy Tier (#012c70) with Dropdowns */}
      <div className="hidden bg-[#012c70] lg:block">
        <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-8">
          <nav
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white"
            aria-label="Main Navigation"
          >
            <Link
              to="/"
              activeProps={{ className: "text-sky-300 font-bold" }}
              className="rounded-md px-4 py-1.5 transition-colors hover:text-sky-300"
            >
              Home
            </Link>

            {/* Dental Dropdown */}
            <div
              ref={dentalRef}
              className="relative"
              onMouseEnter={() => setDentalOpen(true)}
              onMouseLeave={() => setDentalOpen(false)}
            >
              <Link
                to="/dental"
                activeProps={{ className: "text-sky-300 font-bold" }}
                className="inline-flex items-center gap-1 rounded-md px-4 py-1.5 transition-colors hover:text-sky-300"
              >
                <span>Dental Care</span>
                <ChevronDown
                  className={`size-3 opacity-80 transition-transform duration-200 ${dentalOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </Link>

              {dentalOpen && (
                <div className="animate-in fade-in zoom-in-95 absolute left-0 top-full w-80 pt-1 duration-150">
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-2xl normal-case text-slate-800">
                    <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-700">
                      Featured Dental Treatments
                    </p>
                    <div className="mt-1 space-y-1">
                      {featuredDental.map((service) => (
                        <Link
                          key={service.slug}
                          to="/dental"
                          className="flex flex-col rounded-lg px-3 py-1.5 transition-colors hover:bg-sky-50"
                        >
                          <span className="text-xs font-semibold text-slate-900">
                            {service.title}
                          </span>
                          <span className="line-clamp-1 text-[11px] text-slate-500">
                            {service.blurb}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2 border-t border-slate-100 pt-2">
                      <Link
                        to="/dental"
                        className="flex items-center justify-between rounded-md px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-50"
                      >
                        <span>View All 16 Dental Treatments</span>
                        <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Skin Clinic Dropdown */}
            <div
              ref={skinRef}
              className="relative"
              onMouseEnter={() => setSkinOpen(true)}
              onMouseLeave={() => setSkinOpen(false)}
            >
              <Link
                to="/skin"
                activeProps={{ className: "text-sky-300 font-bold" }}
                className="inline-flex items-center gap-1 rounded-md px-4 py-1.5 transition-colors hover:text-sky-300"
              >
                <span>Skin Clinic</span>
                <ChevronDown
                  className={`size-3 opacity-80 transition-transform duration-200 ${skinOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </Link>

              {skinOpen && (
                <div className="animate-in fade-in zoom-in-95 absolute left-0 top-full w-80 pt-1 duration-150">
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-2xl normal-case text-slate-800">
                    <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-700">
                      Medical Dermatology &amp; Aesthetics
                    </p>
                    <div className="mt-1 space-y-1">
                      {featuredSkin.map((service) => (
                        <Link
                          key={service.title}
                          to="/skin"
                          className="flex flex-col rounded-lg px-3 py-1.5 transition-colors hover:bg-sky-50"
                        >
                          <span className="text-xs font-semibold text-slate-900">
                            {service.title}
                          </span>
                          <span className="line-clamp-1 text-[11px] text-slate-500">
                            {service.blurb}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2 border-t border-slate-100 pt-2">
                      <Link
                        to="/skin"
                        className="flex items-center justify-between rounded-md px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-50"
                      >
                        <span>View All 13 Skin Treatments</span>
                        <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/doctors"
              activeProps={{ className: "text-sky-300 font-bold" }}
              className="rounded-md px-4 py-1.5 transition-colors hover:text-sky-300"
            >
              Doctors &amp; Stories
            </Link>

            <Link
              to="/contact"
              activeProps={{ className: "text-sky-300 font-bold" }}
              className="rounded-md px-4 py-1.5 transition-colors hover:text-sky-300"
            >
              Contact &amp; FAQs
            </Link>
          </nav>

          {/* Quick WhatsApp helper pill in navbar */}
          <a
            href={CLINIC.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
          >
            <MessageCircle className="size-3.5" aria-hidden />
            <span>WhatsApp Quick Consult</span>
          </a>
        </div>
      </div>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-24 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-slate-800">
                <Search className="size-4 text-sky-600" />
                <span className="text-sm font-bold">Search Treatments &amp; Services</span>
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close search"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4">
              <input
                type="text"
                autoFocus
                placeholder="Type e.g. Implants, Braces, Whitening, Hydrafacial..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div className="mt-3 max-h-64 overflow-y-auto">
              {searchQuery && searchResults.length === 0 ? (
                <p className="py-6 text-center text-xs text-slate-500">
                  No treatments matching &ldquo;{searchQuery}&rdquo;. Try &ldquo;Implants&rdquo; or
                  &ldquo;Skin&rdquo;.
                </p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {searchResults.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between py-2.5 hover:bg-slate-50 px-2 rounded-md"
                    >
                      <div>
                        <p className="text-xs font-semibold text-slate-900">{item.title}</p>
                        <p className="line-clamp-1 text-[11px] text-slate-500">{item.blurb}</p>
                      </div>
                      <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-700">
                        {item.type}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#011f4b] text-white lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-white/15 px-6">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center overflow-hidden rounded-md bg-white p-1">
                <Logo className="h-full w-auto object-contain" />
              </div>
              <span className="font-sans text-base font-bold text-white">{CLINIC.name}</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="press inline-flex size-9 items-center justify-center rounded-md border border-white/20 text-white"
              aria-label="Close menu"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile Navigation">
            <div className="space-y-4">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block text-base font-semibold text-white hover:text-sky-300"
              >
                Home
              </Link>
              <Link
                to="/dental"
                onClick={() => setOpen(false)}
                className="block text-base font-semibold text-white hover:text-sky-300"
              >
                Dental Care Services
              </Link>
              <Link
                to="/skin"
                onClick={() => setOpen(false)}
                className="block text-base font-semibold text-white hover:text-sky-300"
              >
                Skin Clinic &amp; Aesthetics
              </Link>
              <Link
                to="/doctors"
                onClick={() => setOpen(false)}
                className="block text-base font-semibold text-white hover:text-sky-300"
              >
                Doctors &amp; Stories
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block text-base font-semibold text-white hover:text-sky-300"
              >
                Contact &amp; FAQs
              </Link>
            </div>

            <div className="mt-8 space-y-3 border-t border-white/15 pt-6">
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-xs font-bold uppercase tracking-wider text-[#012c70] shadow-md"
              >
                <CalendarCheck className="size-4" />
                <span>Book a Consultation</span>
              </Link>
              <a
                href={CLINIC.phoneHref}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 py-3 text-xs font-semibold text-white"
              >
                <Phone className="size-4 text-sky-300" />
                <span>Call {CLINIC.phoneDisplay}</span>
              </a>
              <a
                href={CLINIC.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-xs font-semibold text-white"
              >
                <MessageCircle className="size-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
