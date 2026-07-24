import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { ProductCard } from "@/components/site/ProductCard";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/favoris")({
  component: FavorisPage,
});

function FavorisPage() {
  const { products, count, clear } = useFavorites();

  if (count === 0) {
    return (
      <PageShell>
        <div className="mx-auto flex max-w-[1400px] flex-col items-center px-5 py-28 text-center sm:px-6 sm:py-40">
          <span className="mb-6 flex size-16 items-center justify-center rounded-full bg-tint-deep">
            <Heart className="size-7 text-camel-deep" strokeWidth={1.5} />
          </span>
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe">Mes favoris</p>
          <h1 className="font-serif text-4xl italic sm:text-6xl">Votre liste est vide.</h1>
          <p className="mt-5 max-w-[42ch] leading-relaxed text-taupe">
            Parcourez la boutique et touchez le cœur pour sauvegarder vos coups de cœur ici.
          </p>
          <Link
            to="/boutique"
            className="mt-8 rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
          >
            Explorer la boutique
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28 lg:px-12">
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-taupe">Mes favoris</p>
            <h1 className="font-serif text-4xl font-medium leading-[0.98] sm:text-6xl">
              Vos coups de cœur <span className="italic text-taupe">({count})</span>
            </h1>
          </div>
          <button
            onClick={clear}
            className="hidden text-[10px] uppercase tracking-[0.24em] text-taupe transition-colors hover:text-ink sm:block"
          >
            Tout retirer
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
