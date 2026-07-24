import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { PageHeader, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

const fieldClass =
  "w-full rounded-md border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-taupe/50 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink";
const labelClass = "mb-1.5 block text-[10px] font-medium uppercase tracking-[0.22em] text-taupe";

const faqs = [
  {
    q: "Sous combien de temps suis-je livré(e) ?",
    a: "Nous expédions le jour même pour toute commande passée avant 15h. La livraison intervient sous 24h dans le Grand Tunis et 24 à 48h dans le reste de la Tunisie.",
  },
  {
    q: "Comment puis-je régler ma commande ?",
    a: "Uniquement à la livraison, en espèces ou par carte auprès du coursier. Aucun paiement en ligne n'est demandé sur le site.",
  },
  {
    q: "Vos produits sont-ils authentiques ?",
    a: "Oui. Tous nos cosmétiques sont importés directement depuis la Corée du Sud auprès des marques officielles ou de leurs distributeurs agréés.",
  },
  {
    q: "Puis-je retourner un produit ?",
    a: "Vous disposez de 7 jours après réception pour nous retourner un produit non ouvert et obtenir un remboursement ou un échange.",
  },
  {
    q: "Que signifie « en précommande » ?",
    a: "Le produit est en cours de réapprovisionnement. Vous pouvez le réserver dès maintenant : il sera expédié sous 3 à 4 semaines, et vous ne réglez qu'à la livraison.",
  },
];

const infos = [
  { label: "E-mail", value: "bonjour@wglow.tn" },
  { label: "Téléphone", value: "+216 71 000 000" },
  { label: "Boutique", value: "Avenue Habib Bourguiba, Tunis 1000" },
  { label: "Horaires", value: "Lun — Sam · 9h à 19h" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Écrivez-nous <span className="italic text-taupe">un mot.</span>
          </>
        }
        intro="Une question sur un produit, une commande ou une collaboration ? Notre équipe vous répond sous 24 à 48 heures."
      />

      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-6 sm:pb-28 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          {/* Form */}
          <div>
            {sent ? (
              <div className="rounded-lg border border-ink/10 bg-sand/40 p-8 sm:p-12">
                <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-camel-deep text-cream"><Check className="size-6" strokeWidth={2} /></div>
                <h2 className="font-serif text-3xl italic">Message envoyé.</h2>
                <p className="mt-3 max-w-prose leading-relaxed text-taupe">
                  Merci {form.name || ""} — nous avons bien reçu votre message et reviendrons vers vous très vite
                  à l'adresse {form.email || "indiquée"}.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-6 rounded-full border border-camel-deep/30 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-camel-deep transition-colors hover:bg-camel-deep hover:text-cream"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="name">Nom</label>
                    <input id="name" className={fieldClass} value={form.name} onChange={update("name")} required autoComplete="name" />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="email">E-mail</label>
                    <input id="email" type="email" className={fieldClass} value={form.email} onChange={update("email")} required autoComplete="email" />
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="subject">Sujet</label>
                  <input id="subject" className={fieldClass} value={form.subject} onChange={update("subject")} required />
                </div>
                <div>
                  <label className={labelClass} htmlFor="message">Message</label>
                  <textarea id="message" rows={6} className={fieldClass} value={form.message} onChange={update("message")} required />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
                >
                  Envoyer le message
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <aside>
            <div className="rounded-lg border border-ink/10 bg-sand/40 p-6 sm:p-8">
              <h2 className="mb-6 font-serif text-2xl italic">Nous joindre</h2>
              <dl className="space-y-5">
                {infos.map((i) => (
                  <div key={i.label}>
                    <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-taupe">{i.label}</dt>
                    <dd className="mt-1 text-sm text-ink">{i.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex gap-4 border-t border-ink/10 pt-6 text-[10px] uppercase tracking-[0.22em] text-taupe">
                <a href="#" className="hover:text-ink">Instagram</a>
                <a href="#" className="hover:text-ink">TikTok</a>
                <a href="#" className="hover:text-ink">Pinterest</a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/21671000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex items-center gap-4 rounded-lg border border-camel-deep/25 bg-tint-deep/60 p-6 transition-colors hover:bg-tint-deep"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-camel-deep text-cream">
                <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.885 9.886m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                </svg>
              </span>
              <span>
                <span className="block font-serif text-lg">Discuter sur WhatsApp</span>
                <span className="block text-xs text-taupe">Réponse en quelques minutes</span>
              </span>
              <span className="ml-auto text-camel-deep transition-transform group-hover:translate-x-1">→</span>
            </a>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-tint py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-camel-deep sm:tracking-[0.4em]">
            <span className="h-px w-8 bg-camel" />
            Questions fréquentes
          </p>
          <h2 className="mb-10 font-serif text-3xl font-medium leading-[1.05] sm:text-4xl lg:text-5xl">
            Tout ce qu'il faut <span className="italic">savoir.</span>
          </h2>
          <div className="border-t border-ink/10">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-ink/10 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg marker:hidden sm:text-xl">
                  {f.q}
                  <span className="shrink-0 text-xl text-camel-deep transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-prose leading-relaxed text-taupe">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
