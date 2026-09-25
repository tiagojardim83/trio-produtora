const PHRASE = "Eventos que movimentam pessoas, marcas e negócios.";
const REPEATS = Array.from({ length: 5 });

const ImpactMarquee = () => {
  return (
    <section className="overflow-hidden border-y border-cream/10 bg-ink py-10 sm:py-14">
      <div className="marquee-track-slow flex w-max items-center gap-16 whitespace-nowrap">
        {[...REPEATS, ...REPEATS].map((_, i) => (
          <span
            key={i}
            className="text-display text-8xl leading-none text-trio-red sm:text-[9rem] md:text-[11rem]"
          >
            {PHRASE}
          </span>
        ))}
      </div>
    </section>
  );
};

export default ImpactMarquee;
