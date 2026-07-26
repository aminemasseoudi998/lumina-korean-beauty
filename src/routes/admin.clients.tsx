import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { useAuth } from "@/lib/auth";
import { useOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/admin/clients")({
  component: AdminClients,
});

type ClientRow = {
  email: string;
  name: string;
  phone: string;
  city: string;
  registered: boolean;
  isAdmin: boolean;
  orders: number;
  spent: number;
};

function AdminClients() {
  const { listUsers, removeUser } = useAuth();
  const { orders } = useOrders();

  const map = new Map<string, ClientRow>();

  // Registered accounts first.
  listUsers().forEach((u) => {
    const key = u.email.toLowerCase();
    map.set(key, {
      email: u.email,
      name: `${u.firstName} ${u.lastName}`.trim(),
      phone: u.phone ?? "—",
      city: "—",
      registered: true,
      isAdmin: !!u.isAdmin,
      orders: 0,
      spent: 0,
    });
  });

  // Merge / add customers derived from orders.
  orders.forEach((o) => {
    const key = o.customer.email.toLowerCase();
    const existing = map.get(key);
    if (existing) {
      existing.orders += 1;
      if (o.status !== "annulee") existing.spent += o.total;
      if (existing.phone === "—") existing.phone = o.customer.phone;
      if (existing.city === "—") existing.city = o.customer.city;
    } else {
      map.set(key, {
        email: o.customer.email,
        name: `${o.customer.firstName} ${o.customer.lastName}`.trim(),
        phone: o.customer.phone,
        city: o.customer.city,
        registered: false,
        isAdmin: false,
        orders: 1,
        spent: o.status !== "annulee" ? o.total : 0,
      });
    }
  });

  const rows = [...map.values()].sort((a, b) => b.spent - a.spent);

  return (
    <div>
      <AdminPageHeader eyebrow="Base clients" title={<>Clients ({rows.length})</>} />

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/20 py-16 text-center">
          <p className="font-serif text-xl italic">Aucun client pour l'instant.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream">
          {/* Desktop table */}
          <table className="hidden w-full text-left text-sm sm:table">
            <thead className="border-b border-ink/10 text-[10px] uppercase tracking-[0.16em] text-taupe">
              <tr>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Téléphone</th>
                <th className="px-5 py-3 font-medium">Ville</th>
                <th className="px-5 py-3 font-medium text-center">Commandes</th>
                <th className="px-5 py-3 font-medium text-right">Total</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {rows.map((c) => (
                <tr key={c.email} className="transition-colors hover:bg-tint">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{c.name || "—"}</span>
                      {c.isAdmin && <span className="rounded-full bg-tint-deep px-2 py-0.5 text-[9px] font-medium text-camel-deep">Admin</span>}
                      {!c.registered && <span className="rounded-full bg-tint px-2 py-0.5 text-[9px] text-taupe">Invité</span>}
                    </div>
                    <p className="text-[11px] text-taupe">{c.email}</p>
                  </td>
                  <td className="px-5 py-3 text-ink/80">{c.phone}</td>
                  <td className="px-5 py-3 text-ink/80">{c.city}</td>
                  <td className="px-5 py-3 text-center tabular-nums">{c.orders}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{formatPrice(c.spent)}</td>
                  <td className="px-5 py-3 text-right">
                    {c.registered && !c.isAdmin && (
                      <button
                        onClick={() => window.confirm(`Supprimer le compte ${c.email} ?`) && removeUser(c.email)}
                        aria-label="Supprimer le client"
                        className="inline-flex size-8 items-center justify-center rounded-lg text-taupe hover:bg-[#f2dede] hover:text-[#8a3a3a]"
                      >
                        <Trash2 className="size-4" strokeWidth={1.7} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <ul className="divide-y divide-ink/10 sm:hidden">
            {rows.map((c) => (
              <li key={c.email} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium">{c.name || "—"}</span>
                      {c.isAdmin && <span className="rounded-full bg-tint-deep px-2 py-0.5 text-[9px] font-medium text-camel-deep">Admin</span>}
                      {!c.registered && <span className="rounded-full bg-tint px-2 py-0.5 text-[9px] text-taupe">Invité</span>}
                    </div>
                    <p className="truncate text-[11px] text-taupe">{c.email}</p>
                    <p className="mt-1 text-[11px] text-taupe">{c.phone} · {c.city}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-serif text-base italic">{formatPrice(c.spent)}</p>
                    <p className="text-[10px] text-taupe">{c.orders} cmd.</p>
                  </div>
                </div>
                {c.registered && !c.isAdmin && (
                  <button
                    onClick={() => window.confirm(`Supprimer le compte ${c.email} ?`) && removeUser(c.email)}
                    className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-taupe hover:text-[#8a3a3a]"
                  >
                    <Trash2 className="size-3.5" strokeWidth={1.7} /> Supprimer le compte
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
