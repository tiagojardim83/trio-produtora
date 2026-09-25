import { useEffect, useRef, useState } from "react";
import heroPhoto from "@/assets/photos/foto407.jpg";
import heroPhoto2 from "@/assets/photos/foto0002.jpg";
import heroPhoto3 from "@/assets/photos/foto065.jpg";
import heroPhoto4 from "@/assets/photos/foto231.jpg";
import heroPhoto5 from "@/assets/photos/foto1097.jpg";

const HERO_PHOTOS = [heroPhoto, heroPhoto2, heroPhoto3, heroPhoto4, heroPhoto5];

// Path data lifted directly from the Trio brand mark (public/logo-red.svg),
// viewBox 0 0 291.2 65.17 — reused here as an SVG mask so scroll can scale
// the letterforms up until the photo behind them takes over the screen.
const LOGO_W = 291.2;
const LOGO_H = 65.17;

const LOGO_SHAPES: Array<
  | { type: "polygon"; points: string }
  | { type: "rect"; x: number; y: number; width: number; height: number }
  | { type: "path"; d: string }
> = [
  {
    type: "polygon",
    points: "113.06 63.33 82.48 63.33 82.48 32.76 69.81 32.76 69.81 2.1 124.94 2.1 124.94 32.76 113.06 32.76 113.06 63.33",
  },
  {
    type: "path",
    d: "M184.59,26.99c0,7.95-3.67,14.94-9.52,19.48l9,16.86h-53.73V2.1h29.35c13.71,0,24.9,11.09,24.9,24.9",
  },
  { type: "rect", x: 190.15, y: 2.1, width: 31.8, height: 61.15 },
  {
    type: "path",
    d: "M291.2,32.58c0,18-14.59,32.59-32.59,32.59s-32.58-14.59-32.58-32.59S240.61,0,258.61,0s32.59,14.59,32.59,32.58",
  },
  {
    type: "path",
    d: "M52.44,1.68H9.06C4.06,1.68,0,5.73,0,10.74v43.38c0,5.01,4.06,9.07,9.06,9.07h43.38c5.01,0,9.06-4.06,9.06-9.07V10.74c0-5.01-4.06-9.06-9.06-9.06ZM47.72,42.2c0,9.16-7.35,15.03-17.41,15.03-8.71,0-14.83-3.16-19.22-8l7.87-7.87c3.22,3.29,6.64,5.16,10.77,5.16,3.55,0,5.81-1.8,5.81-4.58v-.13c0-2.9-2.65-4.64-7.35-4.64h-5.29l-1.8-6.51,10.38-9.35H14.18v-10.13h32.64v8.97l-10.77,9.22c6.45,1.42,11.67,5.03,11.67,12.7v.13Z",
  },
];

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

const Hero = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);
  const revealImgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_PHOTOS.length);
    }, 1000);
    return () => clearInterval(id);
  }, [reducedMotion]);

  useEffect(() => {
    const applyProgress = (progress: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const startScale = (width * 0.6) / LOGO_W;
      const endScale = startScale * 9;
      const maskEase = smoothstep(0, 0.65, progress);
      const scale = startScale + (endScale - startScale) * maskEase;
      const tx = width / 2 - (LOGO_W / 2) * scale;
      const ty = height / 2 - (LOGO_H / 2) * scale;
      maskGroupRef.current?.setAttribute("transform", `translate(${tx} ${ty}) scale(${scale})`);

      const revealOpacity = smoothstep(0.5, 0.82, progress);
      if (revealImgRef.current) revealImgRef.current.style.opacity = String(revealOpacity);

      const contentP = smoothstep(0.74, 1, progress);
      if (contentRef.current) {
        contentRef.current.style.opacity = String(contentP);
        contentRef.current.style.transform = `translateY(${(1 - contentP) * 20}px)`;
      }

      const hintOpacity = 1 - smoothstep(0, 0.06, progress);
      if (hintRef.current) hintRef.current.style.opacity = String(hintOpacity);
    };

    if (reducedMotion) {
      applyProgress(1);
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, scrolled / scrollable)) : 1;
      applyProgress(progress);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={wrapperRef}
      className={`relative bg-ink ${reducedMotion ? "" : "h-[260vh]"}`}
    >
      <div className="sticky top-0 h-[calc(100svh-2rem)] min-h-[608px] w-full overflow-hidden rounded-b-[2rem] sm:h-[calc(100svh-3rem)] sm:min-h-[592px] sm:rounded-b-[3rem]">
        <div className="absolute inset-0 bg-ink" />

        {/* Photo revealed through the brand mark; the mask scales up on scroll. */}
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <mask id="trio-logo-mask">
              <g ref={maskGroupRef}>
                {LOGO_SHAPES.map((shape, i) => {
                  if (shape.type === "polygon") return <polygon key={i} points={shape.points} fill="#fff" />;
                  if (shape.type === "rect")
                    return <rect key={i} x={shape.x} y={shape.y} width={shape.width} height={shape.height} fill="#fff" />;
                  return <path key={i} d={shape.d} fill="#fff" />;
                })}
              </g>
            </mask>
          </defs>
          <image
            href={HERO_PHOTOS[slideIndex]}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#trio-logo-mask)"
          />
        </svg>

        {/* Same photo set, full-bleed — crossfades in once the mask has opened up,
            and cycles through HERO_PHOTOS every second once revealed. */}
        <img
          ref={revealImgRef}
          src={HERO_PHOTOS[slideIndex]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-0"
        />

        <div ref={hintRef} className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3">
          <svg
            className="animate-bounce-slow h-8 w-8 text-cream/60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden="true"
          >
            <path d="M12 3v18m-6-6 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div ref={contentRef} className="absolute inset-0 opacity-0">
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-transparent" />

          <div className="container relative z-10 flex h-full flex-col justify-end pb-16 pt-32 sm:pb-20">
            <p className="text-sm font-semibold tracking-[0.3em] text-trio-red">2026 / 2027</p>

            <h1 className="mt-4 max-w-3xl text-display text-[15vw] leading-[0.95] text-trio-red sm:text-7xl sm:leading-[0.85] md:text-8xl">
              Trio
              <br />
              Produtora
            </h1>

            <p className="mt-6 max-w-xl text-display text-2xl leading-tight text-cream sm:text-3xl md:text-4xl">
              Eventos que movimentam pessoas, marcas e negócios.
            </p>
          </div>

          <a
            href="#sobre"
            aria-label="Rolar para conhecer a Trio"
            className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center justify-center rounded-xl border border-trio-red p-3 text-trio-red transition-colors hover:bg-trio-red hover:text-ink sm:flex"
          >
            <span className="animate-bounce-slow block">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
