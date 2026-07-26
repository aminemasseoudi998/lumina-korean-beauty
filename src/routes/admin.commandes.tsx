import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { statusBadgeClass } from "@/components/admin/status";
import { orderStatusLabel, orderStatuses, useOrders, type OrderStatus } from "@/lib/orders";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/admin/commandes")({
  component: AdminOrders,
});

function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function AdminOrders() {
  const { orders, setStatus, removeOrder } = useOrders();
  const [filter, setFilter] = useState<OrderStatus | "tous">("tous");

  const shown = filter === "tous" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <AdminPageHeader eyebrow="Ventes" title={<>Commandes ({orders.length})</>} />

      {/* Status filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(["tous", ...orderStatuses] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-4 py-2 text-[11px] font-medium transition-colors ${
              filter === s ? "border-camel-deep bg-camel-deep text-cream" : "border-ink/20 text-taupe hover:border-camel-deep"
            }`}
          >
            {s === "tous" ? "Toutes" : orderStatusLabel[s]}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/20 py-16 text-center">
          <p className="font-serif text-xl italic">Aucune commande.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {shown.map((o) => (
            <details key={o.ref} className="group rounded-2xl border border-ink/10 bg-cream open:shadow-sm">
              <summary className="flex cursor-pointer list-none items-center gap-3 p-4 marker:hidden">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-medium">{o.customer.firstName} {o.customer.lastName}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusBadgeClass(o.status)}`}>
                      {orderStatusLabel[o.status]}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-taupe">
                    {o.ref} · {fmtDate(o.createdAt)} · {o.items.reduce((s, i) => s + i.qty, 0)} article(s)
                  </p>
                </div>
                <span className="shrink-0 font-serif text-lg italic">{formatPrice(o.total)}</span>
                <span className="shrink-0 text-taupe transition-transform group-open:rotate-90">›</span>
              </summary>

              <div className="border-t border-ink/10 p-4">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Items */}
                  <div>
                    <h3 className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-taupe">Articles</h3>
                    <ul className="space-y-1.5 text-sm">
                      {o.items.map((i) => (
                        <li key={i.slug} className="flex justify-between gap-2">
                          <span className="text-ink/80">{i.name} × {i.qty}</span>
                          <span className="tabular-nums">{formatPrice(i.price * i.qty)}</span>
                        </li>
                      ))}
                      <li className="flex justify-between border-t border-ink/10 pt-1.5 text-taupe">
                        <span>Livraison</span>
                        <span>{o.shipping === 0 ? "Offerte" : formatPrice(o.shipping)}</span>
                      </li>
                    </ul>
                  </div>
                  {/* Customer */}
                  <div>
                    <h3 className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-taupe">Coordonnées</h3>
                    <div className="space-y-0.5 text-sm text-ink/80">
                      <p>{o.customer.email}</p>
                      <p>{o.customer.phone}</p>
                      <p>{o.customer.address}, {o.customer.zip} {o.customer.city}</p>
                      <p>{o.customer.country}</p>
                      {o.customer.notes && <p className="text-taupe">Note : {o.customer.notes}</p>}
                      <p className="text-taupe">Règlement : {o.payment === "especes" ? "Espèces à la livraison" : "Paiement à la livraison"}</p>
                    </div>
                  </div>
                </div>

                {/* Status control */}
                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-4">
                  <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-taupe">Statut</label>
                  <select
                    value={o.status}
                    onChange={(e) => setStatus(o.ref, e.target.value as OrderStatus)}
                    className="rounded-full border border-ink/20 bg-cream px-4 py-2 text-xs focus:border-camel-deep focus:outline-none focus:ring-1 focus:ring-camel-deep"
                  >
                    {orderStatuses.map((s) => (
                      <option key={s} value={s}>{orderStatusLabel[s]}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => window.confirm(`Supprimer la commande ${o.ref} ?`) && removeOrder(o.ref)}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs text-taupe transition-colors hover:bg-[#f2dede] hover:text-[#8a3a3a]"
                  >
                    <Trash2 className="size-3.5" strokeWidth={1.7} /> Supprimer
                  </button>
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
