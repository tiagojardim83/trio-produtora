import Pill from "./Pill";
import { useInView } from "@/hooks/useInView";
import { WHATSAPP_URL } from "@/lib/contact";

const CONTACTS = [
  { label: "WhatsApp", href: WHATSAPP_URL },
  { label: "Instagram", href: "https://www.instagram.com/trioprodutora/" },
  { label: "E-mail", href: "#" },
];

const Footer = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = (delay: number) => ({ transitionDelay: inView ? `${delay}ms` : "0ms" });

  return (
    <footer id="contato" className="bg-ink pt-24 text-cream sm:pt-32">
      <div ref={ref} className="container">
        <div className={`reveal ${inView ? "is-visible" : ""}`} style={v(0)}>
          <Pill tone="cream">Contato</Pill>
        </div>

        <h2
          className={`reveal mt-8 text-display text-[15vw] leading-[0.95] text-trio-red sm:text-8xl sm:leading-[0.82] md:text-9xl ${
            inView ? "is-visible" : ""
          }`}
          style={v(150)}
        >
          Vamos criar
          <br />o próximo
          <br />
          grande evento
        </h2>
      </div>

      <div className="container mt-16 grid gap-10 border-t border-cream/10 pt-10 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-20">
        <p
          className={`reveal max-w-sm text-lg text-cream/60 ${inView ? "is-visible" : ""}`}
          style={v(320)}
        >
          Fale com a gente sobre parcerias, patrocínio ou produção de eventos em Minas Gerais.
        </p>

        <nav className={`reveal flex flex-col divide-y divide-cream/10 sm:w-80 ${inView ? "is-visible" : ""}`} style={v(420)}>
          {CONTACTS.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4 text-xl font-semibold uppercase tracking-wide text-cream transition-colors first:pt-0 hover:text-trio-red"
            >
              {contact.label}
              <span className="text-trio-red transition-transform group-hover:translate-x-1">→</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="container mt-20 flex flex-col items-start justify-between gap-6 border-t border-cream/10 py-8 sm:flex-row sm:items-center">
        <img src={`${import.meta.env.BASE_URL}logo-cream.svg`} alt="Trio Produtora" className="h-6 w-auto opacity-80" />
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <p className="text-xs uppercase tracking-wide text-cream/40">
            © {new Date().getFullYear()} Trio Produtora. Todos os direitos reservados.
          </p>
          <a
            href="https://tgarden.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wide text-cream/40 transition-colors hover:text-trio-red"
          >
            Webdesign: TGARDEN_STUDIO
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
