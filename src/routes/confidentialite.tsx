import { createFileRoute } from "@tanstack/react-router";
import { Shield, Eye, Lock, FileText } from "lucide-react";
import { PageHeader, PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/confidentialite")({
  component: ConfidentialitePage,
});

const sections = [
  {
    icon: Eye,
    title: "Données collectées",
    body: "Nous collectons uniquement les informations nécessaires au traitement de vos commandes : nom, prénom, adresse de livraison, adresse e-mail et numéro de téléphone. Ces données sont recueillies avec votre consentement lors de la création de votre compte ou de la passation d'une commande.",
  },
  {
    icon: Lock,
    title: "Sécurité des données",
    body: "Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir la sécurité de vos données personnelles. Vos informations de paiement sont cryptées et jamais stockées sur nos serveurs.",
  },
  {
    icon: Shield,
    title: "Utilisation des données",
    body: "Vos données sont utilisées exclusivement pour le traitement de vos commandes, la gestion de votre compte client et, avec votre accord, pour l'envoi de nos communications commerciales. Nous ne revendons jamais vos données à des tiers.",
  },
  {
    icon: FileText,
    title: "Vos droits",
    body: "Conformément à la réglementation tunisienne sur la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez-nous à contact@wglow.tn.",
  },
];

function ConfidentialitePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Confidentialité"
        title={<>Votre vie privée, <span className="italic text-taupe">notre priorité.</span></>}
        intro="Nous attachons une importance capitale à la protection de vos données personnelles. Découvrez comment nous les collectons, utilisons et protégeons."
      />

      <section className="mx-auto max-w-[900px] px-5 pb-24 sm:px-6 lg:px-12">
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title} className="rounded-2xl border border-ink/10 bg-cream p-6 sm:p-8">
              <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-camel-deep/10 text-camel-deep sm:size-12">
                <s.icon className="size-5" strokeWidth={1.5} />
              </div>
              <h2 className="mb-3 font-serif text-xl sm:text-2xl">{s.title}</h2>
              <p className="leading-relaxed text-taupe">{s.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-taupe">
          Dernière mise à jour : juillet 2026
        </p>
      </section>
    </PageShell>
  );
}
