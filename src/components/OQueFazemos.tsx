import eventosPhoto from "@/assets/photos/foto047.jpg";
import showsPhoto from "@/assets/photos/foto029.jpg";
import projetosPhoto from "@/assets/photos/frente-projetos-especiais.jpg";
import experienciasPhoto from "@/assets/photos/frente-experiencias-marca.jpg";
import Pill from "./Pill";
import { useInView } from "@/hooks/useInView";

type Frente = {
  title: string;
  description: string;
  photo: string;
  alt: string;
  objectPosition?: string;
};

const FRENTES: Frente[] = [
  {
    title: "Eventos",
    description: "Concepção, produção e realização de eventos próprios e de parceiros.",
    photo: eventosPhoto,
    alt: "Arena tomada por multidão durante evento produzido pela Trio",
  },
  {
    title: "Shows & festivais",
    description: "Grandes apresentações, festivais, turnês e experiências musicais.",
    photo: showsPhoto,
    alt: "Artista se apresentando em palco de grande produção",
  },
  {
    title: "Projetos especiais",
    description: "Projetos desenvolvidos a partir de objetivos e oportunidades específicas.",
    photo: projetosPhoto,
    alt: "Bar ao ar livre decorado com luzes e palmeiras, cheio de convidados",
  },
  {
    title: "Experiências de marca",
    description: "Integração entre marcas, eventos e público através de experiências relevantes.",
    photo: experienciasPhoto,
    alt: "Convidada segurando lata de cerveja Bohemia em ativação de marca",
    objectPosition: "center 15%",
  },
];

const FrenteRow = ({
  frente,
  fromSide,
  index,
}: {
  frente: (typeof FRENTES)[number];
  fromSide: "left" | "right";
  index: number;
}) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = (delay: number) => ({ transitionDelay: inView ? `${delay}ms` : "0ms" });

  return (
    <div
      ref={ref}
      className="sticky top-0 h-[55vh] min-h-[360px] w-full overflow-hidden rounded-xl"
      style={{ zIndex: 10 + index * 10 }}
    >
      <img
        src={frente.photo}
        alt={frente.alt}
        className={`absolute inset-0 h-full w-full object-cover ${
          fromSide === "left" ? "reveal-left" : "reveal-right"
        } ${inView ? "is-visible" : ""}`}
        style={{ ...v(0), objectPosition: frente.objectPosition ?? "center" }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

      <div className="container relative z-10 flex h-full flex-col justify-center">
        <h3
          className={`reveal text-display text-5xl leading-[0.95] text-trio-red sm:text-6xl sm:leading-[0.85] md:text-7xl ${
            inView ? "is-visible" : ""
          }`}
          style={v(200)}
        >
          {frente.title}
        </h3>
        <p
          className={`reveal mt-4 max-w-sm text-sm font-semibold text-cream sm:text-base ${
            inView ? "is-visible" : ""
          }`}
          style={v(350)}
        >
          {frente.description}
        </p>
      </div>
    </div>
  );
};

const OQueFazemos = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = (delay: number) => ({ transitionDelay: inView ? `${delay}ms` : "0ms" });

  return (
    <section id="o-que-fazemos" className="relative bg-ink">
      <div ref={ref} className="container relative z-[5] bg-ink py-24 sm:py-32">
        <div className={`reveal ${inView ? "is-visible" : ""}`} style={v(0)}>
          <Pill tone="cream">O que fazemos</Pill>
        </div>
        <h2
          className={`reveal mt-6 max-w-3xl text-display text-5xl leading-[1] text-trio-red sm:text-6xl sm:leading-[0.9] md:text-7xl ${
            inView ? "is-visible" : ""
          }`}
          style={v(150)}
        >
          Mais do que produzir eventos
        </h2>
        <p
          className={`reveal mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-cream/60 ${
            inView ? "is-visible" : ""
          }`}
          style={v(300)}
        >
          A Trio atua em diferentes frentes do entretenimento
        </p>
      </div>

      <div className="relative">
        {FRENTES.map((frente, i) => (
          <FrenteRow key={frente.title} frente={frente} fromSide={i % 2 === 0 ? "left" : "right"} index={i} />
        ))}
      </div>
    </section>
  );
};

export default OQueFazemos;
