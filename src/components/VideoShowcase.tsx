import { useInView } from "@/hooks/useInView";

const VideoShowcase = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="bg-ink">
      <div
        ref={ref}
        className={`reveal-scale relative aspect-[9/16] w-full overflow-hidden rounded-xl sm:aspect-video ${inView ? "is-visible" : ""}`}
      >
        <video
          className="h-full w-full object-cover"
          src={`${import.meta.env.BASE_URL}trio-reel.mp4`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
};

export default VideoShowcase;
