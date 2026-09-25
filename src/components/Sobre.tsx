import { useEffect, useState } from "react";
import sobrePhoto from "@/assets/photos/foto075.jpg";
import sobrePhoto2 from "@/assets/photos/foto02.jpg";
import sobrePhoto3 from "@/assets/photos/foto029.jpg";
import Pill from "./Pill";
import DraggablePill from "./DraggablePill";
import { useInView } from "@/hooks/useInView";

const SOBRE_PHOTOS = [sobrePhoto, sobrePhoto2, sobrePhoto3];

const Sobre = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    SOBRE_PHOTOS.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setSlideIndex((index) => (index + 1) % SOBRE_PHOTOS.length);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const { ref, inView } = useInView<HTMLDivElement>();
  const v = (delay: number) => ({ transitionDelay: inView ? `${delay}ms` : "0ms" });

  return (
    <section
      id="sobre"
      className="relative overflow-hidden rounded-[2rem] bg-ink text-cream sm:rounded-[3rem]"
    >
      <div
        ref={ref}
        className="relative flex min-h-[80vh] w-full flex-col justify-end sm:min-h-[85vh]"
      >
        <img
          src={SOBRE_PHOTOS[slideIndex]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

        <div className="container relative z-10 py-16 sm:py-20">
          <div className={`reveal ${inView ? "is-visible" : ""}`} style={v(0)}>
            <Pill tone="cream">Sobre nós</Pill>
          </div>

          <h2
            className={`reveal mt-5 text-display text-5xl leading-[0.95] text-trio-red sm:text-6xl sm:leading-[0.85] md:text-7xl ${
              inView ? "is-visible" : ""
            }`}
            style={v(150)}
          >
            Somos a Trio
          </h2>

          <div
            className={`reveal mt-6 max-w-lg space-y-3 text-sm leading-relaxed text-cream/80 sm:text-base ${
              inView ? "is-visible" : ""
            }`}
            style={v(300)}
          >
            <p>
              <strong className="text-cream">
                A Trio Produtora cria, produz e realiza grandes experiências de entretenimento.
              </strong>{" "}
              Com atuação em Minas Gerais, construímos eventos, shows, festivais e projetos
              especiais que conectam artistas, público e marcas.
            </p>
            <p>
              Nossa história passa por{" "}
              <strong className="text-cream">
                alguns dos maiores eventos e shows realizados no estado
              </strong>
              , além de turnês de grandes artistas nacionais e apresentações internacionais.
            </p>
          </div>
        </div>

        <DraggablePill position="top-[4%] left-[4%] lg:top-[10%] lg:left-[56%]" rotate={-6}>
          Experiência para produzir.
        </DraggablePill>
        <DraggablePill position="top-[16%] left-[46%] lg:top-[38%] lg:left-[78%]" rotate={4}>
          Estrutura para realizar.
        </DraggablePill>
        <DraggablePill position="top-[30%] left-[8%] lg:top-[62%] lg:left-[58%]" rotate={-3}>
          Visão para criar.
        </DraggablePill>
      </div>
    </section>
  );
};

export default Sobre;
