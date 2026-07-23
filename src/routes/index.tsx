import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroBottle from "@/assets/hero-bottle.jpg";
import skinGlow from "@/assets/skin-glow.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const products = [
  { name: "Glow Rice Ferment Essence", size: "150ml", price: "€72", image: product1 },
  { name: "Yeon-hwa Petal Cream", size: "50ml", price: "€88", image: product2 },
  { name: "Mountain Dew Mist", size: "100ml", price: "€54", image: product3 },
  { name: "Gyeol-go Sleeping Mask", size: "75ml", price: "€65", image: product4 },
];

const ingredients = ["Rice Ferment", "Ginseng Root", "Camellia Seed", "Bamboo Sap", "Mugwort", "Propolis"];

const steps = [
  { n: "01", title: "Deep Cleansing", body: "Dissolve impurities with fermented camellia oil, preserving the skin's moisture barrier." },
  { n: "02", title: "Hydration Priming", body: "Open the moisture channels using micro-filtered rice water essence." },
  { n: "03", title: "Active Infusion", body: "Deeply repair with high-potency ginseng saponins for cellular vitality." },
  { n: "04", title: "Silk Sealing", body: "Lock in nourishment with a weightless ceramide layer for a porcelain finish." },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-ink/5 bg-cream/80 px-6 backdrop-blur-md lg:px-12">
        <div className="text-sm font-medium uppercase tracking-[0.28em]">Chae-un</div>
        <div className="hidden gap-10 text-xs uppercase tracking-[0.22em] md:flex">
          <a href="#collections" className="transition-colors hover:text-taupe">Collections</a>
          <a href="#ritual" className="transition-colors hover:text-taupe">The Ritual</a>
          <a href="#about" className="transition-colors hover:text-taupe">About</a>
        </div>
        <button className="text-xs uppercase tracking-[0.22em] transition-colors hover:text-taupe">
          Cart (0)
        </button>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="mx-auto flex max-w-7xl flex-col px-6 lg:px-12">
          <div className="mb-14 max-w-[22ch] animate-fade-in-up">
            <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe">
              Seoul — Paris · Est. 2024
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] font-medium text-balance italic lg:text-8xl">
              The Luminous Breath of Morning Dew
            </h1>
          </div>

          <div className="grid grid-cols-12 items-end gap-6">
            <Reveal delay={100}>
              <div className="col-span-12 lg:col-span-12">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-sand outline outline-1 -outline-offset-1 outline-black/5">
                  <img
                    src={heroBottle}
                    alt="Chae-un frosted glass essence bottle resting on a limestone plinth in soft morning light"
                    width={1200}
                    height={1500}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <div className="col-span-12 flex flex-col gap-8 lg:col-span-5">
              <Reveal delay={250}>
                <div className="relative aspect-video overflow-hidden rounded-lg bg-champagne outline outline-1 -outline-offset-1 outline-black/5">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={skinGlow}
                    className="h-full w-full object-cover"
                  >
                    <source
                      src="https://cdn.coverr.co/videos/coverr-a-woman-applying-cream-to-her-face-9271/1080p.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-[10px] font-medium uppercase tracking-[0.25em] text-cream">
                    The Ritual · in motion
                  </span>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <p className="max-w-[48ch] text-pretty leading-relaxed text-taupe">
                  Rooted in ancestral fermentation techniques, our formulations honor the slow transition
                  of seasons. Experience a finish as delicate as warm porcelain.
                </p>
                <div className="mt-6 flex gap-4">
                  <a
                    href="#collections"
                    className="rounded-full bg-ink px-8 py-3 text-sm font-medium text-cream ring-1 ring-ink transition-all hover:bg-taupe hover:ring-taupe"
                  >
                    Begin the Ritual
                  </a>
                  <a
                    href="#ritual"
                    className="rounded-full border border-ink/20 px-8 py-3 text-sm font-medium text-ink transition-colors hover:bg-sand"
                  >
                    Discover
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Marquee */}
      <div className="overflow-hidden border-y border-ink/5 bg-sand/50 py-12">
        <div className="animate-marquee items-center gap-12">
          {[...ingredients, ...ingredients, ...ingredients].map((ing, i) => (
            <div key={i} className="flex shrink-0 items-center gap-12 px-6">
              <span className="font-serif text-3xl italic text-ink whitespace-nowrap">{ing}</span>
              <span className="size-1.5 shrink-0 rounded-full bg-taupe/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <section id="collections" className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <Reveal>
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe">
                Selected Rituals
              </p>
              <h2 className="font-serif text-4xl font-medium lg:text-5xl">Curated Formulations</h2>
            </div>
            <a href="#" className="border-b border-ink/20 pb-1 text-xs uppercase tracking-[0.22em] hover:border-ink">
              View All
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div className="group cursor-pointer">
                <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-lg bg-sand outline outline-1 -outline-offset-1 outline-black/5">
                  <img
                    src={p.image}
                    alt={p.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-cream/0 transition-colors duration-700 group-hover:bg-cream/10" />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-sm font-medium">{p.name}</h3>
                    <p className="text-xs uppercase tracking-widest text-taupe">{p.size}</p>
                  </div>
                  <span className="text-sm">{p.price}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy split */}
      <section id="about" className="bg-sand/40 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 lg:px-12">
          <Reveal>
            <div className="relative">
              <img
                src={skinGlow}
                alt="Close-up of dewy porcelain skin in warm morning light"
                width={1200}
                height={800}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/5"
              />
              <div className="absolute -right-4 -bottom-8 hidden w-52 bg-cream p-6 shadow-xl md:block">
                <p className="text-xs italic leading-relaxed text-ink/70">
                  "Inspired by the ancient porcelain rituals of the Joseon dynasty, quietly modernized."
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe">
              The Philosophy
            </p>
            <h2 className="mb-8 font-serif text-4xl leading-[1.05] font-medium lg:text-5xl">
              Advanced science, <span className="italic">ancestral wisdom.</span>
            </h2>
            <p className="mb-10 max-w-md leading-relaxed text-taupe">
              We believe in the power of patience. Every formulation undergoes a 72-hour cold-fermentation
              process — ensuring active ingredients remain potent yet perfectly biocompatible with the
              skin's natural barrier.
            </p>
            <a href="#ritual" className="group inline-flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.3em]">
              Learn our process
              <span className="block h-[1px] w-10 bg-ink transition-all duration-500 group-hover:w-20" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Ritual steps */}
      <section id="ritual" className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <Reveal>
          <div className="mb-20 text-center">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe">
              The Sequence
            </p>
            <h2 className="mx-auto max-w-[20ch] font-serif text-4xl font-medium text-balance lg:text-5xl">
              A Four-Step Journey to Luminous Clarity
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="flex flex-col gap-5 border-t border-ink/10 pt-8">
                <span className="font-serif text-5xl italic text-ink/25">{s.n}</span>
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em]">{s.title}</h4>
                <p className="text-pretty text-sm leading-relaxed text-taupe">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="flex flex-col items-center px-6 py-28 text-center lg:py-40">
        <Reveal>
          <div className="max-w-[40ch]">
            <p className="mb-8 font-serif text-3xl leading-tight italic text-balance lg:text-4xl">
              "It feels like the softest silk unfolding on my skin. The glow isn't just on the surface —
              it feels like it radiates from within."
            </p>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-taupe">
              Ji-won Park · Creative Director, Seoul
            </span>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-ink py-24 text-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-12">
          <div className="flex flex-col gap-8">
            <div className="text-2xl font-medium uppercase tracking-[0.28em]">Chae-un</div>
            <p className="max-w-[35ch] text-pretty text-sm leading-relaxed text-cream/60">
              A bridge between traditional Korean apothecary and modern dermatological art. Crafted in
              small batches for those who seek the luminous.
            </p>
            <div className="flex gap-6 text-xs uppercase tracking-[0.22em] text-cream/50">
              <a href="#" className="transition-colors hover:text-cream">Instagram</a>
              <a href="#" className="transition-colors hover:text-cream">Journal</a>
              <a href="#" className="transition-colors hover:text-cream">Stockists</a>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="text-xs font-medium uppercase tracking-[0.28em]">The Morning Letter</h4>
            <form className="flex gap-4 border-b border-cream/20 pb-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-transparent py-2 text-sm placeholder:text-cream/40 focus:outline-none"
              />
              <button type="submit" className="group flex items-center gap-2 py-2 text-xs uppercase tracking-[0.22em]">
                Join
                <span className="size-1 rounded-full bg-cream transition-transform group-hover:scale-[2.5]" />
              </button>
            </form>
            <p className="text-[10px] uppercase tracking-[0.22em] text-cream/40">
              © 2024 Chae-un Beauty. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
