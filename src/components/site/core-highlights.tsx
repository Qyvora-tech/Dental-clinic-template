import { Link } from "@tanstack/react-router";
import cleaning from "@/assets/cleaning.jpg";
import braces from "@/assets/braces.jpg";
import skinConsult from "@/assets/skin-consult.jpg";
import clinicInterior from "@/assets/clinic-interior.jpg";
import { Reveal } from "./reveal";

const HIGHLIGHT_CARDS = [
  {
    title: "EMERGENCY DENTISTRY",
    subtitle: "24 Hours Service",
    description: "Priority relief for acute toothache, swelling & fractured teeth.",
    image: clinicInterior,
    alt: "Emergency dental clinic treatment room in Sialkot",
    href: "/contact",
  },
  {
    title: "DENTAL IMPLANTS",
    subtitle: "Qualified Doctors",
    description: "Permanent tooth replacement with foreign-certified titanium implants.",
    image: cleaning,
    alt: "Dentist performing dental implant and restorative treatment",
    href: "/dental",
  },
  {
    title: "CLEAR BRACES",
    subtitle: "We Are Here For You",
    description: "Correct and straighten your teeth for a perfectly natural smile.",
    image: braces,
    alt: "Clear aligners and aesthetic orthodontic braces",
    href: "/dental",
  },
  {
    title: "AESTHETIC SKIN CARE",
    subtitle: "Certified Dermatologists",
    description: "Medical Hydrafacial, clinical acne care & laser glow rejuvenation.",
    image: skinConsult,
    alt: "Doctor providing clinical skin consultation and hydrafacial",
    href: "/skin",
  },
];

export function CoreHighlights() {
  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {HIGHLIGHT_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 70}>
              <Link
                to={card.href}
                className="group relative block aspect-[4/3] sm:h-[290px] lg:h-[310px] w-full overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Photographic Background */}
                <img
                  src={card.image}
                  alt={card.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dental Aesthetics Royal Navy Overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[#012c70]/68 transition-colors duration-300 group-hover:bg-[#011f4b]/78"
                />

                {/* Inset White Border Box */}
                <div className="absolute inset-3.5 flex flex-col items-center justify-center rounded-lg border border-white/50 p-4 text-center transition-all duration-300 group-hover:border-white/90 group-hover:bg-black/10 sm:inset-4">
                  <h3 className="font-sans text-base font-bold tracking-wider text-white uppercase sm:text-lg">
                    {card.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs font-normal text-white/90">
                    {card.subtitle}
                  </p>

                  {/* Clean White Accent Bar */}
                  <div
                    aria-hidden
                    className="my-2.5 h-[2px] w-12 bg-white transition-all duration-300 group-hover:w-16"
                  />

                  {/* Concise 1-Line Description */}
                  <p className="max-w-[240px] font-sans text-xs leading-relaxed text-white/90 line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
