import Pill from "./Pill";
import { useInView } from "@/hooks/useInView";

import p1 from "@/assets/photos/foto023.jpg";
import p2 from "@/assets/photos/foto86.jpg";
import p3 from "@/assets/photos/foto0001.jpg";
import p4 from "@/assets/photos/foto058.jpg";
import p5 from "@/assets/photos/foto022.jpg";
import p6 from "@/assets/photos/foto0002.jpg";
import p7 from "@/assets/photos/foto003.jpg";
import p8 from "@/assets/photos/foto019.jpg";
import p9 from "@/assets/photos/foto072.jpg";
import p10 from "@/assets/photos/foto249.jpg";

const PHOTOS = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];

// Six shared rows keep every column aligned, including the two portrait photos.
const PLACEMENT = [
  "lg:col-start-1 lg:row-start-1 lg:row-span-4",
  "lg:col-start-1 lg:row-start-5 lg:row-span-2",
  "lg:col-start-2 lg:row-start-1 lg:row-span-4",
  "lg:col-start-2 lg:row-start-5 lg:row-span-2",
  "lg:col-start-3 lg:row-start-1 lg:row-span-2",
  "lg:col-start-3 lg:row-start-3 lg:row-span-2",
  "lg:col-start-3 lg:row-start-5 lg:row-span-2",
  "lg:col-start-4 lg:row-start-1 lg:row-span-2",
  "lg:col-start-4 lg:row-start-3 lg:row-span-2",
  "lg:col-start-4 lg:row-start-5 lg:row-span-2",
];

const GalleryTile = ({ photo, index }: { photo: string; index: number }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal-scale min-h-0 min-w-0 overflow-hidden rounded-xl bg-ink ring-1 ring-cream/10 ${PLACEMENT[index]} ${
        inView ? "is-visible" : ""
      }`}
      style={{ transitionDelay: inView ? `${(index % 4) * 90}ms` : "0ms" }}
    >
      <img
        src={photo}
        alt="Momento de evento produzido pela Trio Produtora"
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
};

const Galeria = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = (delay: number) => ({ transitionDelay: inView ? `${delay}ms` : "0ms" });

  return (
    <section className="bg-ink py-24 text-cream sm:py-32">
      <div ref={ref} className="container">
        <div className={`reveal ${inView ? "is-visible" : ""}`} style={v(0)}>
          <Pill tone="cream">Galeria</Pill>
        </div>
        <h2
          className={`reveal mt-6 max-w-xl text-display text-5xl leading-[1] text-trio-red sm:text-6xl sm:leading-[0.9] ${
            inView ? "is-visible" : ""
          }`}
          style={v(150)}
        >
          Momentos que a gente ajudou a criar
        </h2>
      </div>

      <div className="container mt-14">
        <div className="grid grid-cols-2 auto-rows-[180px] gap-4 sm:auto-rows-[260px] lg:aspect-[1.875] lg:grid-cols-4 lg:grid-rows-6 lg:auto-rows-auto">
        {PHOTOS.map((photo, index) => (
          <GalleryTile key={index} photo={photo} index={index} />
        ))}
        </div>
      </div>
    </section>
  );
};

export default Galeria;
