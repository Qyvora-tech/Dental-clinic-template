import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CONSULTATION_QUESTIONS } from "@/lib/clinic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ServiceDetails({
  title,
  blurb,
  group,
  treatment,
  label = "Explore treatment",
}: {
  title: string;
  blurb: string;
  group: keyof typeof CONSULTATION_QUESTIONS;
  treatment: string;
  label?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger
        className="press inline-flex items-center gap-1.5 py-2 text-sm font-medium text-primary hover:text-teal"
        aria-label={`${label}: ${title}`}
      >
        {label}
        <ArrowUpRight className="size-4" aria-hidden />
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-md p-7 sm:p-9">
        <p className="eyebrow">{group === "Skin" ? "Skin clinic" : `${group} dentistry`}</p>
        <DialogTitle className="font-display text-3xl font-normal leading-tight">
          {title}
        </DialogTitle>
        <DialogDescription className="leading-relaxed">{blurb}</DialogDescription>
        <div className="mt-2 rounded-md bg-ice p-5">
          <h3 className="text-lg">Questions for your consultation</h3>
          <ul className="mt-3 list-disc space-y-3 pl-5 text-sm text-muted-foreground">
            {CONSULTATION_QUESTIONS[group].map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your examination comes first. Discuss suitability, expected visits and a written estimate
          with the clinician before deciding on treatment.
        </p>
        <Link
          to="/book"
          search={{ treatment }}
          className="press mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        >
          Request this consultation <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </DialogContent>
    </Dialog>
  );
}
