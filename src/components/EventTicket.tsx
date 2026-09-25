import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type EventTicketProps = {
  eyebrow: string;
  title: string;
  date: string;
  isoDate: string;
  venue: string;
  detail?: string;
  ctaLabel: string;
  ctaHref: string;
  internal?: boolean;
  accent?: "red" | "gold" | "purple";
  children?: ReactNode;
};

const ACCENTS = {
  red: "bg-trio-red text-cream",
  gold: "bg-trio-gold text-ink",
  purple: "bg-trio-purple text-cream",
};

const EventTicket = ({
  eyebrow,
  title,
  date,
  isoDate,
  venue,
  detail,
  ctaLabel,
  ctaHref,
  internal,
  accent = "red",
  children,
}: EventTicketProps) => {
  const isPast = new Date(isoDate).getTime() < Date.now();

  const cta = isPast ? (
    <span className="inline-flex items-center justify-center rounded-full border border-cream/25 px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream/50">
      Evento realizado
    </span>
  ) : internal ? (
    <Link
      to={ctaHref}
      className="inline-flex items-center justify-center rounded-full bg-cream px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-cream/85"
    >
      {ctaLabel}
    </Link>
  ) : (
    <a
      href={ctaHref}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-full bg-cream px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-cream/85"
    >
      {ctaLabel}
    </a>
  );

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-surface text-cream ring-1 ring-cream/10 sm:flex-row">
      <div className={`relative flex shrink-0 flex-col justify-between p-8 sm:w-64 ${ACCENTS[accent]} ${isPast ? "opacity-60" : ""}`}>
        <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">{eyebrow}</span>
        <span className="mt-6 text-display text-4xl leading-[0.85] sm:text-5xl">{date}</span>
      </div>

      <div className="ticket-perforation hidden w-px shrink-0 sm:block" />
      <div className="ticket-perforation block h-px w-full shrink-0 rotate-0 sm:hidden" />

      <div className="flex flex-1 flex-col justify-between gap-6 p-8 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-display text-3xl leading-[1] sm:text-4xl sm:leading-[0.9]">{title}</h3>
          <p className="mt-2 text-sm font-semibold text-cream/70">{venue}</p>
          {detail && <p className="mt-1 text-sm text-cream/50">{detail}</p>}
          {children}
        </div>
        <div className="shrink-0">{cta}</div>
      </div>
    </div>
  );
};

export default EventTicket;
