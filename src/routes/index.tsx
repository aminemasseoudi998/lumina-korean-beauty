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
  { name: "Essence Ferment de Riz", size: "150ml", price: "72 €", image: product1, tag: "Best-seller" },
  { name: "Crème Pétale Yeon-hwa", size: "50ml", price: "88 €", image: product2, tag: "Nouveau" },
  { name: "Brume Rosée de Montagne", size: "100ml", price: "54 €", image: product3, tag: null },
  { name: "Masque de Nuit Gyeol-go", size: "75ml", price: "65 €", image: product4, tag: "Édition Limitée" },
];

const ingredients = [
  "Ferment de Riz",
  "Racine de Ginseng",
  "Graine de Camélia",
  "Sève de Bambou",
  "Armoise Coréenne",
  "Propolis Dorée",
];

const steps = [
  { n: "01", title: "Purification", body: "Dissoudre les impuretés à l'huile de camélia fermentée, en préservant la barrière hydrolipidique." },
  { n: "02", title: "Hydratation", body: "Ouvrir les canaux de moisture grâce à l'essence d'eau de riz micro-filtrée." },
  { n: "03", title: "Infusion Active", body: "Réparer en profondeur avec les saponines de ginseng de haute intensité." },
  { n: "04", title: "Sceau de Soie", body: "Sceller la nourriture d'un voile de céramides pour un fini porcelaine." },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
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
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function SplitHeading({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const { ref, visible } = useReveal<HTMLHeadingElement>();
  const words = text.split(" ");
  return (
    <h1 ref={ref} className={className} style={{ perspective: "1000px" }}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] mr-[0.22em] align-bottom">
          <span
            className="inline-block"
            style={{
              transform: visible ? "translateY(0) rotateX(0)" : "translateY(110%) rotateX(-40deg)",
              opacity: visible ? 1 : 0,
              transition: `transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay + i * 90}ms, opacity 1s ease ${delay + i * 90}ms`,
              transformOrigin: "50% 100%",
            }}
          >
            {w}
          </span>
        </span>
      ))}
    </h1>
  );
}

function useParallax(strength = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - window.innerHeight / 2;
          setOffset(-center * strength);
        }
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);
  return { ref, offset };
}

function ParallaxImage({
  src,
  alt,
  className = "",
  strength = 0.08,
  width,
  height,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  width: number;
  height: number;
  eager?: boolean;
}) {
  const { ref, offset } = useParallax(strength);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        className="h-[115%] w-full object-cover"
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: "transform",
        }}
      />
    </div>
  );
}

function Index() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const on = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink selection:bg-ink selection:text-cream">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 80% 10%, rgba(232,226,217,0.9), transparent 60%), radial-gradient(50% 40% at 10% 90%, rgba(245,241,234,0.9), transparent 60%)",
        }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-ink/5 bg-cream/70 px-6 backdrop-blur-xl lg:px-12">
        <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em]">
          <span className="size-1.5 rounded-full bg-ink" />
          Chae-un
        </div>
        <div className="hidden gap-10 text-xs uppercase tracking-[0.24em] md:flex">
          <a href="#collections" className="relative transition-colors hover:text-taupe">Collections</a>
          <a href="#ritual" className="relative transition-colors hover:text-taupe">Le Rituel</a>
          <a href="#about" className="relative transition-colors hover:text-taupe">Maison</a>
          <a href="#journal" className="relative transition-colors hover:text-taupe">Journal</a>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-xs uppercase tracking-[0.24em] transition-colors hover:text-taupe">FR / KR</button>
          <button className="text-xs uppercase tracking-[0.24em] transition-colors hover:text-taupe">
            Panier <span className="text-taupe">(0)</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div className="max-w-[24ch]">
              <Reveal>
                <p className="mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-taupe">
                  <span className="h-px w-8 bg-taupe" />
                  Séoul — Paris · Depuis 2024
                </p>
              </Reveal>
              <SplitHeading
                text="Le Souffle Lumineux de la Rosée"
                className="font-serif text-[13vw] leading-[0.92] font-medium italic text-balance lg:text-[7.5rem]"
              />
            </div>
            <Reveal delay={800} className="hidden max-w-[26ch] pb-4 lg:block">
              <p className="text-sm leading-relaxed text-taupe">
                Une maison de soins coréens née de la lente fermentation des saisons et de la
                précision moléculaire contemporaine.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-12 items-end gap-6">
            <Reveal delay={200} className="col-span-12 lg:col-span-7">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-sand outline outline-1 -outline-offset-1 outline-black/5">
                <img
                  src={heroBottle}
                  alt="Flacon d'essence Chae-un sur un socle de calcaire, lumière du matin"
                  width={1200}
                  height={1500}
                  className="h-full w-full object-cover"
                  style={{
                    transform: `translate3d(0, ${scrollY * 0.08}px, 0) scale(${1 + scrollY * 0.00015})`,
                    willChange: "transform",
                  }}
                />
                <div className="absolute top-6 left-6 flex items-center gap-3 rounded-full bg-cream/80 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.28em] backdrop-blur-md">
                  <span className="size-1.5 animate-pulse rounded-full bg-taupe" />
                  Nouveau · Ferment Doré
                </div>
                <div className="absolute right-6 bottom-6 max-w-[18ch] text-right font-serif text-sm italic text-cream mix-blend-difference">
                  N°01 — L'Éveil
                </div>
              </div>
            </Reveal>

            <div className="col-span-12 flex flex-col gap-6 lg:col-span-5">
              <Reveal delay={350}>
                <div className="relative aspect-video overflow-hidden rounded-md bg-champagne outline outline-1 -outline-offset-1 outline-black/5">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={skinGlow}
                    className="h-full w-full object-cover"
                  >
                    <source
                      src="https://cdn.pixabay.com/video/2023/07/26/173049-849610807_large.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
                  <div className="absolute right-4 bottom-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-cream">
                    <span className="size-1.5 rounded-full bg-cream" />
                    En mouvement
                  </div>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <div className="grid grid-cols-3 gap-4 border-t border-ink/10 pt-6">
                  <div>
                    <p className="font-serif text-3xl italic">72h</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-taupe">Fermentation Froide</p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl italic">98%</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-taupe">Naturel</p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl italic">14</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-taupe">Actifs Brevetés</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={650}>
                <div className="mt-2 flex flex-wrap gap-3">
                  <a
                    href="#collections"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-8 py-3 text-sm font-medium text-cream ring-1 ring-ink"
                  >
                    <span className="relative z-10">Commencer le Rituel</span>
                    <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                    <span className="absolute inset-0 -translate-x-full bg-taupe transition-transform duration-500 group-hover:translate-x-0" />
                  </a>
                  <a
                    href="#ritual"
                    className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-8 py-3 text-sm font-medium text-ink transition-colors hover:bg-sand"
                  >
                    Découvrir la maison
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="relative overflow-hidden border-y border-ink/5 bg-sand/60 py-10">
        <div className="animate-marquee items-center">
          {[...ingredients, ...ingredients, ...ingredients].map((ing, i) => (
            <div key={i} className="flex shrink-0 items-center gap-10 px-6">
              <span className="font-serif text-4xl italic text-ink whitespace-nowrap">{ing}</span>
              <span className="text-taupe/50">✦</span>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-sand/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-sand/60 to-transparent" />
      </div>

      {/* Product Grid */}
      <section id="collections" className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12 lg:py-40">
        <Reveal>
          <div className="mb-20 flex items-end justify-between gap-8">
            <div>
              <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-taupe">
                <span className="h-px w-8 bg-taupe" />
                Rituels Sélectionnés
              </p>
              <h2 className="font-serif text-5xl font-medium leading-[0.95] lg:text-7xl">
                Formulations <span className="italic">rares.</span>
              </h2>
            </div>
            <a href="#" className="hidden items-center gap-3 border-b border-ink/20 pb-1 text-xs uppercase tracking-[0.24em] transition-colors hover:border-ink md:inline-flex">
              Voir toute la collection <span>→</span>
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 140}>
              <div className={`group cursor-pointer ${i % 2 === 1 ? "lg:translate-y-16" : ""}`}>
                <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-md bg-sand outline outline-1 -outline-offset-1 outline-black/5">
                  <img
                    src={p.image}
                    alt={p.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {p.tag && (
                    <span className="absolute top-4 left-4 rounded-full bg-cream/80 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.22em] backdrop-blur-md">
                      {p.tag}
                    </span>
                  )}
                  <span className="absolute right-4 bottom-4 inline-flex translate-y-3 items-center gap-2 rounded-full bg-cream px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Ajouter <span>+</span>
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-taupe">N°0{i + 1} · {p.size}</p>
                    <h3 className="mt-1 font-serif text-xl">{p.name}</h3>
                  </div>
                  <span className="font-serif text-lg italic">{p.price}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section id="about" className="relative overflow-hidden bg-sand/50 py-28 lg:py-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-champagne opacity-60 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12 lg:px-12">
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <ParallaxImage
                src={skinGlow}
                alt="Peau porcelaine illuminée par la lumière dorée du matin"
                width={1200}
                height={800}
                className="aspect-[4/5] w-full rounded-md outline outline-1 -outline-offset-1 outline-black/5"
                strength={0.06}
              />
              <div className="absolute -right-4 -bottom-10 hidden w-60 rounded-md bg-cream p-6 shadow-2xl md:block">
                <p className="text-xs italic leading-relaxed text-ink/70">
                  « Inspirée des rituels de porcelaine de la dynastie Joseon, discrètement modernisée. »
                </p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-taupe">— Studio de Séoul</p>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:pl-8">
            <Reveal delay={100}>
              <p className="mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-taupe">
                <span className="h-px w-8 bg-taupe" />
                La Philosophie
              </p>
            </Reveal>
            <Reveal delay={200}>
              <h2 className="mb-10 font-serif text-5xl font-medium leading-[1.02] lg:text-7xl">
                Science avancée, <br />
                <span className="italic text-taupe">sagesse ancestrale.</span>
              </h2>
            </Reveal>
            <Reveal delay={350}>
              <p className="mb-10 max-w-md leading-relaxed text-taupe">
                Nous croyons au pouvoir de la patience. Chaque formulation traverse une fermentation à froid
                de 72 heures — garantissant des actifs puissants et parfaitement biocompatibles avec la
                barrière naturelle de la peau.
              </p>
            </Reveal>
            <Reveal delay={500}>
              <div className="grid max-w-md grid-cols-2 gap-8 border-t border-ink/10 pt-8">
                <div>
                  <p className="font-serif text-4xl italic">01.</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-taupe">Ferments vivants</p>
                  <p className="mt-2 text-sm text-ink/70">Cultivés en petits lots dans nos ateliers de Séoul.</p>
                </div>
                <div>
                  <p className="font-serif text-4xl italic">02.</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-taupe">Sans compromis</p>
                  <p className="mt-2 text-sm text-ink/70">Cruelty-free, vegan, éco-conçu de bout en bout.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ritual steps */}
      <section id="ritual" className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12 lg:py-40">
        <Reveal>
          <div className="mb-24 grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-taupe">
                <span className="h-px w-8 bg-taupe" />
                La Séquence
              </p>
              <h2 className="font-serif text-5xl font-medium leading-[0.95] lg:text-7xl">
                Un rituel <span className="italic">en quatre gestes.</span>
              </h2>
            </div>
            <p className="max-w-md text-taupe lg:justify-self-end">
              Une chorégraphie lente inspirée de la cérémonie du thé coréenne — chaque geste prépare le
              suivant, chaque texture révèle la prochaine.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 140}>
              <div className="group relative flex flex-col gap-5 border-t border-ink/15 pt-8 transition-colors hover:border-ink">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-6xl italic text-ink/20 transition-colors group-hover:text-taupe">
                    {s.n}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-taupe">Étape</span>
                </div>
                <h4 className="font-serif text-2xl">{s.title}</h4>
                <p className="text-pretty text-sm leading-relaxed text-taupe">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative overflow-hidden bg-ink py-32 text-cream lg:py-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(50% 40% at 50% 50%, rgba(232,226,217,0.35), transparent 70%)",
          }}
        />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <Reveal>
            <p className="mb-10 flex items-center justify-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-cream/60">
              <span className="h-px w-8 bg-cream/40" />
              Témoignage
              <span className="h-px w-8 bg-cream/40" />
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="font-serif text-3xl leading-[1.15] italic text-balance lg:text-5xl">
              « Une soie tiède qui se déploie sur la peau. La lumière ne reste pas en surface —
              elle semble irradier de l'intérieur. »
            </p>
          </Reveal>
          <Reveal delay={350}>
            <div className="mt-12 flex items-center gap-4">
              <span className="size-10 rounded-full bg-cream/20" />
              <div className="text-left">
                <p className="text-sm font-medium">Ji-won Park</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-cream/60">Directrice artistique · Séoul</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Journal / Newsletter */}
      <section id="journal" className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12 lg:py-40">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-taupe">
                <span className="h-px w-8 bg-taupe" />
                Journal
              </p>
              <h3 className="mb-10 font-serif text-5xl font-medium leading-[1] lg:text-6xl">
                La lettre du matin.
              </h3>
              <p className="mb-8 max-w-md text-taupe">
                Rituels saisonniers, notes d'atelier et accès en avant-première à nos éditions limitées.
              </p>
              <form className="flex max-w-md items-center gap-4 border-b border-ink/20 pb-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Votre adresse e-mail"
                  className="flex-grow bg-transparent py-2 text-sm placeholder:text-taupe/60 focus:outline-none"
                />
                <button className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em]">
                  Rejoindre
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </form>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <a href="#" className="group block">
                <div className="mb-4 aspect-[4/5] overflow-hidden rounded-md bg-sand">
                  <img src={product2} alt="Rituel du soir" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-taupe">Rituel · 04 min</p>
                <h4 className="mt-2 font-serif text-lg">Le geste du soir, revisité</h4>
              </a>
              <a href="#" className="group block sm:mt-16">
                <div className="mb-4 aspect-[4/5] overflow-hidden rounded-md bg-sand">
                  <img src={product3} alt="Fermentation" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-taupe">Atelier · 06 min</p>
                <h4 className="mt-2 font-serif text-lg">Dans nos ateliers de fermentation</h4>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink pt-24 pb-12 text-cream">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="mb-6 text-2xl font-medium uppercase tracking-[0.3em]">Chae-un</div>
              <p className="max-w-[36ch] text-pretty text-sm leading-relaxed text-cream/60">
                Un pont entre l'apothicairerie coréenne et l'art dermatologique moderne. Fabriqué en
                petites séries pour celles et ceux qui cherchent la lumière.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
              <div>
                <h5 className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-cream/50">Maison</h5>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-taupe">Notre histoire</a></li>
                  <li><a href="#" className="hover:text-taupe">Ateliers</a></li>
                  <li><a href="#" className="hover:text-taupe">Journal</a></li>
                </ul>
              </div>
              <div>
                <h5 className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-cream/50">Boutique</h5>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-taupe">Sérums</a></li>
                  <li><a href="#" className="hover:text-taupe">Crèmes</a></li>
                  <li><a href="#" className="hover:text-taupe">Coffrets</a></li>
                </ul>
              </div>
              <div>
                <h5 className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-cream/50">Suivez-nous</h5>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-taupe">Instagram</a></li>
                  <li><a href="#" className="hover:text-taupe">TikTok</a></li>
                  <li><a href="#" className="hover:text-taupe">Pinterest</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-cream/10 pt-8 text-[10px] uppercase tracking-[0.24em] text-cream/40 md:flex-row md:items-center">
            <span>© 2024 Chae-un Beauty · Fabriqué à Séoul et Paris</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cream">Confidentialité</a>
              <a href="#" className="hover:text-cream">Livraison</a>
              <a href="#" className="hover:text-cream">Mentions légales</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
