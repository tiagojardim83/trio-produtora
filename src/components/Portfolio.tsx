import Pill from "./Pill";
import { useInView } from "@/hooks/useInView";
import labelsImg from "@/assets/labels.png";

const Portfolio = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="overflow-hidden bg-ink py-24 sm:py-32">
      <div ref={ref} className="container">
        <div className={`reveal ${inView ? "is-visible" : ""}`}>
          <Pill tone="cream">Portfólio</Pill>
        </div>
        <h2
          className={`reveal mt-6 max-w-xl text-display text-5xl leading-[1] text-cream sm:text-6xl sm:leading-[0.9] ${
            inView ? "is-visible" : ""
          }`}
          style={{ transitionDelay: inView ? "150ms" : "0ms" }}
        >
          As festas que
          <br />
          a Trio assina
        </h2>
      </div>

      <div className="relative mt-14 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-24">
          <img
            src={labelsImg}
            alt="Selos das festas assinadas pela Trio: ExpoAgro GV, Churrascão do Cruzeiro, Divina Folia, Buteco do Fila, Gevê Folia, Clube Filadelfia, Arraiá Cruzeiro"
            className="h-[72px] w-auto shrink-0 sm:h-[104px]"
          />
          <img src={labelsImg} alt="" aria-hidden="true" className="h-[72px] w-auto shrink-0 sm:h-[104px]" />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
