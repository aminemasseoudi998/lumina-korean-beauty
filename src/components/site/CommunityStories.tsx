import { useEffect, useRef, useState } from "react";
import { Heart, Pause, Play } from "lucide-react";
import v1 from "@/assets/1.mp4";
import v2 from "@/assets/2.mp4";
import v3 from "@/assets/3.mp4";
import v4 from "@/assets/4.mp4";
import v5 from "@/assets/5.mp4";

type Story = {
  src: string;
  name: string;
  handle: string;
  caption: string;
  likes: string;
};

const stories: Story[] = [
  { src: v1, name: "Ines", handle: "@ines.skincare", caption: "Ma routine essence + sérum", likes: "1,2k" },
  { src: v2, name: "Rania", handle: "@rania.glow", caption: "Résultat après 4 semaines", likes: "980" },
  { src: v3, name: "Yasmine", handle: "@yasmine.beauty", caption: "Le masque de nuit, mon coup de cœur", likes: "2,1k" },
  { src: v4, name: "Sarra", handle: "@sarra.rituel", caption: "Unboxing Wglow", likes: "760" },
  { src: v5, name: "Emna", handle: "@emna.k", caption: "Ma peau n'a jamais été aussi douce", likes: "1,5k" },
];

function StoryCard({ story, index }: { story: Story; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Entrance reveal (once).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto play/pause based on visibility, unless the user paused or prefers reduced motion.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userPaused && !reduced) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [userPaused]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setUserPaused(false);
    } else {
      el.pause();
      setUserPaused(true);
    }
  };

  return (
    <div
      ref={wrapRef}
      className="w-[74vw] shrink-0 snap-center sm:w-auto"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.94)",
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
      }}
    >
      {/* Gradient frame */}
      <div className="group rounded-[1.7rem] bg-gradient-to-b from-camel/30 via-ink/5 to-transparent p-px transition-all duration-500 hover:from-camel/70 hover:shadow-[0_28px_60px_-20px_rgba(120,102,70,0.5)]">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.65rem] bg-sand transition-transform duration-500 group-hover:-translate-y-1.5">
          <video
            ref={videoRef}
            src={story.src}
            muted
            loop
            playsInline
            preload="metadata"
            onTimeUpdate={(e) => {
              const el = e.currentTarget;
              if (el.duration) setProgress((el.currentTime / el.duration) * 100);
            }}
            onClick={togglePlay}
            className="h-full w-full cursor-pointer object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
          />

          {/* Cinematic overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-ink/20" />
          <div className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset ring-cream/20 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Editorial index */}
          <span className="absolute left-4 top-3 font-serif text-lg italic text-cream/70">
            0{index + 1}
          </span>

          {/* Center play / pause */}
          <button
            onClick={togglePlay}
            aria-label={userPaused ? "Lire la vidéo" : "Mettre en pause"}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              userPaused ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-cream/90 text-ink shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110">
              {userPaused ? (
                <Play className="size-6 translate-x-0.5 fill-current" strokeWidth={0} />
              ) : (
                <Pause className="size-6 fill-current" strokeWidth={0} />
              )}
            </span>
          </button>

          {/* Caption */}
          <div className="absolute inset-x-0 bottom-0 p-4 pt-10">
            <p className="translate-y-1 font-serif text-base italic leading-snug text-cream opacity-95 transition-transform duration-500 group-hover:translate-y-0 sm:text-lg">
              {story.caption}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-camel to-camel-deep text-[11px] font-medium text-cream ring-1 ring-cream/40">
                  {story.name.charAt(0)}
                </span>
                <span className="text-[11px] tracking-wide text-cream/90">{story.handle}</span>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-cream/15 px-2.5 py-1 text-[11px] text-cream backdrop-blur-md">
                <Heart className="size-3.5 fill-cream" strokeWidth={0} />
                {story.likes}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-cream/20">
            <div
              className="h-full bg-gradient-to-r from-camel to-camel-deep transition-[width] duration-200 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommunityStories() {
  const headRef = useRef<HTMLDivElement>(null);
  const [headVisible, setHeadVisible] = useState(false);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setHeadVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-tint-deep/50 py-16 sm:py-24 lg:py-28">
      {/* Soft ambient depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-camel/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-champagne/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-12">
        <div
          ref={headRef}
          className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-14 md:flex-row md:items-end"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-camel-deep sm:tracking-[0.4em]">
              <span className="h-px w-8 bg-camel" />
              Histoires de la communauté
            </p>
            <h2 className="font-serif text-4xl font-medium leading-[0.95] sm:text-5xl lg:text-6xl">
              Elles rayonnent <span className="italic">avec Wglow.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-taupe">
            Rituels, résultats et coups de cœur partagés par notre communauté en Tunisie.
            Taguez <span className="font-medium text-ink">#Wglow</span> pour apparaître ici.
          </p>
        </div>

        {/* Reel — scroll-snap on mobile with edge fades, 5-up grid on desktop */}
        <div className="relative">
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {stories.map((s, i) => (
              <StoryCard key={s.handle} story={s} index={i} />
            ))}
          </div>
          {/* Mobile edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-tint-deep to-transparent sm:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-tint-deep to-transparent sm:hidden" />
        </div>

        {/* Mobile swipe hint */}
        <p className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.24em] text-taupe sm:hidden">
          <span className="h-px w-5 bg-camel" /> Glissez pour découvrir
        </p>
      </div>
    </section>
  );
}
