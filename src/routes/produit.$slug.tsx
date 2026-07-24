import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { ProductCard } from "@/components/site/ProductCard";
import { TrustBadges } from "@/components/site/TrustBadges";
import { useCart } from "@/lib/cart";
import {
  availabilityLabel,
  categoryName,
  formatPrice,
  getProduct,
  products,
} from "@/lib/products";

export const Route = createFileRoute("/produit/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <PageShell>
        <div className="mx-auto flex max-w-[1400px] flex-col items-center px-5 py-32 text-center sm:px-6">
          <h1 className="font-serif text-4xl italic sm:text-5xl">Produit introuvable</h1>
          <p className="mt-4 text-taupe">Ce produit n'existe pas ou n'est plus disponible.</p>
          <Link
            to="/boutique"
            className="mt-8 rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
          >
            Retour à la boutique
          </Link>
        </div>
      </PageShell>
    );
  }

  const inStock = product.availability === "en-stock";
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);

  const handleAdd = () => {
    add(product.slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-[1400px] px-5 pt-8 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-taupe">
          <Link to="/" className="hover:text-ink">Accueil</Link>
          <span>/</span>
          <Link to="/boutique" className="hover:text-ink">Boutique</Link>
          <span>/</span>
          <Link to="/boutique" search={{ categorie: product.category }} className="hover:text-ink">
            {categoryName(product.category)}
          </Link>
        </nav>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-6 sm:py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <div className="flex gap-3 sm:flex-col">
              {product.gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Vue ${i + 1}`}
                  className={`aspect-square w-16 shrink-0 overflow-hidden rounded-md outline outline-1 -outline-offset-1 transition-all sm:w-20 ${
                    activeImg === i ? "outline-ink" : "outline-black/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
            <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-lg bg-sand outline outline-1 -outline-offset-1 outline-black/5">
              <img
                src={product.gallery[activeImg]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.tag && (
                <span className="absolute left-4 top-4 rounded-full bg-cream/80 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.22em] backdrop-blur-md">
                  {product.tag}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:py-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-taupe">
              {categoryName(product.category)} · {product.size}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-medium italic leading-[1] sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-serif text-3xl italic">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="font-serif text-xl italic text-taupe/70 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Stock status */}
            <div className="mt-5 flex items-center gap-2.5">
              <span
                className={`size-2 rounded-full ${inStock ? "bg-emerald-600" : "bg-amber-500"}`}
              />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-ink">
                {availabilityLabel[product.availability]}
              </span>
              {!inStock && (
                <span className="text-xs text-taupe">· Expédition sous 3 à 4 semaines</span>
              )}
            </div>

            <p className="mt-6 max-w-prose leading-relaxed text-taupe">{product.short}</p>

            {/* Quantity + add */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="inline-flex items-center rounded-full border border-ink/20">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex size-11 items-center justify-center text-lg transition-colors hover:text-taupe"
                  aria-label="Diminuer la quantité"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex size-11 items-center justify-center text-lg transition-colors hover:text-taupe"
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="group relative flex-1 overflow-hidden rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream ring-1 ring-camel-deep transition-colors hover:bg-camel-dark"
              >
                <span className="relative z-10">
                  {added ? "Ajouté au panier ✓" : inStock ? "Ajouter au panier" : "Précommander"}
                </span>
              </button>
            </div>

            <Link
              to="/panier"
              className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-taupe transition-colors hover:text-ink"
            >
              Voir le panier <span>→</span>
            </Link>

            {/* Reassurance */}
            <div className="mt-8">
              <TrustBadges compact />
            </div>

            {/* Collapsible details */}
            <div className="mt-10 border-t border-ink/10">
              <details open className="group border-b border-ink/10 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] font-medium uppercase tracking-[0.28em] text-taupe marker:hidden">
                  Description
                  <span className="text-base text-ink transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 leading-relaxed text-ink/80">{product.description}</p>
              </details>

              <details className="group border-b border-ink/10 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] font-medium uppercase tracking-[0.28em] text-taupe marker:hidden">
                  Actifs clés
                  <span className="text-base text-ink transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span key={ing} className="rounded-full border border-ink/15 px-4 py-2 text-xs text-ink/80">
                      {ing}
                    </span>
                  ))}
                </div>
              </details>

              <details className="group border-b border-ink/10 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] font-medium uppercase tracking-[0.28em] text-taupe marker:hidden">
                  Livraison & règlement
                  <span className="text-base text-ink transition-transform group-open:rotate-45">+</span>
                </summary>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/80">
                  <li>· Livraison en 24h partout en Tunisie.</li>
                  <li>· Paiement à la livraison — aucun paiement en ligne requis.</li>
                  <li>· Livraison offerte dès 200 DT d'achat.</li>
                  <li>· Retour sous 7 jours si le produit ne vous convient pas.</li>
                </ul>
              </details>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24 border-t border-ink/10 pt-16 sm:mt-32">
            <h2 className="mb-10 font-serif text-3xl italic sm:text-4xl">Dans la même catégorie</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile add-to-cart */}
      <div className="sticky bottom-0 z-40 border-t border-ink/10 bg-cream/95 px-5 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-taupe">{product.name}</p>
            <p className="font-serif text-lg italic">{formatPrice(product.price * qty)}</p>
          </div>
          <button
            onClick={handleAdd}
            className="shrink-0 rounded-full bg-camel-deep px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-cream transition-colors hover:bg-camel-dark"
          >
            {added ? "Ajouté ✓" : inStock ? "Ajouter" : "Précommander"}
          </button>
        </div>
      </div>
    </PageShell>
  );
}
