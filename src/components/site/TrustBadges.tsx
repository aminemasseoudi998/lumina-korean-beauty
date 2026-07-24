import { Banknote, RefreshCw, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: Truck, label: "Livraison 24h", hint: "Partout en Tunisie" },
  { icon: Banknote, label: "Paiement à la livraison", hint: "Aucun paiement en ligne" },
  { icon: ShieldCheck, label: "100% authentique", hint: "Importé & certifié" },
  { icon: RefreshCw, label: "Retour 7 jours", hint: "Satisfait ou remboursé" },
];

export function TrustBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 ${
        compact ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4"
      }`}
    >
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-3 bg-tint p-3.5 sm:p-4">
          <i.icon className="size-5 shrink-0 text-camel-deep" strokeWidth={1.5} />
          <div className="min-w-0">
            <p className="truncate text-xs font-medium">{i.label}</p>
            <p className="truncate text-[10px] text-taupe">{i.hint}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
