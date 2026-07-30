import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Shield, Lightbulb, HeartHandshake } from "lucide-react";
import skinGlow from "@/assets/skin-glow.jpg";
import product1 from "@/assets/product-1.jpg";
import { PageHeader, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/a-propos")({
  component: AboutPage,
});

const brandValues = [
  {
    icon: Shield,
    title: "Authenticité",
    body: "La confiance est notre priorité absolue. Nous garantissons que chaque produit proposé sur notre site est 100% original, importé directement des marques coréennes les plus réputées. Fini les doutes sur la contrefaçon.",
  },
  {
    icon: HeartHandshake,
    title: "Expertise & Conseil",
    body: "Nous savons que chaque peau est unique. C'est pourquoi nous offrons un suivi personnalisé pour guider nos clientes vers les produits qui correspondent parfaitement à leurs besoins (anti-âge, éclat, hydratation).",
  },
  {
    icon: Sparkles,
    title: "Résultats visibles",
    body: "Nous privilégions l'efficacité. Nos sélections se concentrent sur des ingrédients prouvés (Centella Asiatica, Mucus d'escargot, Ginseng) qui apportent des améliorations réelles à la texture et à la luminosité de la peau.",
  },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Qui sommes-nous"
        title={
          <>
            La beauté coréenne, <span className="italic text-taupe">authentiquement tunisienne.</span>
          </>
        }
        intro="Wglow est née d'un constat simple : les femmes tunisiennes méritent ce qu'il y a de mieux pour leur peau."
      />

      {/* Notre Histoire */}
      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-6 sm:py-16 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand outline outline-1 -outline-offset-1 outline-black/5">
            <img src={skinGlow} alt="Rituel de soin Wglow" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-camel-deep sm:tracking-[0.4em]">
              <span className="h-px w-8 bg-camel" />
              Notre histoire
            </p>
            <h2 className="mb-6 font-serif text-3xl font-medium leading-[1.05] sm:text-4xl lg:text-5xl">
              Une passion née <span className="italic text-taupe">d'un vide.</span>
            </h2>
            <div className="space-y-5 leading-relaxed text-taupe">
              <p>
                Wglow est née d'un constat simple : les femmes tunisiennes méritent ce qu'il y a de
                mieux pour leur peau. Face à la difficulté de trouver des produits de soin fiables et
                originaux en Tunisie, nous avons créé Wglow pour combler ce vide.
              </p>
              <p>
                Plus qu'une simple boutique en ligne, Wglow est le fruit d'une passion pour
                l'excellence cosmétique coréenne. Nous nous engageons à importer directement
                l'authenticité de Séoul jusqu'à chez vous, en brisant les barrières de la distance
                pour offrir des routines de soins qui transforment véritablement la peau.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Mission — full-width banner */}
      <section className="relative overflow-hidden bg-sand/50 py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 h-[400px] w-[400px] rounded-full bg-camel/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-[300px] w-[300px] rounded-full bg-champagne/50 blur-3xl"
        />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-last">
              <div className="relative mx-auto aspect-square max-w-xs overflow-hidden rounded-2xl bg-sand outline outline-1 -outline-offset-1 outline-black/5 lg:max-w-sm">
                <img src={product1} alt="Soin Wglow" className="h-full w-full object-cover" loading="lazy" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
              </div>
            </div>
            <div>
              <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-camel-deep sm:tracking-[0.4em]">
                <span className="h-px w-8 bg-camel" />
                Notre mission
              </p>
              <h2 className="mb-6 font-serif text-3xl font-medium leading-[1.05] sm:text-4xl lg:text-5xl">
                Accompagner chaque femme <span className="italic text-taupe">vers sa meilleure peau.</span>
              </h2>
              <p className="max-w-lg leading-relaxed text-taupe">
                Notre mission est d'accompagner chaque femme, en particulier celles qui cherchent à
                préserver la jeunesse et l'éclat de leur peau, vers une routine de soin simple et
                efficace.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-camel-deep/10 px-4 py-2 text-xs font-medium text-camel-deep">
                  Anti-âge
                </span>
                <span className="rounded-full bg-camel-deep/10 px-4 py-2 text-xs font-medium text-camel-deep">
                  Hydratation
                </span>
                <span className="rounded-full bg-camel-deep/10 px-4 py-2 text-xs font-medium text-camel-deep">
                  Éclat
                </span>
                <span className="rounded-full bg-camel-deep/10 px-4 py-2 text-xs font-medium text-camel-deep">
                  Peaux sensibles
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs de la marque */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-6 sm:py-28 lg:px-12">
        <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-camel-deep sm:tracking-[0.4em]">
          <span className="h-px w-8 bg-camel" />
          Valeurs de la marque
        </p>
        <h2 className="mb-12 font-serif text-3xl font-medium leading-[1] sm:text-5xl">
          Ce qui nous <span className="italic text-taupe">définit.</span>
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brandValues.map((v) => (
            <div
              key={v.title}
              className="group rounded-2xl border border-ink/10 bg-cream p-6 transition-all hover:-translate-y-1 hover:border-camel/40 hover:shadow-lg sm:p-8"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-camel-deep/10 text-camel-deep transition-colors group-hover:bg-camel-deep group-hover:text-cream sm:size-14">
                <v.icon className="size-5 sm:size-6" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 font-serif text-xl sm:text-2xl">{v.title}</h3>
              <p className="text-sm leading-relaxed text-taupe">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(200,177,141,0.12), transparent 50%, rgba(120,102,70,0.08))" }}
        />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 flex items-center justify-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-camel-deep sm:tracking-[0.4em]">
              <span className="h-px w-8 bg-camel" />
              Pourquoi nous choisir ?
            </p>
            <h2 className="mb-6 font-serif text-3xl font-medium leading-[1.05] sm:text-4xl lg:text-5xl">
              Une expertise <span className="italic text-taupe">qui fait la différence.</span>
            </h2>
            <p className="mx-auto max-w-2xl leading-relaxed text-taupe">
              Nous ne vendons pas seulement des produits ; nous offrons une expertise. Contre les
              signes de l'âge, l'acné ou les taches brunes, nous sélectionnons rigoureusement des
              formules douces mais puissantes. Notre objectif est de démocratiser l'accès à la K-Beauty
              authentique en Tunisie, en garantissant transparence et résultats visibles.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            <div className="rounded-xl border border-ink/10 bg-cream/80 p-5 text-center backdrop-blur-sm sm:p-6">
              <span className="font-serif text-4xl italic text-camel-deep sm:text-5xl">100%</span>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-taupe">Produits originaux</p>
            </div>
            <div className="rounded-xl border border-ink/10 bg-cream/80 p-5 text-center backdrop-blur-sm sm:p-6">
              <span className="font-serif text-4xl italic text-camel-deep sm:text-5xl">Livraison</span>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-taupe">Partout en Tunisie</p>
            </div>
            <div className="rounded-xl border border-ink/10 bg-cream/80 p-5 text-center backdrop-blur-sm sm:p-6">
              <span className="font-serif text-4xl italic text-camel-deep sm:text-5xl">Conseils</span>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-taupe">Suivi personnalisé</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/boutique"
              className="inline-flex items-center gap-3 rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
            >
              Découvrir nos produits
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
