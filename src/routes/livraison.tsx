import { createFileRoute } from "@tanstack/react-router";
import { Truck, Package, Clock, CreditCard, MapPin, RotateCcw } from "lucide-react";
import { PageHeader, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/livraison")({
  component: LivraisonPage,
});

const features = [
  {
    icon: Truck,
    title: "Livraison dans toute la Tunisie",
    body: "Nous livrons partout en Tunisie, de Tunis à Tataouine. Votre commande est préparée avec soin et expédiée sous 24 à 48 heures ouvrées.",
  },
  {
    icon: Clock,
    title: "Délais de livraison",
    body: "Les délais varient entre 24h et 72h selon votre localisation. Les grandes villes (Tunis, Sfax, Sousse, Nabeul) sont livrées sous 24h, les autres régions sous 48 à 72h.",
  },
  {
    icon: CreditCard,
    title: "Paiement à la livraison",
    body: "Vous avez la possibilité de payer en espèces à la réception de votre commande. Pas de risque, vous ne payez que si vous êtes satisfaite.",
  },
  {
    icon: Package,
    title: "Frais de livraison",
    body: "Les frais de livraison sont de 7 DT pour toute commande inférieure à 200 DT. Au-delà de 200 DT, la livraison est offerte.",
  },
  {
    icon: RotateCcw,
    title: "Retours et échanges",
    body: "Vous disposez de 14 jours à compter de la réception pour retourner un produit non utilisé. Nous procédons à l'échange ou au remboursement sous 48h.",
  },
  {
    icon: MapPin,
    title: "Point relais",
    body: "Vous pouvez également choisir la livraison en point relais dans les principales villes de Tunisie. Vous serez notifiée par SMS dès l'arrivée de votre colis.",
  },
];

function LivraisonPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Livraison"
        title={<>Livraison & <span className="italic text-taupe">retours.</span></>}
        intro="Nous faisons tout pour que vos soins vous parviennent rapidement et en toute sérénité, où que vous soyez en Tunisie."
      />

      <section className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-ink/10 bg-cream p-6 transition-all hover:-translate-y-1 hover:border-camel/40 hover:shadow-md sm:p-8"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-camel-deep/10 text-camel-deep sm:size-12">
                <f.icon className="size-5" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 font-serif text-lg sm:text-xl">{f.title}</h3>
              <p className="text-sm leading-relaxed text-taupe">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl border border-camel/30 bg-tint-deep px-6 py-10 text-center sm:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: "radial-gradient(50% 60% at 50% 0%, rgba(200,177,141,0.35), transparent 70%)" }}
          />
          <div className="relative">
            <span className="font-serif text-5xl italic text-camel-deep sm:text-7xl">200 DT</span>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-taupe">Seuil de livraison offerte</p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-taupe">
              À partir de 200 DT d'achat, la livraison est offerte partout en Tunisie. Profitez-en !
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
