import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ClipboardList, ExternalLink, LayoutDashboard, LogOut, Package, Users } from "lucide-react";
import { useAuth } from "@/lib/auth";

const nav = [
  { to: "/admin", label: "Tableau de bord", short: "Bord", icon: LayoutDashboard, exact: true },
  { to: "/admin/produits", label: "Produits", short: "Produits", icon: Package, exact: false },
  { to: "/admin/commandes", label: "Commandes", short: "Commandes", icon: ClipboardList, exact: false },
  { to: "/admin/clients", label: "Clients", short: "Clients", icon: Users, exact: false },
] as const;

function initials(name?: string, email?: string) {
  const base = (name && name.trim()) || email || "A";
  const parts = base.split(/[\s@.]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "A") + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const name = user ? `${user.firstName} ${user.lastName}`.trim() : "Admin";

  return (
    <div className="min-h-screen bg-tint text-ink">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-ink/10 bg-cream px-4 py-6 lg:flex">
        <Link to="/admin" className="mb-8 flex items-center gap-2.5 px-2">
          <span className="flex size-8 items-center justify-center rounded-xl bg-camel-deep font-serif text-sm italic text-cream">W</span>
          <span className="font-serif text-xl italic">Wglow <span className="text-camel-deep">Admin</span></span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          <p className="mb-1 px-3 text-[9px] font-medium uppercase tracking-[0.24em] text-taupe/70">Gestion</p>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.exact }}
              activeProps={{ "data-active": "true" }}
              className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-taupe transition-colors hover:bg-tint hover:text-ink data-[active=true]:bg-tint-deep data-[active=true]:font-medium data-[active=true]:text-ink"
            >
              <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-camel-deep opacity-0 transition-opacity group-data-[active=true]:opacity-100" />
              <n.icon className="size-[18px] text-taupe transition-colors group-data-[active=true]:text-camel-deep" strokeWidth={1.7} />
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="mt-4 rounded-xl border border-ink/10 bg-tint/60 p-3">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-camel to-camel-deep text-xs font-semibold text-cream">
              {initials(name, user?.email)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium">{name}</p>
              <p className="truncate text-[10px] text-taupe">{user?.email}</p>
            </div>
          </div>
          <div className="mt-3 flex gap-1">
            <Link to="/" className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-cream px-2 py-2 text-[11px] text-taupe transition-colors hover:text-ink">
              <ExternalLink className="size-3.5" strokeWidth={1.7} /> Site
            </Link>
            <button onClick={logout} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-cream px-2 py-2 text-[11px] text-taupe transition-colors hover:text-ink">
              <LogOut className="size-3.5" strokeWidth={1.7} /> Sortir
            </button>
          </div>
        </div>
      </aside>

      {/* Top bar — mobile/tablet */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink/10 bg-cream/85 px-5 py-3 backdrop-blur-xl lg:hidden">
        <Link to="/admin" className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-camel-deep font-serif text-xs italic text-cream">W</span>
          <span className="font-serif text-lg italic">Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-camel to-camel-deep text-[11px] font-semibold text-cream">
            {initials(name, user?.email)}
          </span>
          <button onClick={logout} aria-label="Déconnexion" className="flex size-9 items-center justify-center rounded-lg text-taupe hover:bg-tint">
            <LogOut className="size-5" strokeWidth={1.7} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="pb-24 lg:pb-0 lg:pl-64">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-10">{children}</div>
      </main>

      {/* Bottom nav — mobile/tablet */}
      <nav
        aria-label="Navigation admin"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-cream/90 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="flex items-stretch justify-around">
          {nav.map((n) => (
            <li key={n.to} className="flex-1">
              <Link
                to={n.to}
                activeOptions={{ exact: n.exact }}
                activeProps={{ "data-active": "true" }}
                className="flex flex-col items-center gap-1 py-2.5 text-taupe transition-colors data-[active=true]:text-camel-deep"
              >
                <n.icon className="size-[22px]" strokeWidth={1.6} />
                <span className="text-[9px] font-medium uppercase tracking-[0.08em]">{n.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function AdminPageHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-camel-deep">{eyebrow}</p>
        <h1 className="mt-2 font-serif text-3xl italic sm:text-4xl">{title}</h1>
      </div>
      {action}
    </header>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: typeof LayoutDashboard;
}) {
  return (
    <div className="group rounded-2xl border border-ink/10 bg-cream p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-18px_rgba(61,55,48,0.4)] sm:p-6">
      <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-tint-deep to-champagne">
        <Icon className="size-5 text-camel-deep" strokeWidth={1.7} />
      </span>
      <p className="mt-4 font-serif text-2xl leading-none sm:text-3xl">{value}</p>
      <p className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-taupe">{label}</p>
      {hint && <p className="mt-2 text-[11px] text-camel-deep">{hint}</p>}
    </div>
  );
}
