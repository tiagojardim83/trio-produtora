import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

const STATS = [
  { target: 200, suffix: "+", label: "Eventos realizados" },
  { target: 12, suffix: "+", label: "Anos de mercado" },
  { target: 100, suffix: "mil+", label: "Pessoas impactadas" },
  { target: 20, suffix: "+", label: "Cidades atendidas" },
];

const StatItem = ({
  target,
  suffix,
  label,
  active,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  active: boolean;
  delay: number;
}) => {
  const count = useCountUp(target, active, 1300);

  return (
    <div
      className={`reveal text-center sm:text-left ${active ? "is-visible" : ""}`}
      style={{ transitionDelay: active ? `${delay}ms` : "0ms" }}
    >
      <p className="text-display text-5xl leading-none text-trio-red tabular-nums sm:text-6xl">
        {count}
        {suffix}
      </p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-cream/60 sm:text-sm">
        {label}
      </p>
    </div>
  );
};

const Estatisticas = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="border-y border-cream/10 bg-ink py-16 sm:py-20">
      <div ref={ref} className="container grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <StatItem key={stat.label} {...stat} active={inView} delay={i * 110} />
        ))}
      </div>
    </section>
  );
};

export default Estatisticas;
