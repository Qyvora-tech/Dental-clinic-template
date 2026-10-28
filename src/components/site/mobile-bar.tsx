import { Link } from "@tanstack/react-router";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { CLINIC } from "@/lib/clinic";

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#011e4d]/95 backdrop-blur-md text-white md:hidden">
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href={CLINIC.phoneHref}
          className="press flex flex-col items-center gap-1 py-2.5 text-[0.7rem] text-white/90 hover:text-white"
        >
          <Phone className="size-4 text-sky-400" aria-hidden />
          <span>Call</span>
        </a>
        <a
          href={CLINIC.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="press flex flex-col items-center gap-1 py-2.5 text-[0.7rem] text-emerald-400 hover:text-emerald-300"
        >
          <MessageCircle className="size-4" aria-hidden />
          <span>WhatsApp</span>
        </a>
        <Link
          to="/book"
          className="press flex flex-col items-center gap-1 bg-sky-500 py-2.5 text-[0.7rem] font-semibold text-white transition-colors hover:bg-sky-400"
        >
          <CalendarCheck className="size-4" aria-hidden />
          <span>Book Now</span>
        </Link>
      </div>
    </div>
  );
}
