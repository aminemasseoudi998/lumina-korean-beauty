import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, useEffect } from "react";
import { Check, MapPin, Phone, Mail, Clock, Store, MessageCircle, ChevronRight } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { PageHeader, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

const fieldClass =
  "w-full rounded-lg border border-ink/15 bg-cream px-4 py-3.5 text-sm text-ink placeholder:text-taupe/40 transition-colors focus:border-camel-deep focus:outline-none focus:ring-2 focus:ring-camel-deep/15";
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

const pointsOfSale = [
  { city: "Tunis", address: "Avenue Habib Bourguiba, Tunis 1000", phone: "+216 71 000 001", hours: "Lun—Sam · 9h–19h", lat: 36.8065, lng: 10.1815 },
  { city: "Sfax", address: "Route de l'Aéroport Km 2, Sfax 3000", phone: "+216 74 000 002", hours: "Lun—Sam · 9h–18h", lat: 34.7400, lng: 10.7600 },
  { city: "Sousse", address: "Boulevard de l'Environnement, Sousse 4000", phone: "+216 73 000 003", hours: "Lun—Sam · 9h–19h", lat: 35.8280, lng: 10.6360 },
  { city: "Nabeul", address: "Avenue Habib Bourguiba, Nabeul 8000", phone: "+216 72 000 004", hours: "Lun—Sam · 9h–18h", lat: 36.4560, lng: 10.7350 },
  { city: "Bizerte", address: "Centre Urbain Nord, Bizerte 7000", phone: "+216 72 000 005", hours: "Lun—Ven · 9h–18h", lat: 37.2740, lng: 9.8730 },
];

const pinIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="background:#7a6646;color:#faf7f2;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #faf7f2;box-shadow:0 4px 12px rgba(0,0,0,0.25);font-size:16px;">📍</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -40],
});

const activePinIcon = L.divIcon({
  className: "custom-marker-active",
  html: `<div style="background:#c08a5a;color:#faf7f2;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #faf7f2;box-shadow:0 6px 20px rgba(192,138,90,0.4);font-size:20px;">📍</div>`,
  iconSize: [44, 44],
  iconAnchor: [22, 44],
  popupAnchor: [0, -48],
});

const contactInfo = [
  { icon: Mail, label: "E-mail", value: "bonjour@wglow.tn", href: "mailto:bonjour@wglow.tn" },
  { icon: Phone, label: "Téléphone", value: "+216 71 000 000", href: "tel:+21671000000" },
  { icon: Clock, label: "Horaires", value: "Lun — Sam · 9h à 19h" },
];

function FlyToActiveCity({ activeCity }: { activeCity: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (activeCity) {
      const pos = pointsOfSale.find((p) => p.city === activeCity);
      if (pos) map.flyTo([pos.lat, pos.lng], 13, { duration: 1 });
    }
  }, [activeCity, map]);
  return null;
}

function MapContent({ activeCity, setActiveCity }: { activeCity: string | null; setActiveCity: (c: string | null) => void }) {
  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <FlyToActiveCity activeCity={activeCity} />
      {pointsOfSale.map((p) => (
        <Marker
          key={p.city}
          position={[p.lat, p.lng]}
          icon={activeCity === p.city ? activePinIcon : pinIcon}
          eventHandlers={{
            click: () => setActiveCity(p.city),
          }}
        >
          <Popup>
            <div className="font-sans text-sm">
              <p className="font-semibold text-ink">{p.city}</p>
              <p className="text-xs text-taupe">{p.address}</p>
              <p className="mt-1 text-xs text-taupe">{p.phone}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [activeCity, setActiveCity] = useState<string | null>(null);

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

      {/* Form + Info */}
      <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-6 sm:py-24 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
          {/* Form */}
          <div>
            {sent ? (
              <div className="rounded-2xl border border-ink/10 bg-sand/40 p-10 sm:p-14">
                <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-camel-deep text-cream">
                  <Check className="size-7" strokeWidth={2.5} />
                </div>
                <h2 className="font-serif text-3xl italic sm:text-4xl">Message envoyé.</h2>
                <p className="mt-4 max-w-prose leading-relaxed text-taupe">
                  Merci <span className="font-medium text-ink">{form.name || ""}</span> — nous avons bien reçu votre
                  message et reviendrons vers vous très vite à l'adresse{" "}
                  <span className="font-medium text-ink">{form.email || "indiquée"}</span>.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-camel-deep/30 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-camel-deep transition-colors hover:bg-camel-deep hover:text-cream"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-camel-deep sm:tracking-[0.4em]">
                  <span className="h-px w-8 bg-camel" />
                  Nous écrire
                </p>
                <h2 className="font-serif text-3xl font-medium leading-[1.05] sm:text-4xl lg:text-5xl">
                  Envoyez-nous <span className="italic text-taupe">un message.</span>
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="name">Nom complet</label>
                    <input id="name" className={fieldClass} value={form.name} onChange={update("name")} required autoComplete="name" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="email">Adresse e-mail</label>
                    <input id="email" type="email" className={fieldClass} value={form.email} onChange={update("email")} required autoComplete="email" placeholder="bonjour@exemple.com" />
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="subject">Sujet</label>
                  <input id="subject" className={fieldClass} value={form.subject} onChange={update("subject")} required placeholder="Commande, produit, collaboration…" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="message">Message</label>
                  <textarea id="message" rows={6} className={fieldClass} value={form.message} onChange={update("message")} required placeholder="Écrivez votre message ici…" />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream transition-all hover:bg-camel-dark hover:gap-4"
                >
                  Envoyer le message <ChevronRight className="size-4" strokeWidth={2} />
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-ink/10 bg-cream p-6 sm:p-8">
              <h2 className="mb-6 font-serif text-2xl italic">Nous joindre</h2>
              <div className="space-y-5">
                {contactInfo.map((i) => {
                  const Tag = i.href ? "a" : "div";
                  return (
                    // @ts-ignore
                    <Tag
                      key={i.label}
                      href={i.href}
                      className="flex items-center gap-4 rounded-xl p-3 -mx-3 transition-colors group hover:bg-sand/50"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-camel-deep/10 text-camel-deep transition-colors group-hover:bg-camel-deep group-hover:text-cream">
                        <i.icon className="size-4" strokeWidth={1.5} />
                      </span>
                      <div>
                        <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-taupe">{i.label}</dt>
                        <dd className={`mt-0.5 text-sm ${i.href ? "text-camel-deep font-medium" : "text-ink"}`}>{i.value}</dd>
                      </div>
                    </Tag>
                  );
                })}
              </div>
              <div className="mt-8 flex gap-5 border-t border-ink/10 pt-6">
                <a href="#" className="text-[10px] uppercase tracking-[0.22em] text-taupe transition-colors hover:text-camel-deep">Instagram</a>
                <a href="#" className="text-[10px] uppercase tracking-[0.22em] text-taupe transition-colors hover:text-camel-deep">TikTok</a>
                <a href="#" className="text-[10px] uppercase tracking-[0.22em] text-taupe transition-colors hover:text-camel-deep">Pinterest</a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/21671000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-camel-deep/25 bg-gradient-to-br from-tint-deep to-cream p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -right-8 opacity-[0.07]"
              >
                <MessageCircle className="size-32 text-camel-deep" strokeWidth={1} />
              </div>
              <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-camel-deep text-cream shadow-sm">
                <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.885 9.886m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                </svg>
              </span>
              <span className="relative">
                <span className="block font-serif text-lg">Discuter sur WhatsApp</span>
                <span className="block text-xs text-taupe">Réponse en quelques minutes</span>
              </span>
              <span className="relative ml-auto text-camel-deep transition-transform group-hover:translate-x-1">→</span>
            </a>

            {/* Active city detail */}
            {activeCity && (
              <div className="rounded-2xl border border-camel/20 bg-gradient-to-br from-camel-deep/[0.04] to-transparent p-6">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-camel-deep/10 text-camel-deep">
                    <MapPin className="size-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-ink">{pointsOfSale.find((p) => p.city === activeCity)?.city}</h3>
                    <p className="mt-1 text-sm leading-snug text-taupe">{pointsOfSale.find((p) => p.city === activeCity)?.address}</p>
                    <p className="mt-1 text-xs text-taupe">{pointsOfSale.find((p) => p.city === activeCity)?.phone}</p>
                    <p className="mt-0.5 text-xs font-medium text-camel-deep">{pointsOfSale.find((p) => p.city === activeCity)?.hours}</p>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-24">
        <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-camel-deep sm:tracking-[0.4em]">
          <span className="h-px w-8 bg-camel" />
          Questions fréquentes
        </p>
        <h2 className="mb-8 font-serif text-3xl font-medium leading-[1.05] sm:text-4xl lg:text-5xl">
          Tout ce qu'il faut <span className="italic">savoir.</span>
        </h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-ink/10 bg-cream transition-shadow hover:shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-ink marker:hidden sm:px-6 sm:text-base">
                {f.q}
                <span className="shrink-0 flex size-5 items-center justify-center rounded-md border border-camel-deep/30 text-xs text-camel-deep transition-all group-open:rotate-45 group-open:border-camel-deep group-open:bg-camel-deep group-open:text-cream">
                  +
                </span>
              </summary>
              <p className="border-t border-ink/5 px-5 pb-4 pt-3 text-sm leading-relaxed text-taupe sm:px-6">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Map section */}
      <section className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-6 sm:pb-24 lg:px-12">
        <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-camel-deep sm:tracking-[0.4em]">
          <span className="h-px w-8 bg-camel" />
          Nos points de vente
        </p>
        <h2 className="mb-8 font-serif text-3xl font-medium leading-[1.05] sm:text-4xl lg:text-5xl">
          Trouvez-nous <span className="italic text-taupe">en Tunisie.</span>
        </h2>
        <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-sm outline outline-1 -outline-offset-1 outline-black/5">
          <div className="h-[320px] sm:h-[420px]">
            <MapContainer
              center={[35.2, 9.8]}
              zoom={7}
              scrollWheelZoom={false}
              className="h-full w-full"
              zoomControl={false}
            >
              <MapContent activeCity={activeCity} setActiveCity={setActiveCity} />
            </MapContainer>
          </div>

          {/* Points de vente cards */}
          <div className="grid grid-cols-2 divide-x divide-y divide-ink/5 bg-ink/5 sm:grid-cols-3 lg:grid-cols-5">
            {pointsOfSale.map((p) => (
              <button
                key={p.city}
                onClick={() => setActiveCity(p.city)}
                className={`group relative flex flex-col items-start gap-1.5 bg-cream p-4 text-left transition-all hover:bg-sand/60 sm:p-5 ${
                  activeCity === p.city ? "bg-sand/80" : ""
                }`}
              >
                {activeCity === p.city && (
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-camel-deep" />
                )}
                <Store className="size-4 text-camel-deep" strokeWidth={1.5} />
                <span className="text-sm font-medium text-ink">{p.city}</span>
                <span className="text-[10px] leading-snug text-taupe">{p.address}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
