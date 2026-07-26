import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ShieldCheck } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const fieldClass =
  "w-full rounded-md border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-taupe/50 focus:border-camel-deep focus:outline-none focus:ring-1 focus:ring-camel-deep";

function AdminGate() {
  const { user, login, logout } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  // Logged in but not an admin.
  if (user && !user.isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-tint px-5 text-center text-ink">
        <ShieldCheck className="mb-5 size-10 text-camel-deep" strokeWidth={1.4} />
        <h1 className="font-serif text-3xl italic">Accès réservé</h1>
        <p className="mt-3 max-w-sm text-sm text-taupe">
          Le compte {user.email} n'a pas les droits administrateur.
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={logout} className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium hover:bg-cream">
            Changer de compte
          </button>
          <Link to="/" className="rounded-full bg-camel-deep px-6 py-3 text-sm font-medium text-cream hover:bg-camel-dark">
            Retour au site
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = login(form.email, form.password);
    if (!res.ok) setError(res.error ?? "Connexion impossible.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-tint px-5">
      <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-cream p-8">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-tint-deep">
            <ShieldCheck className="size-6 text-camel-deep" strokeWidth={1.5} />
          </span>
          <h1 className="font-serif text-2xl italic">Espace administrateur</h1>
          <p className="mt-2 text-xs text-taupe">Réservé à l'équipe Wglow.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="rounded-md bg-tint-deep px-4 py-3 text-xs text-camel-deep">{error}</p>}
          <input
            type="email"
            required
            placeholder="E-mail"
            autoComplete="email"
            className={fieldClass}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <input
            type="password"
            required
            placeholder="Mot de passe"
            autoComplete="current-password"
            className={fieldClass}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
          <button
            type="submit"
            className="w-full rounded-full bg-camel-deep py-3 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-4 text-center text-[11px] text-taupe">Démo : admin@wglow.tn · admin123</p>
      </div>
    </div>
  );
}

function AdminLayout() {
  const { user, ready } = useAuth();

  if (!ready) return <div className="min-h-screen bg-tint" />;
  if (!user || !user.isAdmin) return <AdminGate />;

  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
