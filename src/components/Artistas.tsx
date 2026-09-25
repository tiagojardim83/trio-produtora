import { useEffect, useRef } from "react";
import Pill from "./Pill";
import { useInView } from "@/hooks/useInView";

const photos = Object.entries(
  import.meta.glob<string>("../assets/artistas/*.jpg", {
    eager: true,
    query: "?url",
    import: "default",
  }),
).sort(([a], [b]) => a.localeCompare(b)).map(([, src]) => src);

const Artistas = () => {
  const { ref, inView } = useInView<HTMLElement>();
  const visible = inView ? "is-visible" : "";
  const delay = (ms: number) => ({ transitionDelay: inView ? `${ms}ms` : "0ms" });
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = track.current;
    if (!element || !inView) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let pointer: number | null = null;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let position = element.scrollLeft;
    let focused = false;
    const shift = (distance: number) => {
      const card = element.firstElementChild as HTMLElement | null;
      if (!card) return;
      const loopWidth = photos.length * (card.offsetWidth + parseFloat(getComputedStyle(element).gap));
      if (!loopWidth) return;
      position = ((position + distance) % loopWidth + loopWidth) % loopWidth;
      element.scrollLeft = position;
    };
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      pointer = event.pointerId;
      lastX = event.clientX;
      lastTime = event.timeStamp;
      position = element.scrollLeft;
      velocity = 0;
      element.setPointerCapture(pointer);
      element.classList.add("is-dragging");
    };
    const move = (event: PointerEvent) => {
      if (event.pointerId !== pointer) return;
      const distance = (lastX - event.clientX) * 1.4;
      velocity = Math.max(-2, Math.min(2, distance / Math.max(8, event.timeStamp - lastTime)));
      shift(distance);
      lastX = event.clientX;
      lastTime = event.timeStamp;
    };
    const end = (event: PointerEvent) => {
      if (event.pointerId !== pointer) return;
      if (event.type === "pointercancel" || event.timeStamp - lastTime > 100) velocity = 0;
      pointer = null;
      element.classList.remove("is-dragging");
      if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
    };
    const focus = () => { focused = true; };
    const blur = () => { focused = false; position = element.scrollLeft; };
    const animate = (time: number) => {
      const delta = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      if (pointer === null && !(focused && element.matches(":focus-visible")) && !motion.matches) {
        // Negative scroll moves the photographs gently from left to right.
        shift(delta * (-0.025 + velocity));
        velocity *= Math.exp(-delta / 280);
      }
      frame = requestAnimationFrame(animate);
    };
    element.addEventListener("pointerdown", down);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerup", end);
    element.addEventListener("pointercancel", end);
    element.addEventListener("lostpointercapture", end);
    element.addEventListener("focusin", focus);
    element.addEventListener("focusout", blur);
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      element.classList.remove("is-dragging");
      element.removeEventListener("pointerdown", down);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerup", end);
      element.removeEventListener("pointercancel", end);
      element.removeEventListener("lostpointercapture", end);
      element.removeEventListener("focusin", focus);
      element.removeEventListener("focusout", blur);
    };
  }, [inView]);

  return (
    <section ref={ref} id="artistas" aria-labelledby="artistas-title" className="artists-section bg-ink text-cream">
      <div className="container artists-heading">
        <div className={`reveal ${visible}`} style={delay(0)}>
          <Pill tone="cream">Curadoria de Milhões</Pill>
        </div>
        <h2 id="artistas-title" className={`reveal mt-5 text-display leading-[0.95] text-trio-red ${visible}`} style={delay(180)}>
          Artistas que já<br />passaram pela Trio
        </h2>
      </div>
      <div ref={track} id="artists-track" className={`artists-track reveal-left ${visible}`} style={delay(380)} tabIndex={0} role="region" aria-label="Fotos dos artistas: deslize para explorar">
        {[...photos, ...photos].map((src, index) => (
          <figure key={`${src}-${index}`} className="artists-card" aria-hidden={index >= photos.length ? true : undefined}>
            <img draggable={false} src={src} style={index % photos.length === 0 ? { objectPosition: "88% 30%" } : undefined} alt={`Artista em apresentação no acervo da Trio — foto ${index + 1}`} loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Artistas;
