import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "O que fazemos", href: "#o-que-fazemos" },
  { label: "Eventos", href: "#eventos" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative z-50 w-full transition-colors duration-300 ${
          scrolled || open ? "bg-ink/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(237,234,201,0.08)]" : "bg-transparent"
        }`}
      >
        <div className="container relative z-50 flex h-20 items-center justify-between">
          <Link
            to="/"
            aria-label="Trio Produtora — início"
            className="shrink-0"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src={`${import.meta.env.BASE_URL}logo-red.svg`} alt="Trio Produtora" className="h-7 w-auto" />
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/80 transition-colors hover:text-trio-red"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#eventos"
            className="hidden rounded-full border border-trio-red px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-trio-red transition-colors hover:bg-trio-red hover:text-cream md:inline-block"
          >
            Ver agenda
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`block h-0.5 w-6 bg-cream transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`block h-0.5 w-6 bg-cream transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-6 bg-cream transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col bg-ink transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="container flex flex-1 flex-col justify-center">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-t border-cream/10 py-5 last:border-b"
            >
              <span className="text-sm font-bold text-trio-red">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-display text-4xl leading-none text-cream transition-colors group-hover:text-trio-red">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="container pb-12">
          <a
            href="#eventos"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center rounded-full bg-trio-red px-6 py-4 text-sm font-bold uppercase tracking-wide text-cream"
          >
            Ver agenda
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
