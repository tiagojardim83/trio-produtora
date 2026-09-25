import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Pill from "@/components/Pill";

const FRENTES = ["Rodeio", "Shows nacionais", "Leilões", "Gastronomia"];

const ExpoAgro = () => {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[80vh] flex-col justify-end overflow-hidden rounded-b-[2rem] bg-trio-purple pb-20 pt-40 sm:rounded-b-[3rem]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          <div className="container relative z-10">
            <Pill tone="cream">55ª edição · 03–12 jul 2026</Pill>
            <h1 className="mt-6 text-display text-6xl leading-[0.95] text-cream sm:text-7xl sm:leading-[0.85] md:text-8xl">
              ExpoAgro
              <br />
              GV 2026
            </h1>
            <p className="mt-6 max-w-lg text-lg text-cream/80">
              A festa mais esperada de Governador Valadares. Rodeio, shows nacionais, leilões e
              gastronomia em um só lugar.
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-cream/60">
              Parque de Exposições · Governador Valadares, MG
            </p>
          </div>
        </section>

        <section className="bg-ink py-24 sm:py-32">
          <div className="container">
            <Pill tone="cream">O que rola na festa</Pill>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {FRENTES.map((frente) => (
                <div key={frente} className="rounded-xl border border-cream/10 p-6">
                  <p className="text-display text-2xl leading-none text-trio-gold sm:text-3xl">
                    {frente}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/#eventos"
              className="mt-14 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-cream/70 transition-colors hover:text-trio-red"
            >
              ← Voltar para a agenda da Trio
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ExpoAgro;
