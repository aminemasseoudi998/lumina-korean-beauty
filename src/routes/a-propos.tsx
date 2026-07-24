import { createFileRoute, Link } from "@tanstack/react-router";
import skinGlow from "@/assets/skin-glow.jpg";
import heroBottle from "@/assets/hero-bottle.jpg";
import { PageHeader, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/a-propos")({
  component: AboutPage,
});

const values = [
  { n: "01", title: "Fermentation lente", body: "72 heures de fermentation à froid pour des actifs puissants et biocompatibles." },
  { n: "02", title: "Petites séries", body: "Fabriqué en micro-lots dans nos ateliers de Séoul pour une fraîcheur maximale." },
  { n: "03", title: "Clean & vegan", body: "Cruelty-free, vegan et éco-conçu, du flacon rechargeable au packaging." },
  { n: "04", title: "Transparence", body: "Chaque formule affiche ses actifs clés et leur concentration réelle." },
];

const timeline = [
  { year: "2019", text: "Premiers essais de fermentation dans un atelier de Séoul." },
  { year: "2021", text: "Mise au point de l'essence signature au ferment de riz." },
  { year: "2024", text: "Lancement de Wglow entre Séoul et Paris." },
  { year: "Aujourd'hui", text: "Une communauté grandissante en quête de lumière." },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="La Maison"
        title={
          <>
            La lumière, <span className="italic text-taupe">patiemment cultivée.</span>
          </>
        }
        intro="Wglow est né d'une conviction simple : la plus belle peau se révèle avec le temps. Nous marions l'apothicairerie coréenne et la science dermatologique moderne."
      />

      {/* Intro image + text */}
      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-6 sm:py-14 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sand outline outline-1 -outline-offset-1 outline-black/5">
            <img src={skinGlow} alt="Rituel de soin Wglow" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h2 className="mb-6 font-serif text-3xl font-medium leading-[1.05] sm:text-4xl lg:text-5xl">
              De Séoul à Paris, un même souffle.
            </h2>
            <div className="space-y-4 leading-relaxed text-taupe">
              <p>
                Fondée par une équipe de formulateurs passionnés, notre maison puise dans les rituels de
                porcelaine de la dynastie Joseon pour créer des soins d'une douceur rare.
              </p>
              <p>
                Chaque texture est pensée comme un geste : une chorégraphie lente qui transforme la routine
                quotidienne en un moment suspendu.
              </p>
              <p>
                Nous croyons au pouvoir de la patience — celle de la fermentation, celle de la peau qui se
                répare, celle d'une beauté qui n'a rien à prouver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand/50 py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-12">
          <h2 className="mb-12 font-serif text-3xl font-medium leading-[1] sm:text-5xl">Nos engagements.</h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.n} className="border-t border-ink/15 pt-6">
                <span className="font-serif text-5xl italic text-ink/20">{v.n}</span>
                <h3 className="mt-4 font-serif text-xl">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-taupe">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-6 sm:py-28 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sand outline outline-1 -outline-offset-1 outline-black/5 lg:order-last">
            <img src={heroBottle} alt="Flacon Wglow" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h2 className="mb-10 font-serif text-3xl font-medium leading-[1] sm:text-5xl">Notre histoire.</h2>
            <ol className="space-y-8">
              {timeline.map((t) => (
                <li key={t.year} className="flex gap-6 border-l border-ink/15 pl-6">
                  <div>
                    <p className="font-serif text-2xl italic">{t.year}</p>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-taupe">{t.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-6 lg:px-12">
        <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl border border-camel/30 bg-tint-deep px-6 py-16 text-center text-ink sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: "radial-gradient(50% 60% at 50% 0%, rgba(200,177,141,0.35), transparent 70%)" }}
          />
          <h2 className="relative max-w-[20ch] font-serif text-3xl font-medium italic leading-[1.05] sm:text-5xl">
            Commencez votre rituel de lumière.
          </h2>
          <Link
            to="/boutique"
            className="relative rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
          >
            Explorer la boutique
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
