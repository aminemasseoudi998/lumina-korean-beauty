import { createFileRoute } from "@tanstack/react-router";
import { Scale, Building2, Globe, Mail } from "lucide-react";
import { PageHeader, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/mentions-legales")({
  component: MentionsPage,
});

function MentionsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Mentions légales"
        title={<>Informations <span className="italic text-taupe">légales.</span></>}
        intro="Conformément à la réglementation tunisienne, voici les informations légales concernant Wglow."
      />

      <section className="mx-auto max-w-[900px] px-5 pb-24 sm:px-6 lg:px-12">
        <div className="space-y-6">
          <div className="rounded-2xl border border-ink/10 bg-cream p-6 sm:p-8">
            <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-camel-deep/10 text-camel-deep">
              <Building2 className="size-5" strokeWidth={1.5} />
            </div>
            <h2 className="mb-3 font-serif text-xl sm:text-2xl">Éditeur du site</h2>
            <div className="space-y-1 text-sm leading-relaxed text-taupe">
              <p><span className="font-medium text-ink">Wglow</span> — Cosmetics Tunisia</p>
              <p>Tunis, Tunisie</p>
              <p>Email : contact@wglow.tn</p>
            </div>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-cream p-6 sm:p-8">
            <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-camel-deep/10 text-camel-deep">
              <Scale className="size-5" strokeWidth={1.5} />
            </div>
            <h2 className="mb-3 font-serif text-xl sm:text-2xl">Propriété intellectuelle</h2>
            <p className="leading-relaxed text-taupe">
              L'ensemble des contenus présents sur le site wglow.tn (textes, images, vidéos, logos, marques) est
              protégé par le droit d'auteur et le droit des marques. Toute reproduction ou représentation,
              intégrale ou partielle, est interdite sans l'autorisation préalable de Wglow.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-cream p-6 sm:p-8">
            <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-camel-deep/10 text-camel-deep">
              <Globe className="size-5" strokeWidth={1.5} />
            </div>
            <h2 className="mb-3 font-serif text-xl sm:text-2xl">Responsabilité</h2>
            <p className="leading-relaxed text-taupe">
              Wglow s'efforce d'assurer l'exactitude des informations présentées sur son site. Nous ne
              saurions être tenus responsables des éventuelles erreurs ou omissions. Les produits présentés
              sont des cosmétiques destinés à un usage externe. En cas de réaction allergique, veuillez
              consulter un médecin.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-cream p-6 sm:p-8">
            <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-camel-deep/10 text-camel-deep">
              <Mail className="size-5" strokeWidth={1.5} />
            </div>
            <h2 className="mb-3 font-serif text-xl sm:text-2xl">Contact</h2>
            <p className="leading-relaxed text-taupe">
              Pour toute question relative aux mentions légales, vous pouvez nous contacter à l'adresse
              e-mail suivante : <span className="text-ink">contact@wglow.tn</span>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
