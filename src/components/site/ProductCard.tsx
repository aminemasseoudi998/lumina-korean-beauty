import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useFavorites } from "@/lib/favorites";
import { availabilityLabel, categoryName, discountPercent, formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { has, toggle } = useFavorites();
  const discount = discountPercent(product);
  const favorited = has(product.slug);
  return (
    <div className="group flex flex-col">
      <Link
        to="/produit/$slug"
        params={{ slug: product.slug }}
        className="relative mb-4 block aspect-[3/4] overflow-hidden rounded-md bg-sand outline outline-1 -outline-offset-1 outline-black/5"
      >
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={1000}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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

      <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-ink sm:text-[10px] sm:tracking-[0.24em]">
        {product.brand}
      </p>
      <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-taupe sm:text-[10px]">
        {categoryName(product.category)} · {product.size}
      </p>
      <h3 className="mt-1 font-serif text-lg sm:text-xl">
        <Link to="/produit/$slug" params={{ slug: product.slug }} className="hover:text-camel-deep">
          {product.name}
        </Link>
      </h3>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-serif text-base italic sm:text-lg">{formatPrice(product.price)}</span>
        {product.oldPrice && (
          <span className="font-serif text-sm italic text-taupe/70 line-through">
            {formatPrice(product.oldPrice)}
          </span>
        )}
      </div>
      <button
        onClick={() => add(product.slug)}
        className="mt-4 w-full rounded-full border border-camel-deep/30 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-camel-deep transition-colors hover:bg-camel-deep hover:text-cream"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
