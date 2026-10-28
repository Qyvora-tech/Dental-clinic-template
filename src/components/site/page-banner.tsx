import { Link } from "@tanstack/react-router";
import { ChevronRight, CalendarCheck, Phone } from "lucide-react";
import { CLINIC } from "@/lib/clinic";

interface PageBannerProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  badge?: string;
  breadcrumb: string;
}

export function PageBanner({
  title,
  subtitle,
  eyebrow,
  badge = "Sialkot Clinic",
  breadcrumb,
}: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-navy pt-28 pb-16 text-white md:pt-36 md:pb-20">
      {/* Background glow & subtle ambient styling */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--color-sky, #0ea8e6) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full opacity-15 blur-2xl"
        style={{
          background: "radial-gradient(circle, var(--color-teal, #14b8a6) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Breadcrumb & location badge */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight className="size-3.5 opacity-60" aria-hidden />
          <span className="font-medium text-white">{breadcrumb}</span>
          {badge && (
            <span className="ml-2 inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-[0.7rem] font-medium text-sky-300">
              {badge}
            </span>
          )}
        </div>

        <div className="mt-6 max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/book"
              className="press inline-flex items-center gap-2 rounded-md bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-400"
            >
              <CalendarCheck className="size-4" aria-hidden />
              Book Consultation
            </Link>
            <a
              href={CLINIC.phoneHref}
              className="press inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Phone className="size-4 text-sky-400" aria-hidden />
              Call {CLINIC.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
