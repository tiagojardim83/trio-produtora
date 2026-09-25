import { useInView } from "@/hooks/useInView";

type Line = { words: string[]; tone: "ink" | "cream" };

const LINES: Line[] = [
  { words: ["GRANDES", "EVENTOS", "FAZEM"], tone: "ink" },
  { words: ["PARTE", "DA", "NOSSA", "HISTÓRIA."], tone: "ink" },
  { words: ["CRIAR", "OS", "PRÓXIMOS", "FAZ"], tone: "cream" },
  { words: ["PARTE", "DO", "NOSSO", "FUTURO."], tone: "cream" },
];

const TONE_CLASS: Record<Line["tone"], string> = {
  ink: "text-ink",
  cream: "text-cream",
};

const HistoriaFuturo = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  let wordIndex = 0;

  return (
    <section className="overflow-hidden bg-trio-red py-20 sm:py-28">
      <div ref={ref} className="container">
        {LINES.map((line, li) => (
          <div
            key={li}
            className="flex flex-wrap justify-between gap-x-4 border-b border-ink/25 py-2 sm:py-3"
          >
            {line.words.map((word) => {
              const i = wordIndex++;
              const wobble = i % 2 === 0 ? "-6deg" : "6deg";
              return (
                <span
                  key={i}
                  className={`reveal-word ${inView ? "is-visible" : ""}`}
                  style={
                    {
                      transitionDelay: inView ? `${i * 60}ms` : "0ms",
                      "--wobble": wobble,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={`word-hover text-display text-3xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl ${TONE_CLASS[line.tone]}`}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center sm:mt-14">
        <span className="h-3 w-10 rounded-full border border-ink/40" aria-hidden="true" />
      </div>
    </section>
  );
};

export default HistoriaFuturo;
