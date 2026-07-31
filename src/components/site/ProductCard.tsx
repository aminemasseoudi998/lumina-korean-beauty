import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useCartSheet } from "@/lib/cart-sheet";
import { useFavorites } from "@/lib/favorites";
import { availabilityLabel, categoryName, discountPercent, formatPrice, type Product } from "@/lib/products";
import { clearActiveVideoSlug, getActiveVideoSlug, setActiveVideoSlug, subscribeActiveVideo } from "@/lib/video-hover";
import v2 from "@/assets/2.mp4";
import v3 from "@/assets/3.mp4";
import v4 from "@/assets/4.mp4";
import v5 from "@/assets/5.mp4";
import v6 from "@/assets/6.mp4";
import v7 from "@/assets/7.mp4";

const productVideos: Record<string, string> = {
  "essence-ferment-de-riz": v2,
  "brume-rosee-de-montagne": v3,
  "serum-ginseng-eclat": v4,
  "masque-purifiant-argile": v5,
  "creme-petale-yeon-hwa": v6,
  "masque-de-nuit-gyeol-go": v7,
};

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { setOpen: setCartOpen } = useCartSheet();
  const { has, toggle } = useFavorites();
  const discount = discountPercent(product);
  const favorited = has(product.slug);
  const [hovered, setHovered] = useState(false);
  const [videoRevealed, setVideoRevealed] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(getActiveVideoSlug());
  const video = productVideos[product.slug];
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const suppressNavigation = useRef(false);

  // Follow the page-wide active video; when another card takes over, reset this one.
  useEffect(() => {
    const unsubscribe = subscribeActiveVideo((slug) => {
      setActiveSlug(slug);
      if (slug !== product.slug) {
        setVideoRevealed(false);
        setHovered(false);
      }
    });
    return () => {
      unsubscribe();
      clearActiveVideoSlug(product.slug);
    };
  }, [product.slug]);

  const wantVideo = Boolean(video && (hovered || videoRevealed));

  // Claim / release the single active slot — clearing only if we own it.
  useEffect(() => {
    if (wantVideo) {
      setActiveVideoSlug(product.slug);
    } else {
      clearActiveVideoSlug(product.slug);
    }
  }, [wantVideo, product.slug]);

  const showVideo = Boolean(video && activeSlug === product.slug);

  // Play / pause the video when visibility toggles.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (showVideo) {
      el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [showVideo]);

  // Stop the video as soon as the card leaves the viewport (scroll away).
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) {
          setHovered(false);
          setVideoRevealed(false);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Touch: show the video the instant the finger lands (no release needed).
  const handlePointerDown = (e: React.PointerEvent) => {
    if (video && e.pointerType !== "mouse" && !videoRevealed) {
      setVideoRevealed(true);
      suppressNavigation.current = true;
    }
  };

  // Touch: swallow the click that revealed the video; the next tap navigates.
  const handleClick = (e: React.MouseEvent) => {
    if (suppressNavigation.current) {
      suppressNavigation.current = false;
      e.preventDefault();
    }
  };

  return (
    <div ref={cardRef} className="group flex h-full flex-col">
      <Link
        to="/produit/$slug"
        params={{ slug: product.slug }}
        className="relative mb-3 block aspect-[3/4] overflow-hidden rounded-lg bg-sand outline outline-1 -outline-offset-1 outline-black/5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
      >
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={1000}
          loading="lazy"
          className={`h-full w-full object-cover transition-all duration-[1600ms] ease-out group-hover:scale-110 ${
            showVideo ? "opacity-0" : "opacity-100"
          }`}
        />
        {video && (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            preload="auto"
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              showVideo ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        {/* Favorite toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.slug);
          }}
          aria-label={favorited ? "Retirer des favoris" : "Ajouter aux favoris"}
          aria-pressed={favorited}
          className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-cream/85 backdrop-blur-md transition-transform hover:scale-110 active:scale-95 sm:right-4 sm:top-4"
        >
          <Heart
            className={`size-4 transition-colors ${favorited ? "fill-camel-deep text-camel-deep" : "text-ink"}`}
            strokeWidth={1.8}
          />
        </button>
        {discount > 0 && (
          <span className="absolute right-3 top-14 rounded-full bg-camel-deep px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-cream sm:right-4 sm:top-16">
            −{discount}%
          </span>
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 sm:left-4 sm:top-4">
          {product.tag && (
            <span className="w-fit rounded-full bg-cream/85 px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.2em] text-ink backdrop-blur-md sm:px-3 sm:text-[9px] sm:tracking-[0.22em]">
              {product.tag}
            </span>
          )}
          <span
            className={`w-fit rounded-full px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.2em] backdrop-blur-md sm:px-3 sm:text-[9px] sm:tracking-[0.22em] ${
              product.availability === "en-stock"
                ? "bg-camel-deep/90 text-cream"
                : "bg-taupe/90 text-cream"
            }`}
          >
            {availabilityLabel[product.availability]}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 items-start gap-3">
        <div className="size-12 shrink-0 overflow-hidden rounded-md border border-ink/10 sm:size-14">
          <img
            src={product.image}
            alt=""
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-ink sm:text-[10px] sm:tracking-[0.24em]">
            {product.brand}
          </p>
          <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-taupe sm:text-[10px]">
            {categoryName(product.category)} · {product.size}
          </p>
          <h3 className="mt-1 font-serif text-base sm:text-lg">
            <Link to="/produit/$slug" params={{ slug: product.slug }} className="hover:text-camel-deep">
              {product.name}
            </Link>
          </h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-serif text-sm italic sm:text-base">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="font-serif text-xs italic text-taupe/70 line-through sm:text-sm">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => { add(product.slug); setCartOpen(true); }}
        className="mt-auto w-full rounded-full border border-camel-deep/30 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-camel-deep transition-colors hover:bg-camel-deep hover:text-cream"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
