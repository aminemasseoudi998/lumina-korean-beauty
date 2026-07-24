import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { PageHeader, PageShell } from "@/components/site/PageShell";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, categoryName, products, type Availability } from "@/lib/products";

type BoutiqueSearch = {
  categorie?: string;
};

export const Route = createFileRoute("/boutique")({
  validateSearch: (search: Record<string, unknown>): BoutiqueSearch => ({
    categorie: typeof search.categorie === "string" ? search.categorie : undefined,
  }),
  component: Boutique,
});

type DispoFilter = "tous" | Availability;
type SortMode = "pertinence" | "prix-asc" | "prix-desc";

const priceBounds = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};

function Boutique() {
  const { categorie } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const [dispo, setDispo] = useState<DispoFilter>("tous");
  const [sort, setSort] = useState<SortMode>("pertinence");
  const [maxPrice, setMaxPrice] = useState<number>(priceBounds.max);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const setCategorie = (slug: string | undefined) => {
    navigate({ search: { categorie: slug }, resetScroll: false });
  };

  const dispoLabels: Record<DispoFilter, string> = {
    tous: "Toutes",
    "en-stock": "En stock",
    precommande: "En précommande",
  };

  const activeFilters = [
    categorie ? { key: "cat", label: categoryName(categorie), clear: () => setCategorie(undefined) } : null,
    dispo !== "tous" ? { key: "dispo", label: dispoLabels[dispo], clear: () => setDispo("tous") } : null,
    maxPrice < priceBounds.max
      ? { key: "price", label: `≤ ${maxPrice} DT`, clear: () => setMaxPrice(priceBounds.max) }
      : null,
  ].filter((f): f is { key: string; label: string; clear: () => void } => f !== null);

  const resetAll = () => {
    setCategorie(undefined);
    setDispo("tous");
    setMaxPrice(priceBounds.max);
    setSort("pertinence");
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (categorie && p.category !== categorie) return false;
      if (dispo !== "tous" && p.availability !== dispo) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    if (sort === "prix-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "prix-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [categorie, dispo, maxPrice, sort]);

  const chipBase =
    "rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors";

  return (
    <PageShell>
      <PageHeader
        eyebrow="La Boutique"
        title={
          <>
            Toutes nos <span className="italic">formulations.</span>
          </>
        }
        intro="Sérums, essences, crèmes et masques bio-fermentés, fabriqués en petites séries. Filtrez par catégorie, disponibilité et budget."
      />

      <div className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-6 sm:pb-28 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
          {/* Filters */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            {/* Mobile toggle */}
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="flex w-full items-center justify-between rounded-xl border border-ink/15 bg-tint px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] lg:hidden"
            >
              <span className="flex items-center gap-2.5">
                <SlidersHorizontal className="size-4 text-camel-deep" strokeWidth={1.6} />
                Filtres
                {activeFilters.length > 0 && (
                  <span className="rounded-full bg-camel-deep px-2 py-0.5 text-[10px] text-cream">
                    {activeFilters.length}
                  </span>
                )}
              </span>
              <span className="text-taupe">{filtersOpen ? "−" : "+"}</span>
            </button>

            <div
              className={`space-y-8 overflow-hidden border-ink/10 transition-all duration-500 lg:!max-h-none lg:border-0 lg:py-0 lg:opacity-100 ${
                filtersOpen ? "mt-5 max-h-[60rem] border-y py-6 opacity-100" : "max-h-0 opacity-0 lg:mt-0"
              }`}
            >
              {/* Category */}
              <div>
                <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-taupe">Catégorie</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCategorie(undefined)}
                    className={`${chipBase} ${!categorie ? "border-camel-deep bg-camel-deep text-cream" : "border-ink/20 hover:border-ink"}`}
                  >
                    Tout
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => setCategorie(c.slug)}
                      className={`${chipBase} ${categorie === c.slug ? "border-camel-deep bg-camel-deep text-cream" : "border-ink/20 hover:border-ink"}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-taupe">Disponibilité</h3>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { v: "tous", l: "Toutes" },
                      { v: "en-stock", l: "En stock" },
                      { v: "precommande", l: "En précommande" },
                    ] as { v: DispoFilter; l: string }[]
                  ).map((o) => (
                    <button
                      key={o.v}
                      onClick={() => setDispo(o.v)}
                      className={`${chipBase} ${dispo === o.v ? "border-camel-deep bg-camel-deep text-cream" : "border-ink/20 hover:border-ink"}`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-taupe">
                  Budget max · {maxPrice} DT
                </h3>
                <input
                  type="range"
                  min={priceBounds.min}
                  max={priceBounds.max}
                  step={2}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-camel-deep"
                  aria-label="Budget maximum"
                />
                <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.18em] text-taupe">
                  <span>{priceBounds.min} DT</span>
                  <span>{priceBounds.max} DT</span>
                </div>
              </div>

              {activeFilters.length > 0 && (
                <button
                  onClick={resetAll}
                  className="w-full rounded-full border border-ink/20 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors hover:bg-camel-deep hover:text-cream"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-taupe">
                {filtered.length} produit{filtered.length > 1 ? "s" : ""}
              </p>
              <label className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-taupe">
                Trier
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortMode)}
                  className="rounded-full border border-ink/20 bg-transparent px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-ink focus:outline-none focus:ring-1 focus:ring-ink"
                >
                  <option value="pertinence">Pertinence</option>
                  <option value="prix-asc">Prix croissant</option>
                  <option value="prix-desc">Prix décroissant</option>
                </select>
              </label>
            </div>

            {/* Active filter chips */}
            {activeFilters.length > 0 && (
              <div className="mb-8 flex flex-wrap items-center gap-2">
                {activeFilters.map((f) => (
                  <button
                    key={f.key}
                    onClick={f.clear}
                    className="group inline-flex items-center gap-2 rounded-full bg-tint-deep px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-champagne"
                  >
                    {f.label}
                    <X className="size-3 text-taupe transition-colors group-hover:text-ink" strokeWidth={2} />
                  </button>
                ))}
                <button
                  onClick={resetAll}
                  className="text-[10px] uppercase tracking-[0.2em] text-taupe underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  Tout effacer
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-ink/20 py-20 text-center">
                <p className="font-serif text-2xl italic">Aucun produit ne correspond.</p>
                <p className="mt-2 text-sm text-taupe">Essayez d'élargir vos filtres.</p>
                <button
                  onClick={resetAll}
                  className="mt-6 rounded-full bg-camel-deep px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-cream transition-colors hover:bg-camel-dark"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
