import { useInView } from "@/hooks/useInView";

type Line = { words: string[]; tone: "red" | "cream" };

const LINES: Line[] = [
  { words: ["GRANDES", "EVENTOS", "FAZEM"], tone: "red" },
  { words: ["PARTE", "DA", "NOSSA", "HISTÓRIA."], tone: "red" },
  { words: ["CRIAR", "OS", "PRÓXIMOS", "FAZ"], tone: "cream" },
  { words: ["PARTE", "DO", "NOSSO", "FUTURO."], tone: "cream" },
];

const TONE_CLASS: Record<Line["tone"], string> = {
  red: "text-trio-red",
  cream: "text-cream",
};

const HistoriaFuturo = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  let wordIndex = 0;

  return (
    <section className="overflow-hidden bg-ink py-24 sm:py-32">
      <div ref={ref} className="container">
        {LINES.map((line, li) => (
          <div
            key={li}
            className="flex flex-wrap justify-between gap-x-4 border-b border-cream/15 py-3 sm:py-4"
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
                    className={`word-hover text-display text-4xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl ${TONE_CLASS[line.tone]}`}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center sm:mt-16">
        <span className="h-3 w-10 rounded-full border border-cream/30" aria-hidden="true" />
      </div>
    </section>
  );
};

export default HistoriaFuturo;
