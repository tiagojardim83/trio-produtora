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
    <section className="overflow-hidden bg-ink">
      <div
        ref={ref}
        className="container flex flex-col justify-center py-10 sm:py-32"
      >
        {LINES.map((line, li) => (
          <div
            key={li}
            className={`text-display text-5xl decoration-2 underline-offset-[10px] leading-[1.55] ${
              li % 2 === 0 ? "text-left" : "text-right"
            } sm:flex sm:flex-wrap sm:justify-between sm:gap-x-4 sm:text-7xl sm:leading-none sm:text-left sm:border-b sm:border-cream/15 sm:py-8 md:text-8xl lg:text-9xl ${TONE_CLASS[line.tone]}`}
          >
            {line.words.map((word, wi) => {
              const i = wordIndex++;
              const wobble = i % 2 === 0 ? "-6deg" : "6deg";
              return (
                <span key={i}>
                  <span
                    className={`reveal-word ${inView ? "is-visible" : ""}`}
                    style={
                      {
                        transitionDelay: inView ? `${i * 60}ms` : "0ms",
                        "--wobble": wobble,
                      } as React.CSSProperties
                    }
                  >
                    <span className="word-hover underline sm:no-underline">{word}</span>
                  </span>
                  {wi < line.words.length - 1 ? <span className="underline sm:hidden"> </span> : null}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoriaFuturo;
