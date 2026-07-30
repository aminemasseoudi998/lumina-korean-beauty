import { Link } from "@tanstack/react-router";
import { Check, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useCartSheet } from "@/lib/cart-sheet";
import { formatPrice } from "@/lib/products";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 7;

export function CartSheet() {
  const { open, setOpen } = useCartSheet();
  const { items, lines, count, subtotal, setQty, remove } = useCart();

  const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const remaining = Math.max(0, SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-lg [&>button:first-child]:hidden">
        {/* Mobile drag hint */}
        <div className="flex justify-center pt-2 pb-0.5 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-ink/10" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3 sm:px-6 sm:py-4">
          <div>
            <SheetTitle className="font-serif text-lg italic sm:text-2xl">
              Panier
            </SheetTitle>
            {count > 0 && (
              <p className="mt-0.5 text-xs text-taupe">{count} article{count > 1 ? "s" : ""}</p>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-sand active:bg-sand/70"
            aria-label="Fermer"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-sand">
              <ShoppingBag className="size-8 text-taupe" strokeWidth={1.2} />
            </div>
            <p className="font-serif text-2xl italic text-taupe">Votre panier est vide</p>
            <p className="max-w-[26ch] text-sm leading-relaxed text-taupe/70">
              Ajoutez vos produits coréens préférés et ils apparaîtront ici.
            </p>
            <Link
              to="/boutique"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-camel-deep px-8 py-3 text-sm font-medium text-cream transition-colors hover:bg-camel-dark active:bg-camel-dark"
            >
              Découvrir la boutique
            </Link>
          </div>
        ) : (
          <>
            {/* Scrollable items */}
            <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-6 sm:py-4">
              <div className="space-y-4 sm:space-y-5">
                {lines.map((line) => (
                  <div key={line.slug} className="flex gap-3 sm:gap-4">
                    <Link
                      to="/produit/$slug"
                      params={{ slug: line.slug }}
                      onClick={() => setOpen(false)}
                      className="aspect-square w-16 shrink-0 overflow-hidden rounded-lg bg-sand ring-1 ring-ink/5 sm:w-24"
                    >
                      <img
                        src={line.product.image}
                        alt={line.product.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="min-w-0">
                        <p className="truncate text-[9px] font-medium uppercase tracking-[0.22em] text-camel-deep">
                          {line.product.brand}
                        </p>
                        <Link
                          to="/produit/$slug"
                          params={{ slug: line.slug }}
                          onClick={() => setOpen(false)}
                          className="mt-0.5 block truncate font-serif text-sm hover:text-taupe sm:text-lg"
                        >
                          {line.product.name}
                        </Link>
                        <p className="mt-0.5 text-[10px] text-taupe sm:mt-0 sm:text-xs">
                          {line.product.size}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between sm:mt-3">
                        <div className="inline-flex items-center rounded-full border border-ink/15">
                          <button
                            onClick={() => setQty(line.slug, line.qty - 1)}
                            className="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-sand active:bg-sand/70 sm:size-8"
                            aria-label="Diminuer"
                          >
                            <Minus className="size-2.5 stroke-[2] sm:size-3 sm:stroke-[1.5]" />
                          </button>
                          <span className="w-6 text-center text-xs tabular-nums sm:w-7 sm:text-sm">{line.qty}</span>
                          <button
                            onClick={() => setQty(line.slug, line.qty + 1)}
                            className="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-sand active:bg-sand/70 sm:size-8"
                            aria-label="Augmenter"
                          >
                            <Plus className="size-2.5 stroke-[2] sm:size-3 sm:stroke-[1.5]" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="font-serif text-sm italic sm:text-base">
                            {formatPrice(line.product.price * line.qty)}
                          </span>
                          <button
                            onClick={() => remove(line.slug)}
                            className="flex size-6 items-center justify-center rounded-full text-taupe/40 transition-colors hover:text-red-400 active:text-red-500 sm:size-7"
                            aria-label="Retirer"
                          >
                            <Trash2 className="size-3 sm:size-3.5" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-ink/10 bg-cream px-4 py-4 sm:px-6 sm:py-5">
              {subtotal < SHIPPING_THRESHOLD && subtotal > 0 && (
                <div className="mb-3 sm:mb-4">
                  <div className="mb-1 flex items-center justify-between text-[11px] text-taupe sm:mb-1.5 sm:text-xs">
                    <span>Livraison offerte dès {formatPrice(SHIPPING_THRESHOLD)}</span>
                    <span className="tabular-nums">{formatPrice(remaining)}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-champagne">
                    <div
                      className="h-full rounded-full bg-camel-deep transition-all duration-700 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-taupe sm:mt-2 sm:text-xs">
                    Plus que <span className="font-medium text-ink">{formatPrice(remaining)}</span> pour la livraison offerte.
                  </p>
                </div>
              )}

              {subtotal >= SHIPPING_THRESHOLD && subtotal > 0 && (
                <div className="mb-3 rounded-lg bg-sand/70 px-3 py-2.5 sm:mb-4 sm:px-4 sm:py-3">
                  <p className="inline-flex items-center gap-1.5 text-xs font-medium text-camel-deep">
                    <Check className="size-3.5" strokeWidth={2.5} /> Livraison offerte débloquée !
                  </p>
                </div>
              )}

              <div className="space-y-1.5 text-sm sm:space-y-2">
                <div className="flex justify-between">
                  <span className="text-taupe">Sous-total</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-taupe">Livraison</span>
                  <span className={shipping === 0 ? "text-camel-deep" : "tabular-nums"}>
                    {shipping === 0 ? "Offerte" : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-ink/10 pt-2 sm:mt-3 sm:pt-3">
                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-taupe">Total</span>
                <span className="font-serif text-lg italic sm:text-xl">{formatPrice(total)}</span>
              </div>

              <Link
                to="/commande"
                onClick={() => setOpen(false)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-camel-deep px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-camel-dark active:bg-camel-dark sm:mt-4"
              >
                Passer la commande
              </Link>

              <Link
                to="/panier"
                onClick={() => setOpen(false)}
                className="mt-1 flex w-full items-center justify-center gap-1 py-2 text-xs text-taupe transition-colors hover:text-ink active:text-ink sm:mt-2"
              >
                Voir le panier complet
                <span className="inline-block">→</span>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
