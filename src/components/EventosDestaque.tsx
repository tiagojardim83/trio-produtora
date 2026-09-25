import Pill from "./Pill";
import EventTicket from "./EventTicket";
import { useInView } from "@/hooks/useInView";
import { WHATSAPP_URL } from "@/lib/contact";

type Evento = {
  month: string;
  monthEndIso: string;
  title: string;
  city: string;
  accent: "red" | "gold" | "purple";
  internal?: boolean;
  ctaHref: string;
};

const EVENTOS: Evento[] = [
  { month: "Janeiro", monthEndIso: "2027-01-31", title: "Bloquinho da Lagoa", city: "Belo Horizonte", accent: "red", ctaHref: WHATSAPP_URL },
  { month: "Janeiro", monthEndIso: "2027-01-31", title: "Gevê Folia", city: "Governador Valadares", accent: "gold", ctaHref: WHATSAPP_URL },
  { month: "Fevereiro", monthEndIso: "2027-02-28", title: "Carnaval dos Sonhos", city: "Belo Horizonte", accent: "purple", ctaHref: WHATSAPP_URL },
  { month: "Abril", monthEndIso: "2027-04-30", title: "Buteco do Gusttavo Lima", city: "Belo Horizonte", accent: "red", ctaHref: WHATSAPP_URL },
  { month: "Abril", monthEndIso: "2027-04-30", title: "Axé Brasil Festival", city: "Belo Horizonte", accent: "gold", ctaHref: WHATSAPP_URL },
  { month: "Maio", monthEndIso: "2027-05-31", title: "Churrascão do Cruzeiro", city: "Belo Horizonte", accent: "purple", ctaHref: WHATSAPP_URL },
  { month: "Junho", monthEndIso: "2027-06-30", title: "Aniversário do Clube Filadélfia", city: "Governador Valadares", accent: "red", ctaHref: WHATSAPP_URL },
  { month: "Junho", monthEndIso: "2027-06-30", title: "Festa Junina do Cruzeiro", city: "Belo Horizonte", accent: "gold", ctaHref: WHATSAPP_URL },
  { month: "Julho", monthEndIso: "2027-07-31", title: "ExpoAgro GV", city: "Governador Valadares", accent: "purple", internal: true, ctaHref: "/expoagro" },
  { month: "Agosto", monthEndIso: "2027-08-31", title: "Vumbora BH", city: "Belo Horizonte", accent: "red", ctaHref: WHATSAPP_URL },
  { month: "Agosto", monthEndIso: "2027-08-31", title: "Expogenética Uberaba", city: "Uberaba", accent: "gold", ctaHref: WHATSAPP_URL },
  { month: "Setembro", monthEndIso: "2027-09-30", title: "Buteco do Fila", city: "Governador Valadares", accent: "purple", ctaHref: WHATSAPP_URL },
  { month: "Setembro", monthEndIso: "2027-09-30", title: "Corrida do Cruzeiro", city: "Divinópolis", accent: "red", ctaHref: WHATSAPP_URL },
  { month: "Novembro", monthEndIso: "2027-11-30", title: "Divina Folia", city: "Divinópolis", accent: "gold", ctaHref: WHATSAPP_URL },
];

const TicketRow = ({ evento, index }: { evento: Evento; index: number }) => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal sticky top-0 h-[320px] overflow-hidden rounded-xl bg-ink pb-8 sm:h-[190px] sm:pb-4 ${
        inView ? "is-visible" : ""
      }`}
      style={{ zIndex: 10 + index * 10 }}
    >
      <EventTicket
        eyebrow="2027"
        date={evento.month.toUpperCase()}
        isoDate={evento.monthEndIso}
        title={evento.title}
        venue={evento.city}
        ctaLabel="Mais informações"
        ctaHref={evento.ctaHref}
        internal={evento.internal}
        accent={evento.accent}
      />
    </div>
  );
};

const EventosDestaque = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = (delay: number) => ({ transitionDelay: inView ? `${delay}ms` : "0ms" });

  return (
    <section id="eventos" className="bg-ink py-24 sm:py-32">
      <div ref={ref} className="container">
        <div className={`reveal ${inView ? "is-visible" : ""}`} style={v(0)}>
          <Pill tone="cream">Agenda</Pill>
        </div>
        <h2
          className={`reveal mt-6 max-w-2xl text-display text-5xl leading-[1] text-cream sm:text-6xl sm:leading-[0.9] md:text-7xl ${
            inView ? "is-visible" : ""
          }`}
          style={v(150)}
        >
          Próximos eventos
        </h2>

        <div className="relative mt-14">
          {EVENTOS.map((evento, i) => (
            <TicketRow key={`${evento.title}-${evento.city}`} evento={evento} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventosDestaque;
