import { Link } from "@tanstack/react-router";
import { ChevronRight, CalendarCheck, Phone } from "lucide-react";
import clinicInterior from "@/assets/clinic-interior.jpg";
import { CLINIC } from "@/lib/clinic";

interface PageBannerProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  badge?: string;
  breadcrumb: string;
  image?: string;
  imageAlt?: string;
}

export function PageBanner({
  title,
  subtitle,
  eyebrow,
  badge = "Sialkot Clinic",
  breadcrumb,
  image = clinicInterior,
  imageAlt,
}: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-[#011f4b] pt-28 pb-16 text-white md:pt-36 md:pb-20">
      {/* Full-bleed Background Photograph */}
      <img
        src={image}
        alt={imageAlt || `${title} at ${CLINIC.name}`}
        width={1920}
        height={800}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[center_35%] select-none"
      />

      {/* Signature Dental Aesthetics Royal Navy Tint Overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#011a42]/94 via-[#012c70]/85 to-[#012c70]/70 backdrop-blur-[0.5px]"
      />

      {/* Background glow & subtle ambient styling */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--color-sky, #0ea8e6) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full opacity-20 blur-2xl"
        style={{
          background: "radial-gradient(circle, var(--color-teal, #14b8a6) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        {/* Breadcrumb & location badge */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-white/80">
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight className="size-3.5 opacity-60" aria-hidden />
          <span className="font-medium text-white">{breadcrumb}</span>
          {badge && (
            <span className="ml-2 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[0.7rem] font-medium text-sky-300 backdrop-blur-xs">
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
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/book"
              className="press inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#012c70] shadow-md transition-all hover:scale-105 hover:bg-slate-50"
            >
              <CalendarCheck className="size-4" aria-hidden />
              <span>Book Consultation</span>
            </Link>
            <a
              href={CLINIC.phoneHref}
              className="press inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xs transition-colors hover:bg-white/20"
            >
              <Phone className="size-3.5 text-sky-300" aria-hidden />
              <span>Call {CLINIC.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
