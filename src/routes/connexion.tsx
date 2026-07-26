import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { LogOut, User } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/connexion")({
  component: LoginPage,
});

const fieldClass =
  "w-full rounded-md border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-taupe/50 focus:border-camel-deep focus:outline-none focus:ring-1 focus:ring-camel-deep";
const labelClass = "mb-1.5 block text-[10px] font-medium uppercase tracking-[0.22em] text-taupe";

function LoginPage() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = login(form.email, form.password);
    if (!res.ok) {
      setError(res.error ?? "Connexion impossible.");
      return;
    }
    navigate({ to: "/" });
  };

  // Already logged in
  if (user) {
    return (
      <PageShell>
        <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 py-20 text-center sm:px-6">
          <span className="mb-6 flex size-16 items-center justify-center rounded-full bg-tint-deep">
            <User className="size-7 text-camel-deep" strokeWidth={1.5} />
          </span>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe">Mon compte</p>
          <h1 className="font-serif text-4xl italic sm:text-5xl">Bonjour, {user.firstName}.</h1>
          <p className="mt-4 text-sm text-taupe">Connecté avec {user.email}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {user.isAdmin ? (
              <Link
                to="/admin"
                className="rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
              >
                Espace administrateur
              </Link>
            ) : (
              <Link
                to="/favoris"
                className="rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
              >
                Mes favoris
              </Link>
            )}
            <button
              onClick={logout}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-8 py-3.5 text-sm font-medium transition-colors hover:bg-tint-deep"
            >
              <LogOut className="size-4" strokeWidth={1.6} /> Se déconnecter
            </button>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-5 py-16 sm:px-6 sm:py-24">
        <div className="w-full">
          <div className="mb-8 text-center">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-camel-deep">
              Espace client
            </p>
            <h1 className="font-serif text-4xl font-medium italic sm:text-5xl">Connexion</h1>
            <p className="mt-3 text-sm text-taupe">Ravis de vous revoir chez Wglow.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="rounded-md bg-tint-deep px-4 py-3 text-xs text-camel-deep">{error}</p>
            )}
            <div>
              <label className={labelClass} htmlFor="email">E-mail</label>
              <input id="email" type="email" required autoComplete="email" className={fieldClass} value={form.email} onChange={update("email")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="password">Mot de passe</label>
              <input id="password" type="password" required autoComplete="current-password" className={fieldClass} value={form.password} onChange={update("password")} />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-camel-deep py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
            >
              Se connecter
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-taupe">
            Pas encore de compte ?{" "}
            <Link to="/inscription" className="font-medium text-camel-deep underline-offset-4 hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
