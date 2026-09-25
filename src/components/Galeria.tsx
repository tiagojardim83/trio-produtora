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

const GalleryTile = ({ photo, index }: { photo: string; index: number }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal-scale mb-4 break-inside-avoid overflow-hidden rounded-xl bg-ink ring-1 ring-cream/10 ${
        inView ? "is-visible" : ""
      }`}
      style={{ transitionDelay: inView ? `${(index % 4) * 90}ms` : "0ms" }}
    >
      <img
        src={photo}
        alt="Momento de evento produzido pela Trio Produtora"
        className="w-full object-cover transition-transform duration-500 hover:scale-105"
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

      <div className="container mt-14 columns-2 gap-4 sm:columns-3 lg:columns-4">
        {PHOTOS.map((photo, index) => (
          <GalleryTile key={index} photo={photo} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Galeria;
