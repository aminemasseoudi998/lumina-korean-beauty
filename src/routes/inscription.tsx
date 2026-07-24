import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageShell } from "@/components/site/PageShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/inscription")({
  component: SignupPage,
});

const fieldClass =
  "w-full rounded-md border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-taupe/50 focus:border-camel-deep focus:outline-none focus:ring-1 focus:ring-camel-deep";
const labelClass = "mb-1.5 block text-[10px] font-medium uppercase tracking-[0.22em] text-taupe";

function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    const res = register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    if (!res.ok) {
      setError(res.error ?? "Inscription impossible.");
      return;
    }
    navigate({ to: "/" });
  };

  return (
    <PageShell>
      <div className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-5 py-16 sm:px-6 sm:py-24">
        <div className="w-full">
          <div className="mb-8 text-center">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-camel-deep">
              Rejoignez Wglow
            </p>
            <h1 className="font-serif text-4xl font-medium italic sm:text-5xl">Créer un compte</h1>
            <p className="mt-3 text-sm text-taupe">Suivez vos commandes et vos favoris.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="rounded-md bg-tint-deep px-4 py-3 text-xs text-camel-deep">{error}</p>
            )}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="firstName">Prénom</label>
                <input id="firstName" required autoComplete="given-name" className={fieldClass} value={form.firstName} onChange={update("firstName")} />
              </div>
              <div>
                <label className={labelClass} htmlFor="lastName">Nom</label>
                <input id="lastName" required autoComplete="family-name" className={fieldClass} value={form.lastName} onChange={update("lastName")} />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="email">E-mail</label>
              <input id="email" type="email" required autoComplete="email" className={fieldClass} value={form.email} onChange={update("email")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="password">Mot de passe</label>
              <input id="password" type="password" required autoComplete="new-password" className={fieldClass} value={form.password} onChange={update("password")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="confirm">Confirmer le mot de passe</label>
              <input id="confirm" type="password" required autoComplete="new-password" className={fieldClass} value={form.confirm} onChange={update("confirm")} />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-camel-deep py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
            >
              Créer mon compte
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-taupe">
            Déjà un compte ?{" "}
            <Link to="/connexion" className="font-medium text-camel-deep underline-offset-4 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
