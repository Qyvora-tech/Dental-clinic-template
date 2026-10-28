import logo from "@/assets/city-smiles-logo.jpg";
import { CLINIC } from "@/lib/clinic";

export function Logo({ className = "h-11 w-auto" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt={`${CLINIC.name} ${CLINIC.tagline} logo`}
      className={className}
      width={264}
      height={240}
      decoding="async"
    />
  );
}
