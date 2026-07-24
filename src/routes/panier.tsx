import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { TrustBadges } from "@/components/site/TrustBadges";
import { useCart } from "@/lib/cart";
import { availabilityLabel, categoryName, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/panier")({
  component: CartPage,
});

const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 7;

function CartPage() {
  const { lines, subtotal, count, setQty, remove, clear } = useCart();

  if (lines.length === 0) {
    return (
      <PageShell>
        <div className="mx-auto flex max-w-[1400px] flex-col items-center px-5 py-28 text-center sm:px-6 sm:py-40">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe">Votre panier</p>
          <h1 className="font-serif text-4xl italic sm:text-6xl">Votre panier est vide.</h1>
          <p className="mt-5 max-w-[42ch] leading-relaxed text-taupe">
            Découvrez nos essences bio-fermentées, sérums et rituels de soin coréens.
          </p>
          <Link
            to="/boutique"
            className="mt-8 rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
          >
            Explorer la boutique
          </Link>
        </div>
      </PageShell>
    );
  }

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const remaining = Math.max(0, SHIPPING_THRESHOLD - subtotal);

  return (
    <PageShell>
      <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28 lg:px-12">
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe">Votre panier</p>
            <h1 className="font-serif text-4xl font-medium leading-[0.98] sm:text-6xl">
              Panier <span className="italic text-taupe">({count})</span>
            </h1>
          </div>
          <button
            onClick={clear}
            className="hidden text-[10px] uppercase tracking-[0.24em] text-taupe transition-colors hover:text-ink sm:block"
          >
            Vider le panier
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          {/* Items */}
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {lines.map((line) => (
              <div key={line.slug} className="flex gap-4 py-6 sm:gap-6">
                <Link
                  to="/produit/$slug"
                  params={{ slug: line.slug }}
                  className="aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-md bg-sand sm:w-28"
                >
                  <img src={line.product.image} alt={line.product.name} className="h-full w-full object-cover" loading="lazy" />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.22em] text-taupe sm:text-[10px]">
                        {categoryName(line.product.category)} · {line.product.size}
                      </p>
                      <h3 className="mt-1 font-serif text-lg sm:text-xl">
                        <Link to="/produit/$slug" params={{ slug: line.slug }} className="hover:text-taupe">
                          {line.product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-taupe">
                        {availabilityLabel[line.product.availability]}
                      </p>
                    </div>
                    <span className="shrink-0 font-serif text-lg italic">
                      {formatPrice(line.product.price * line.qty)}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="inline-flex items-center rounded-full border border-ink/20">
                      <button
                        onClick={() => setQty(line.slug, line.qty - 1)}
                        className="flex size-9 items-center justify-center text-base transition-colors hover:text-taupe"
                        aria-label="Diminuer"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-sm tabular-nums">{line.qty}</span>
                      <button
                        onClick={() => setQty(line.slug, line.qty + 1)}
                        className="flex size-9 items-center justify-center text-base transition-colors hover:text-taupe"
                        aria-label="Augmenter"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => remove(line.slug)}
                      className="text-[10px] uppercase tracking-[0.22em] text-taupe transition-colors hover:text-ink"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-ink/10 bg-sand/40 p-6 sm:p-8">
              <h2 className="mb-6 font-serif text-2xl italic">Récapitulatif</h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-taupe">Sous-total</dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-taupe">Livraison</dt>
                  <dd className="tabular-nums">{shipping === 0 ? "Offerte" : formatPrice(shipping)}</dd>
                </div>
              </dl>

              {/* Free-shipping progress */}
              <div className="mt-5 rounded-lg bg-cream p-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-champagne">
                  <div
                    className="h-full rounded-full bg-camel-deep transition-all duration-700"
                    style={{ width: `${Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-taupe">
                  {remaining > 0 ? (
                    <>
                      Plus que <span className="font-medium text-ink">{formatPrice(remaining)}</span> pour la
                      livraison offerte.
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-medium text-camel-deep">
                      <Check className="size-3.5" strokeWidth={2.5} /> Livraison offerte débloquée !
                    </span>
                  )}
                </p>
              </div>

              <div className="mt-6 flex items-baseline justify-between border-t border-ink/10 pt-5">
                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-taupe">Total</span>
                <span className="font-serif text-2xl italic">{formatPrice(total)}</span>
              </div>

              <Link
                to="/commande"
                className="mt-6 block w-full rounded-full bg-camel-deep py-3.5 text-center text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
              >
                Passer la commande
              </Link>
              <Link
                to="/boutique"
                className="mt-3 block w-full py-2 text-center text-[10px] uppercase tracking-[0.24em] text-taupe transition-colors hover:text-ink"
              >
                Continuer mes achats
              </Link>
            </div>

            <div className="mt-6">
              <TrustBadges compact />
            </div>

            <button
              onClick={clear}
              className="mt-6 w-full text-[10px] uppercase tracking-[0.24em] text-taupe transition-colors hover:text-ink sm:hidden"
            >
              Vider le panier
            </button>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
