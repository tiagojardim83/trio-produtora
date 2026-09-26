import { useInView } from "@/hooks/useInView";

type Line = { desktopWords: string[]; mobileGroups: string[][]; tone: "red" | "cream" };

const LINES: Line[] = [
  {
    desktopWords: ["GRANDES", "EVENTOS", "FAZEM"],
    mobileGroups: [["GRANDES"], ["EVENTOS"], ["FAZEM"]],
    tone: "red",
  },
  {
    desktopWords: ["PARTE", "DA", "NOSSA", "HISTÓRIA."],
    mobileGroups: [["PARTE", "DA"], ["NOSSA"], ["HISTÓRIA."]],
    tone: "red",
  },
  {
    desktopWords: ["CRIAR", "OS", "PRÓXIMOS", "FAZ"],
    mobileGroups: [["CRIAR", "OS"], ["PRÓXIMOS"], ["FAZ"]],
    tone: "cream",
  },
  {
    desktopWords: ["PARTE", "DO", "NOSSO", "FUTURO."],
    mobileGroups: [["PARTE"], ["DO", "NOSSO"], ["FUTURO."]],
    tone: "cream",
  },
];

const TONE_CLASS: Record<Line["tone"], string> = {
  red: "text-trio-red",
  cream: "text-cream",
};

const Word = ({
  word,
  index,
  inView,
  underline = false,
}: {
  word: string;
  index: number;
  inView: boolean;
  underline?: boolean;
}) => {
  const wobble = index % 2 === 0 ? "-6deg" : "6deg";
  return (
    <span
      className={`reveal-word ${inView ? "is-visible" : ""}`}
      style={
        {
          transitionDelay: inView ? `${index * 60}ms` : "0ms",
          "--wobble": wobble,
        } as React.CSSProperties
      }
    >
      <span className={`word-hover ${underline ? "underline" : ""}`}>{word}</span>
    </span>
  );
};

const HistoriaFuturo = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  let mobileIndex = 0;
  let desktopIndex = 0;

  return (
    <section className="overflow-hidden bg-ink">
      <div ref={ref} className="container flex flex-col justify-center py-10 sm:py-32">
        {/* Mobile: explicit grouped rows, alternating alignment */}
        <div className="sm:hidden">
          {LINES.map((line, li) => (
            <div key={li} className={`flex flex-col ${li % 2 === 0 ? "items-start" : "items-end"}`}>
              {line.mobileGroups.map((group, gi) => (
                <div
                  key={gi}
                  className={`text-display text-5xl leading-[1.15] decoration-2 underline-offset-[8px] ${TONE_CLASS[line.tone]}`}
                >
                  {group.map((word, wi) => {
                    const i = mobileIndex++;
                    return (
                      <span key={wi}>
                        <Word word={word} index={i} inView={inView} underline />
                        {wi < group.length - 1 ? <span className="underline"> </span> : null}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Desktop: single justified row per line, full-width divider */}
        <div className="hidden sm:block">
          {LINES.map((line, li) => (
            <div
              key={li}
              className={`flex flex-wrap justify-between gap-x-4 border-b border-cream/15 py-8 text-display text-7xl leading-none md:text-8xl lg:text-9xl ${TONE_CLASS[line.tone]}`}
            >
              {line.desktopWords.map((word, wi) => {
                const i = desktopIndex++;
                return <Word key={wi} word={word} index={i} inView={inView} />;
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoriaFuturo;
