import type { ReactNode } from "react";

const Pill = ({ children, tone = "red" }: { children: ReactNode; tone?: "red" | "cream" }) => {
  const toneClasses =
    tone === "red"
      ? "border-trio-red text-trio-red"
      : "border-cream/60 text-cream";

  return (
    <span
      className={`inline-block rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] ${toneClasses}`}
    >
      {children}
    </span>
  );
};

export default Pill;
