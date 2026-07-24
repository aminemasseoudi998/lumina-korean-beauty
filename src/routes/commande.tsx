import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { useCart, type CartLine } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/commande")({
  component: CheckoutPage,
});

const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 7;

type PaymentMethod = "livraison" | "especes";

const paymentOptions: { value: PaymentMethod; label: string; hint: string }[] = [
  { value: "livraison", label: "Paiement à la livraison", hint: "Réglez par carte au coursier à réception." },
  { value: "especes", label: "Espèces à la livraison", hint: "Préparez l'appoint pour le coursier." },
];

type ConfirmedOrder = {
  ref: string;
  name: string;
  email: string;
  address: string;
  payment: PaymentMethod;
  lines: { name: string; qty: number; price: number }[];
  total: number;
};

const fieldClass =
  "w-full rounded-md border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-taupe/50 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink";
const labelClass = "mb-1.5 block text-[10px] font-medium uppercase tracking-[0.22em] text-taupe";

function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>("livraison");
  const [confirmed, setConfirmed] = useState<ConfirmedOrder | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
    city: "",
    country: "Tunisie",
    notes: "",
  });

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    const order: ConfirmedOrder = {
      ref: `WG-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      address: `${form.address}, ${form.zip} ${form.city}, ${form.country}`,
      payment,
      lines: lines.map((l: CartLine) => ({ name: l.product.name, qty: l.qty, price: l.product.price })),
      total,
    };
    clear();
    setConfirmed(order);
    window.scrollTo({ top: 0 });
  };

  // Confirmation screen
  if (confirmed) {
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-6 sm:py-28">
          <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-full bg-camel-deep text-cream">
            <Check className="size-8" strokeWidth={2} />
          </div>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe">Commande confirmée</p>
          <h1 className="font-serif text-4xl font-medium italic leading-[1] sm:text-5xl">Merci, {confirmed.name || "à vous"} !</h1>
          <p className="mt-5 leading-relaxed text-taupe">
            Votre commande <span className="font-medium text-ink">{confirmed.ref}</span> a bien été enregistrée.
            Un e-mail de confirmation part vers <span className="text-ink">{confirmed.email}</span>. Vous réglerez
            au moment de la livraison.
          </p>

          <div className="mt-10 rounded-lg border border-ink/10 bg-sand/40 p-6 text-left sm:p-8">
            <h2 className="mb-5 font-serif text-2xl italic">Récapitulatif</h2>
            <ul className="divide-y divide-ink/10">
              {confirmed.lines.map((l) => (
                <li key={l.name} className="flex justify-between py-3 text-sm">
                  <span>
                    {l.name} <span className="text-taupe">× {l.qty}</span>
                  </span>
                  <span className="tabular-nums">{formatPrice(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-baseline justify-between border-t border-ink/10 pt-4">
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-taupe">Total à régler</span>
              <span className="font-serif text-2xl italic">{formatPrice(confirmed.total)}</span>
            </div>
            <div className="mt-5 space-y-1 text-xs text-taupe">
              <p><span className="uppercase tracking-[0.2em]">Livraison</span> · {confirmed.address}</p>
              <p>
                <span className="uppercase tracking-[0.2em]">Règlement</span> ·{" "}
                {paymentOptions.find((p) => p.value === confirmed.payment)?.label}
              </p>
            </div>
          </div>

          <Link
            to="/boutique"
            className="mt-10 inline-block rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
          >
            Continuer mes achats
          </Link>
        </div>
      </PageShell>
    );
  }

  // Empty cart guard
  if (lines.length === 0) {
    return (
      <PageShell>
        <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-28 text-center sm:px-6 sm:py-40">
          <h1 className="font-serif text-4xl italic sm:text-5xl">Aucun article à commander</h1>
          <p className="mt-4 text-taupe">Ajoutez des produits à votre panier avant de passer commande.</p>
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

  return (
    <PageShell>
      <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28 lg:px-12">
        <div className="mb-10 sm:mb-14">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe">Commande</p>
          <h1 className="font-serif text-4xl font-medium leading-[0.98] sm:text-6xl">
            Finaliser <span className="italic">ma commande.</span>
          </h1>
          <p className="mt-4 max-w-[48ch] text-sm text-taupe">
            Aucun paiement en ligne : vous réglez à la livraison. Renseignez vos coordonnées et confirmez.
          </p>

          {/* Step indicator */}
          <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-medium uppercase tracking-[0.18em]">
            {["Panier", "Coordonnées", "Confirmation"].map((label, i) => {
              const state = i < 1 ? "done" : i === 1 ? "current" : "todo";
              return (
                <li key={label} className="flex items-center gap-3">
                  <span
                    className={`flex size-6 items-center justify-center rounded-full text-[10px] ${
                      state === "todo"
                        ? "border border-ink/20 text-taupe"
                        : "bg-camel-deep text-cream"
                    }`}
                  >
                    {state === "done" ? "✓" : i + 1}
                  </span>
                  <span className={state === "todo" ? "text-taupe" : "text-ink"}>{label}</span>
                  {i < 2 && <span className="hidden h-px w-8 bg-ink/15 sm:block" />}
                </li>
              );
            })}
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div className="space-y-12">
            {/* Coordonnées */}
            <section>
              <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl italic">
                <span className="text-sm not-italic text-taupe">01</span> Coordonnées
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="firstName">Prénom</label>
                  <input id="firstName" className={fieldClass} value={form.firstName} onChange={update("firstName")} required autoComplete="given-name" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="lastName">Nom</label>
                  <input id="lastName" className={fieldClass} value={form.lastName} onChange={update("lastName")} required autoComplete="family-name" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">E-mail</label>
                  <input id="email" type="email" className={fieldClass} value={form.email} onChange={update("email")} required autoComplete="email" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="phone">Téléphone</label>
                  <input id="phone" type="tel" className={fieldClass} value={form.phone} onChange={update("phone")} required autoComplete="tel" />
                </div>
              </div>
            </section>

            {/* Livraison */}
            <section>
              <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl italic">
                <span className="text-sm not-italic text-taupe">02</span> Adresse de livraison
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="address">Adresse</label>
                  <input id="address" className={fieldClass} value={form.address} onChange={update("address")} required autoComplete="street-address" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="zip">Code postal</label>
                  <input id="zip" className={fieldClass} value={form.zip} onChange={update("zip")} required autoComplete="postal-code" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="city">Ville</label>
                  <input id="city" className={fieldClass} value={form.city} onChange={update("city")} required autoComplete="address-level2" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="country">Pays</label>
                  <input id="country" className={fieldClass} value={form.country} onChange={update("country")} required autoComplete="country-name" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="notes">Note de commande (optionnel)</label>
                  <textarea id="notes" rows={3} className={fieldClass} value={form.notes} onChange={update("notes")} placeholder="Instructions de livraison, code d'accès…" />
                </div>
              </div>
            </section>

            {/* Paiement */}
            <section>
              <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl italic">
                <span className="text-sm not-italic text-taupe">03</span> Mode de règlement
              </h2>
              <div className="space-y-3">
                {paymentOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors ${
                      payment === opt.value ? "border-ink bg-sand/50" : "border-ink/15 hover:border-ink/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={payment === opt.value}
                      onChange={() => setPayment(opt.value)}
                      className="mt-1 accent-camel-deep"
                    />
                    <span>
                      <span className="block text-sm font-medium">{opt.label}</span>
                      <span className="mt-0.5 block text-xs text-taupe">{opt.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
              <p className="mt-4 text-xs text-taupe">
                Aucun paiement en ligne n'est requis. Vous réglez directement au moment de la réception.
              </p>
            </section>
          </div>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-ink/10 bg-sand/40 p-6 sm:p-8">
              <h2 className="mb-5 font-serif text-2xl italic">Votre commande</h2>
              <ul className="divide-y divide-ink/10">
                {lines.map((l) => (
                  <li key={l.slug} className="flex gap-3 py-3">
                    <div className="aspect-square size-14 shrink-0 overflow-hidden rounded-md bg-sand">
                      <img src={l.product.image} alt={l.product.name} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-2">
                      <div>
                        <p className="text-sm leading-snug">{l.product.name}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-taupe">Qté {l.qty}</p>
                      </div>
                      <span className="shrink-0 text-sm tabular-nums">{formatPrice(l.product.price * l.qty)}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="mt-5 space-y-2 border-t border-ink/10 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-taupe">Sous-total</dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-taupe">Livraison</dt>
                  <dd className="tabular-nums">{shipping === 0 ? "Offerte" : formatPrice(shipping)}</dd>
                </div>
              </dl>

              <div className="mt-5 flex items-baseline justify-between border-t border-ink/10 pt-5">
                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-taupe">Total</span>
                <span className="font-serif text-2xl italic">{formatPrice(total)}</span>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-camel-deep py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
              >
                Confirmer la commande
              </button>
              <Link
                to="/panier"
                className="mt-3 block w-full py-2 text-center text-[10px] uppercase tracking-[0.24em] text-taupe transition-colors hover:text-ink"
              >
                Retour au panier
              </Link>
            </div>
          </aside>
        </form>
      </div>
    </PageShell>
  );
}
