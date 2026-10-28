import { Link } from "@tanstack/react-router";
import {
  Award,
  CalendarCheck,
  CheckCircle,
  GraduationCap,
  Phone,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import clinicInterior from "@/assets/clinic-interior.jpg";
import { CLINIC } from "@/lib/clinic";
import { Reveal } from "./reveal";

export function DoctorLead() {
  return (
    <section className="border-t border-border bg-slate-900 py-20 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20">
                <Award className="size-3.5 text-sky-400" aria-hidden />
                <span>Foreign Trained &amp; PMDC Registered Specialists</span>
              </div>

              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Expert Clinical Leadership in Sialkot
              </h2>

              <p className="mt-4 text-base leading-relaxed text-white/80">
                At City Smiles, every diagnosis and procedural plan is directed by certified dental
                surgeons and dermatology specialists. We combine internationally recognized clinical
                techniques with a gentle, patient-first approach.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2.5 text-sky-400">
                    <GraduationCap className="size-5" aria-hidden />
                    <span className="text-sm font-bold text-white">BDS, RDS, FCPS</span>
                  </div>
                  <p className="mt-1 text-xs text-white/70">
                    Accredited degrees with continuous professional certifications.
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2.5 text-teal">
                    <ShieldCheck className="size-5" aria-hidden />
                    <span className="text-sm font-bold text-white">PMDC Registered</span>
                  </div>
                  <p className="mt-1 text-xs text-white/70">
                    Officially certified and compliant with Pakistan Medical Commission.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/doctors"
                  className="press inline-flex items-center gap-2 rounded-md bg-sky-500 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-soft transition-colors hover:bg-sky-400"
                >
                  <UserCheck className="size-4" aria-hidden />
                  Meet All Specialists
                </Link>
                <Link
                  to="/book"
                  className="press inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10"
                >
                  <CalendarCheck className="size-4" aria-hidden />
                  Book Appointment
                </Link>
              </div>
            </div>

            {/* Clinic / Doctor Portrait Frame */}
            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-card shadow-lift">
                <img
                  src={clinicInterior}
                  alt="City Smiles Dental &amp; Skin Clinic interior in Sialkot"
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-lg border border-white/10 bg-[#011e4d] p-5 shadow-lift sm:block">
                <p className="font-display text-2xl font-bold text-sky-400">100%</p>
                <p className="text-xs text-white/80">Single-Use Autoclaved Protocols</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
