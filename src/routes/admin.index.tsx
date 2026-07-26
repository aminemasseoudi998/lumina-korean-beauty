import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, ClipboardList, Package, Users } from "lucide-react";
import { StatCard } from "@/components/admin/AdminShell";
import { statusBadgeClass } from "@/components/admin/status";
import { useProducts } from "@/lib/products-store";
import { orderStatusLabel, orderStatuses, useOrders } from "@/lib/orders";
import { useAuth } from "@/lib/auth";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function initials(name: string) {
  const p = name.split(/\s+/).filter(Boolean);
  return ((p[0]?.[0] ?? "?") + (p[1]?.[0] ?? "")).toUpperCase();
}

function AdminDashboard() {
  const { products } = useProducts();
  const { orders } = useOrders();
  const { user, listUsers } = useAuth();

  const clientEmails = new Set<string>();
  listUsers().forEach((u) => !u.isAdmin && clientEmails.add(u.email.toLowerCase()));
  orders.forEach((o) => clientEmails.add(o.customer.email.toLowerCase()));

  const revenue = orders.filter((o) => o.status !== "annulee").reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "en-attente").length;
  const precommande = products.filter((p) => p.availability === "precommande").length;

  const byStatus = orderStatuses.map((st) => ({
    status: st,
    count: orders.filter((o) => o.status === st).length,
  }));
  const totalOrders = Math.max(1, orders.length);

  const recent = [...orders].slice(0, 6);

  return (
    <div>
      <header className="mb-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-camel-deep">Tableau de bord</p>
        <h1 className="mt-2 font-serif text-3xl italic sm:text-4xl">Bonjour, {user?.firstName ?? "Admin"}.</h1>
        <p className="mt-2 text-sm text-taupe">Voici l'activité de votre boutique en un coup d'œil.</p>
      </header>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Chiffre d'affaires" value={formatPrice(revenue)} hint={`${pending} en attente`} icon={Banknote} />
        <StatCard label="Commandes" value={String(orders.length)} icon={ClipboardList} />
        <StatCard label="Produits" value={String(products.length)} hint={precommande ? `${precommande} en précommande` : undefined} icon={Package} />
        <StatCard label="Clients" value={String(clientEmails.size)} icon={Users} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-5">
        {/* Orders by status */}
        <section className="rounded-2xl border border-ink/10 bg-cream p-5 sm:p-6 lg:col-span-2">
          <h2 className="mb-5 font-serif text-xl italic">Commandes par statut</h2>
          {orders.length === 0 ? (
            <p className="py-8 text-center text-sm text-taupe">Aucune donnée.</p>
          ) : (
            <ul className="space-y-4">
              {byStatus.map((s) => (
                <li key={s.status}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${statusBadgeClass(s.status).split(" ")[0]}`} />
                      <span className="text-taupe">{orderStatusLabel[s.status]}</span>
                    </span>
                    <span className="font-medium tabular-nums">{s.count}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-tint-deep">
                    <div
                      className="h-full rounded-full bg-camel-deep transition-all duration-700"
                      style={{ width: `${(s.count / totalOrders) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Recent orders */}
        <section className="rounded-2xl border border-ink/10 bg-cream p-5 sm:p-6 lg:col-span-3">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-xl italic">Dernières commandes</h2>
            <Link to="/admin/commandes" className="text-[10px] uppercase tracking-[0.2em] text-camel-deep hover:underline">
              Tout voir →
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="py-8 text-center text-sm text-taupe">Aucune commande pour l'instant.</p>
          ) : (
            <ul className="divide-y divide-ink/10">
              {recent.map((o) => {
                const cname = `${o.customer.firstName} ${o.customer.lastName}`.trim();
                return (
                  <li key={o.ref} className="flex items-center gap-3 py-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-tint-deep text-[11px] font-semibold text-camel-deep">
                      {initials(cname)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{cname}</p>
                      <p className="text-[11px] text-taupe">{o.ref} · {formatPrice(o.total)}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${statusBadgeClass(o.status)}`}>
                      {orderStatusLabel[o.status]}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
