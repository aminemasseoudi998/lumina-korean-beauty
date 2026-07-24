import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Banknote, RefreshCw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import heroBottle from "@/assets/hero-bottle.jpg";
import skinGlow from "@/assets/skin-glow.jpg";
import clip1 from "@/assets/1.mp4";
import clip3 from "@/assets/3.mp4";
import clip4 from "@/assets/4.mp4";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProductCard } from "@/components/site/ProductCard";
import { CommunityStories } from "@/components/site/CommunityStories";
import {
  bestSellers,
  brands,
  categories,
  discountPercent,
  formatPrice,
  newArrivals,
  promoProducts,
} from "@/lib/products";

export const Route = createFileRoute("/")({
  component: Index,
});

const features = [
  { icon: Truck, title: "Livraison 24h", body: "Partout en Tunisie, expédié le jour même." },
  { icon: Banknote, title: "Paiement à la livraison", body: "Réglez en espèces à la réception." },
  { icon: ShieldCheck, title: "100% authentique", body: "Cosmétiques coréens importés et certifiés." },
  { icon: RefreshCw, title: "Retours faciles", body: "Satisfait ou remboursé sous 7 jours." },
];

const steps = [
  { n: "01", title: "Purification", body: "Dissoudre les impuretés à l'huile de camélia fermentée, en préservant la barrière hydrolipidique." },
  { n: "02", title: "Hydratation", body: "Ouvrir les canaux de moisture grâce à l'essence d'eau de riz micro-filtrée." },
  { n: "03", title: "Infusion Active", body: "Réparer en profondeur avec les saponines de ginseng de haute intensité." },
  { n: "04", title: "Sceau de Soie", body: "Sceller la nourriture d'un voile de céramides pour un fini porcelaine." },
];

const skinTypes = ["Peau sèche", "Peau grasse", "Peau mixte", "Peau sensible", "Teint terne", "Peau mature"];

const pressLogos = ["ELLE", "VOGUE", "Marie Claire", "COSMOPOLITAN", "Glamour", "GRAZIA"];

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
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] mr-[0.2em] align-bottom">
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

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useParallax(strength = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
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
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  width: number;
  height: number;
}) {
  const { ref, offset } = useParallax(strength);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="h-[115%] w-full object-cover"
        style={{ transform: `translate3d(0, ${offset}px, 0)`, willChange: "transform" }}
      />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string;
  title: React.ReactNode;
  link?: { label: string; to: string };
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
      <div>
        <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe sm:tracking-[0.4em]">
          <span className="h-px w-8 bg-taupe" />
          {eyebrow}
        </p>
        <h2 className="font-serif text-4xl font-medium leading-[0.95] sm:text-5xl lg:text-6xl">{title}</h2>
      </div>
      {link && (
        <Link
          to={link.to}
          className="hidden items-center gap-3 border-b border-ink/20 pb-1 text-xs uppercase tracking-[0.24em] transition-colors hover:border-ink md:inline-flex"
        >
          {link.label} <span>→</span>
        </Link>
      )}
    </div>
  );
}

function Index() {
  const [scrollY, setScrollY] = useState(0);
  const [skin, setSkin] = useState<string | null>(null);
  const [motionOK, setMotionOK] = useState(false);
  const hero = bestSellers[0];

  useEffect(() => {
    setMotionOK(!prefersReducedMotion());
    if (prefersReducedMotion()) return;
    const on = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink selection:bg-ink selection:text-cream">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 80% 10%, rgba(232,226,217,0.9), transparent 60%), radial-gradient(50% 40% at 10% 90%, rgba(245,241,234,0.9), transparent 60%)",
        }}
      />

      <SiteNav />

      {/* Brands marquee — moving horizontal banner */}
      <div className="relative overflow-hidden border-y border-ink/5 bg-tint-deep py-3.5 text-ink sm:py-4">
        <div className="animate-marquee items-center">
          {[...brands, ...brands, ...brands].map((b, i) => (
            <div key={i} className="flex shrink-0 items-center gap-5 px-5 sm:gap-8 sm:px-8">
              <span className="text-sm font-medium uppercase tracking-[0.24em] whitespace-nowrap sm:text-base">
                {b.name}
              </span>
              <Sparkles className="size-3.5 text-camel-deep/70" strokeWidth={1.5} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-tint-deep to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-tint-deep to-transparent sm:w-24" />
      </div>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden pt-12 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Copy */}
            <div className="lg:col-span-5">
              <Reveal>
                <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-camel-deep sm:tracking-[0.4em]">
                  <span className="h-px w-8 bg-camel" />
                  Séoul → Tunisie · Livraison 24h
                </p>
              </Reveal>

              <SplitHeading
                text="Le Souffle Lumineux de la Rosée"
                className="max-w-[18ch] font-serif text-[clamp(2.1rem,4.4vw,3.75rem)] font-medium italic leading-[1.04] text-balance"
              />

              <Reveal delay={500}>
                <p className="mt-6 max-w-[46ch] leading-relaxed text-taupe">
                  La maison de cosmétiques coréens authentiques en Tunisie. Les meilleures marques,
                  livrées en 24h avec paiement à la livraison.
                </p>
              </Reveal>

              <Reveal delay={620}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    to="/boutique"
                    className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream ring-1 ring-camel-deep"
                  >
                    <span className="relative z-10">Découvrir la boutique</span>
                    <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                    <span className="absolute inset-0 -translate-x-full bg-camel-dark transition-transform duration-500 group-hover:translate-x-0" />
                  </Link>
                  <a
                    href="#diagnostic"
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-camel-deep/30 px-8 py-3.5 text-sm font-medium text-camel-deep transition-colors hover:bg-tint-deep"
                  >
                    Diagnostic de peau
                  </a>
                </div>
              </Reveal>

              <Reveal delay={760}>
                <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-6">
                  {[
                    { v: "24h", l: "Livraison Tunisie" },
                    { v: "8+", l: "Marques coréennes" },
                    { v: "100%", l: "Authentique" },
                  ].map((s) => (
                    <div key={s.l}>
                      <dt className="font-serif text-2xl italic sm:text-3xl">{s.v}</dt>
                      <dd className="mt-1 text-[9px] uppercase tracking-[0.18em] text-taupe sm:text-[10px] sm:tracking-[0.22em]">
                        {s.l}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Media — animated motion collage (cosmetics & skin) */}
            <Reveal delay={200} className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-6 sm:gap-4">
                {/* Primary tall clip + floating best-seller card */}
                <div className="relative sm:col-span-4">
                  <div
                    className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand ring-1 ring-ink/5"
                    style={{ transform: `translate3d(0, ${scrollY * 0.04}px, 0)`, willChange: "transform" }}
                  >
                    <video
                      autoPlay={motionOK}
                      muted
                      loop
                      playsInline
                      poster={skinGlow}
                      className="h-full w-full object-cover"
                    >
                      <source src={clip1} type="video/mp4" />
                    </video>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-cream/85 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-ink backdrop-blur-md">
                      <span className="size-1.5 animate-pulse rounded-full bg-camel-deep" />
                      Éclat
                    </span>

                    {hero && (
                      <Link
                        to="/produit/$slug"
                        params={{ slug: hero.slug }}
                        className="group absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-xl bg-cream/95 p-3 shadow-lg ring-1 ring-ink/5 backdrop-blur-md sm:gap-4 sm:p-4"
                      >
                        <div className="aspect-square w-14 shrink-0 overflow-hidden rounded-lg bg-sand sm:w-16">
                          <img src={hero.image} alt={hero.name} className="h-full w-full object-cover" loading="lazy" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-camel-deep">
                            Best-seller · {hero.brand}
                          </p>
                          <p className="mt-0.5 truncate font-serif text-base sm:text-lg">{hero.name}</p>
                          <p className="mt-0.5 font-serif text-sm italic">{formatPrice(hero.price)}</p>
                        </div>
                        <span className="shrink-0 text-camel-deep transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Two stacked accent clips */}
                <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:grid-cols-1 sm:grid-rows-2 sm:gap-4">
                  {[
                    { src: clip3, poster: heroBottle, label: "Textures" },
                    { src: clip4, poster: skinGlow, label: "Rituel" },
                  ].map((tile) => (
                    <div
                      key={tile.label}
                      className="group relative aspect-square overflow-hidden rounded-2xl bg-sand ring-1 ring-ink/5 sm:aspect-auto"
                    >
                      <video
                        autoPlay={motionOK}
                        muted
                        loop
                        playsInline
                        poster={tile.poster}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      >
                        <source src={tile.src} type="video/mp4" />
                      </video>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 font-serif text-sm italic text-cream">
                        {tile.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust features */}
      <section className="mx-auto max-w-[1400px] px-5 pb-6 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4 bg-tint p-5 sm:p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-champagne/70">
                <f.icon className="size-5 text-camel-deep" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-serif text-base sm:text-lg">{f.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-taupe">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* As seen in — press strip */}
      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16 lg:px-12">
        <p className="mb-8 text-center text-[10px] font-medium uppercase tracking-[0.4em] text-taupe">
          Vu dans la presse
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-14">
          {pressLogos.map((name) => (
            <span
              key={name}
              className="font-serif text-xl italic text-ink/35 transition-colors duration-300 hover:text-ink/70 sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Best-sellers */}
      <section id="best-sellers" className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 lg:px-12">
        <Reveal>
          <SectionHeading
            eyebrow="Les préférés"
            title={<>Nos <span className="italic">best-sellers.</span></>}
            link={{ label: "Voir tout", to: "/boutique" }}
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4">
          {bestSellers.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-sand/50 py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-12">
          <Reveal>
            <SectionHeading eyebrow="Explorer" title={<>Par <span className="italic">catégorie.</span></>} />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <Link
                  to="/boutique"
                  search={{ categorie: c.slug }}
                  className="group flex h-full flex-col justify-between rounded-lg border border-ink/10 bg-cream p-5 transition-colors hover:border-ink/40 hover:bg-sand/50 sm:p-6"
                >
                  <span className="font-serif text-xl italic sm:text-2xl">{c.name}</span>
                  <span className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-taupe transition-transform group-hover:translate-x-1">
                    Voir →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions */}
      {promoProducts.length > 0 && (
        <section className="relative overflow-hidden bg-tint py-16 text-ink sm:py-24 lg:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: "radial-gradient(50% 45% at 85% 0%, rgba(200,177,141,0.32), transparent 65%)" }}
          />
          <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-12">
            <Reveal>
              <div className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
                <div>
                  <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-camel-deep sm:tracking-[0.4em]">
                    <span className="h-px w-8 bg-camel" />
                    Offres du moment
                  </p>
                  <h2 className="font-serif text-4xl font-medium leading-[0.95] sm:text-5xl lg:text-6xl">
                    Promotions <span className="italic text-camel-deep">à saisir.</span>
                  </h2>
                </div>
                <Link
                  to="/boutique"
                  className="hidden items-center gap-3 border-b border-ink/20 pb-1 text-xs uppercase tracking-[0.24em] transition-colors hover:border-ink md:inline-flex"
                >
                  Toutes les offres <span>→</span>
                </Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {promoProducts.map((p, i) => (
                <Reveal key={p.slug} delay={i * 120}>
                  <Link
                    to="/produit/$slug"
                    params={{ slug: p.slug }}
                    className="group flex items-center gap-5 rounded-xl bg-cream p-4 text-ink shadow-sm ring-1 ring-ink/5 transition-transform hover:-translate-y-1 sm:p-5"
                  >
                    <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-lg bg-sand sm:w-32">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        loading="lazy"
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-camel-deep px-2 py-0.5 text-[9px] font-semibold text-cream">
                        −{discountPercent(p)}%
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-camel-deep">{p.brand}</p>
                      <h3 className="mt-1 truncate font-serif text-lg sm:text-xl">{p.name}</h3>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-serif text-lg italic">{formatPrice(p.price)}</span>
                        <span className="font-serif text-sm italic text-taupe/70 line-through">
                          {formatPrice(p.oldPrice!)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dernières arrivées */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 lg:px-12">
        <Reveal>
          <SectionHeading
            eyebrow="Fraîchement débarquées"
            title={<>Dernières <span className="italic">arrivées.</span></>}
            link={{ label: "Voir tout", to: "/boutique" }}
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4">
          {newArrivals.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Meilleures marques coréennes */}
      <section className="bg-sand/50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-12">
          <Reveal>
            <SectionHeading
              eyebrow="Sélection Wglow"
              title={<>Les meilleures <span className="italic">marques coréennes.</span></>}
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {brands.map((b, i) => (
              <Reveal key={b.name} delay={i * 60}>
                <Link
                  to="/boutique"
                  className="group flex h-full flex-col justify-between rounded-lg border border-ink/10 bg-cream p-5 transition-all hover:-translate-y-1 hover:border-ink/40 sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xl leading-none sm:text-2xl">{b.name}</span>
                    <Sparkles className="size-4 text-taupe/50" strokeWidth={1.5} />
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-taupe">{b.note}</p>
                  <span className="mt-3 text-[9px] uppercase tracking-[0.24em] text-taupe/70">{b.origin}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic de peau */}
      <section id="diagnostic" className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 lg:px-12">
        <div className="grid grid-cols-1 items-stretch gap-6 overflow-hidden rounded-2xl border border-ink/10 lg:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden bg-sand lg:min-h-full">
            <img src={skinGlow} alt="Diagnostic de peau Wglow" className="h-full w-full object-cover" loading="lazy" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe sm:tracking-[0.4em]">
              <span className="h-px w-8 bg-taupe" />
              En 30 secondes
            </p>
            <h2 className="font-serif text-4xl font-medium leading-[1] sm:text-5xl">
              Diagnostic <span className="italic text-taupe">de peau.</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-taupe">
              Dites-nous ce qui caractérise votre peau : nous composons le rituel coréen idéal, adapté à vos
              besoins et à votre budget.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {skinTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setSkin((cur) => (cur === t ? null : t))}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    skin === t ? "border-camel-deep bg-camel-deep text-cream" : "border-ink/20 text-ink hover:border-camel-deep hover:text-camel-deep"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/boutique"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
              >
                {skin ? `Voir la routine ${skin.toLowerCase()}` : "Commencer le diagnostic"}
                <span>→</span>
              </Link>
              {skin && (
                <span className="text-xs text-taupe">Sélection : {skin}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Community stories — video reels */}
      <CommunityStories />

      {/* Philosophy */}
      <section id="about" className="relative overflow-hidden bg-sand/50 py-20 sm:py-28 lg:py-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-champagne opacity-60 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
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
              <div className="absolute -right-2 -bottom-8 w-52 rounded-md bg-cream p-5 shadow-2xl sm:-right-4 sm:-bottom-10 sm:w-60 sm:p-6">
                <p className="text-xs italic leading-relaxed text-ink/70">
                  « Les rituels de porcelaine coréens, rendus accessibles partout en Tunisie. »
                </p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-taupe">— Studio Wglow</p>
              </div>
            </div>
          </Reveal>
          <div className="mt-8 lg:col-span-6 lg:mt-0 lg:pl-8">
            <Reveal delay={100}>
              <p className="mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe sm:tracking-[0.4em]">
                <span className="h-px w-8 bg-taupe" />
                La Philosophie
              </p>
            </Reveal>
            <Reveal delay={200}>
              <h2 className="mb-8 font-serif text-4xl font-medium leading-[1.02] sm:text-5xl lg:mb-10 lg:text-7xl">
                Science avancée, <br />
                <span className="italic text-taupe">sagesse ancestrale.</span>
              </h2>
            </Reveal>
            <Reveal delay={350}>
              <p className="mb-8 max-w-md leading-relaxed text-taupe lg:mb-10">
                Nous sélectionnons les meilleures marques coréennes — formules bio-fermentées, actifs brevetés
                — et les livrons en 24h partout en Tunisie, avec paiement à la livraison.
              </p>
            </Reveal>
            <Reveal delay={500}>
              <Link
                to="/a-propos"
                className="inline-flex items-center gap-3 border-b border-ink/30 pb-1 text-xs uppercase tracking-[0.24em] transition-colors hover:border-ink"
              >
                Notre histoire <span>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ritual steps */}
      <section id="ritual" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-6 sm:py-28 lg:px-12 lg:py-40">
        <Reveal>
          <div className="mb-14 grid grid-cols-1 items-end gap-6 sm:mb-20 lg:mb-24 lg:grid-cols-2 lg:gap-8">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe sm:mb-5 sm:tracking-[0.4em]">
                <span className="h-px w-8 bg-taupe" />
                La Séquence
              </p>
              <h2 className="font-serif text-4xl font-medium leading-[0.95] sm:text-5xl lg:text-7xl">
                Un rituel <span className="italic">en quatre gestes.</span>
              </h2>
            </div>
            <p className="max-w-md text-taupe lg:justify-self-end">
              Une chorégraphie lente inspirée de la cérémonie du thé coréenne — chaque geste prépare le
              suivant, chaque texture révèle la prochaine.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="group relative flex flex-col gap-4 border-t border-ink/15 pt-6 transition-colors hover:border-ink sm:gap-5 sm:pt-8">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-5xl italic text-ink/20 transition-colors group-hover:text-taupe sm:text-6xl">
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

      {/* Newsletter / community CTA */}
      <section className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-6 sm:pb-24 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl border border-camel-deep/20 bg-tint-deep px-6 py-14 text-center sm:px-10 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: "radial-gradient(60% 70% at 50% 0%, rgba(200,177,141,0.35), transparent 70%)" }}
          />
          <div className="relative mx-auto max-w-xl">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-camel-deep">
              La lettre Wglow
            </p>
            <h2 className="font-serif text-3xl font-medium leading-[1.05] sm:text-4xl lg:text-5xl">
              Rejoignez la communauté <span className="italic">lumineuse.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-taupe">
              Rituels saisonniers, nouveautés en avant-première et offres exclusives — directement dans
              votre boîte mail.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="Votre adresse e-mail"
                className="min-w-0 flex-1 rounded-full border border-ink/15 bg-cream px-5 py-3.5 text-sm placeholder:text-taupe/60 focus:border-camel-deep focus:outline-none focus:ring-1 focus:ring-camel-deep"
              />
              <button className="shrink-0 rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark">
                S'inscrire
              </button>
            </form>
            <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-taupe">
              Pas de spam · Désinscription en un clic
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
