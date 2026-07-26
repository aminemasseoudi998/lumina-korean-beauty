import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { useProducts } from "@/lib/products-store";
import {
  assetImages,
  availabilityLabel,
  categories,
  categoryName,
  formatPrice,
  type Availability,
  type Product,
} from "@/lib/products";

export const Route = createFileRoute("/admin/produits")({
  component: AdminProducts,
});

function slugify(v: string) {
  return v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Draft = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  size: string;
  price: string;
  oldPrice: string;
  availability: Availability;
  tag: string;
  image: string;
  short: string;
  description: string;
  ingredients: string;
  featured: boolean;
  bestSeller: boolean;
  isNew: boolean;
};

const emptyDraft: Draft = {
  slug: "",
  name: "",
  brand: "",
  category: categories[0].slug,
  size: "",
  price: "",
  oldPrice: "",
  availability: "en-stock",
  tag: "",
  image: assetImages[0].src,
  short: "",
  description: "",
  ingredients: "",
  featured: false,
  bestSeller: false,
  isNew: false,
};

function toDraft(p: Product): Draft {
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    size: p.size,
    price: String(p.price),
    oldPrice: p.oldPrice ? String(p.oldPrice) : "",
    availability: p.availability,
    tag: p.tag ?? "",
    image: p.image,
    short: p.short,
    description: p.description,
    ingredients: p.ingredients.join(", "),
    featured: !!p.featured,
    bestSeller: !!p.bestSeller,
    isNew: !!p.isNew,
  };
}

const fieldClass =
  "w-full rounded-md border border-ink/15 bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-taupe/50 focus:border-camel-deep focus:outline-none focus:ring-1 focus:ring-camel-deep";
const labelClass = "mb-1 block text-[10px] font-medium uppercase tracking-[0.18em] text-taupe";

function AdminProducts() {
  const { products, addProduct, updateProduct, removeProduct } = useProducts();
  const [editingSlug, setEditingSlug] = useState<string | null>(null); // slug being edited, or "" for new, or null closed
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [error, setError] = useState<string | null>(null);

  const openNew = () => {
    setDraft(emptyDraft);
    setEditingSlug("");
    setError(null);
  };
  const openEdit = (p: Product) => {
    setDraft(toDraft(p));
    setEditingSlug(p.slug);
    setError(null);
  };
  const close = () => setEditingSlug(null);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const price = Number(draft.price);
    if (!draft.name.trim() || Number.isNaN(price) || price <= 0) {
      setError("Nom et prix valides requis.");
      return;
    }
    const slug = (draft.slug.trim() || slugify(draft.name)) as string;
    const existing = editingSlug ? products.find((p) => p.slug === editingSlug) : undefined;
    const product: Product = {
      slug,
      name: draft.name.trim(),
      brand: draft.brand.trim() || "Wglow",
      category: draft.category,
      size: draft.size.trim() || "—",
      price,
      oldPrice: draft.oldPrice ? Number(draft.oldPrice) : undefined,
      image: draft.image,
      gallery: existing ? existing.gallery : [draft.image],
      availability: draft.availability,
      tag: draft.tag.trim() || null,
      featured: draft.featured,
      bestSeller: draft.bestSeller,
      isNew: draft.isNew,
      short: draft.short.trim(),
      description: draft.description.trim(),
      ingredients: draft.ingredients.split(",").map((s) => s.trim()).filter(Boolean),
    };

    if (editingSlug) {
      updateProduct(editingSlug, product);
    } else {
      const res = addProduct(product);
      if (!res.ok) {
        setError(res.error ?? "Erreur.");
        return;
      }
    }
    close();
  };

  const handleDelete = (p: Product) => {
    if (window.confirm(`Supprimer « ${p.name} » ?`)) removeProduct(p.slug);
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Catalogue"
        title={<>Produits ({products.length})</>}
        action={
          <button
            onClick={openNew}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-camel-deep px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark sm:px-5"
          >
            <Plus className="size-4" strokeWidth={2} /> <span className="hidden sm:inline">Ajouter</span>
          </button>
        }
      />

      {/* Editor */}
      {editingSlug !== null && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-ink/10 bg-cream p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-xl italic">{editingSlug ? "Modifier le produit" : "Nouveau produit"}</h2>
            <button type="button" onClick={close} aria-label="Fermer" className="flex size-8 items-center justify-center rounded-lg text-taupe hover:bg-tint">
              <X className="size-5" strokeWidth={1.7} />
            </button>
          </div>
          {error && <p className="mb-4 rounded-md bg-[#f2dede] px-4 py-2.5 text-xs text-[#8a3a3a]">{error}</p>}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Nom</label>
              <input className={fieldClass} value={draft.name} onChange={(e) => set("name", e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>Marque</label>
              <input className={fieldClass} value={draft.brand} onChange={(e) => set("brand", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Catégorie</label>
              <select className={fieldClass} value={draft.category} onChange={(e) => set("category", e.target.value)}>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Disponibilité</label>
              <select
                className={fieldClass}
                value={draft.availability}
                onChange={(e) => set("availability", e.target.value as Availability)}
              >
                <option value="en-stock">En stock</option>
                <option value="precommande">En précommande (à venir)</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Contenance</label>
              <input className={fieldClass} value={draft.size} onChange={(e) => set("size", e.target.value)} placeholder="50ml" />
            </div>
            <div>
              <label className={labelClass}>Étiquette (optionnel)</label>
              <input className={fieldClass} value={draft.tag} onChange={(e) => set("tag", e.target.value)} placeholder="Nouveau, Promo…" />
            </div>
            <div>
              <label className={labelClass}>Prix (DT)</label>
              <input type="number" min="0" step="1" className={fieldClass} value={draft.price} onChange={(e) => set("price", e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>Ancien prix (promo, optionnel)</label>
              <input type="number" min="0" step="1" className={fieldClass} value={draft.oldPrice} onChange={(e) => set("oldPrice", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Image</label>
              <div className="flex flex-wrap gap-2">
                {assetImages.map((img) => (
                  <button
                    type="button"
                    key={img.src}
                    onClick={() => set("image", img.src)}
                    className={`size-14 overflow-hidden rounded-lg ring-2 transition ${draft.image === img.src ? "ring-camel-deep" : "ring-transparent hover:ring-ink/20"}`}
                    aria-label={img.label}
                  >
                    <img src={img.src} alt={img.label} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Accroche courte</label>
              <input className={fieldClass} value={draft.short} onChange={(e) => set("short", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea rows={3} className={fieldClass} value={draft.description} onChange={(e) => set("description", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Actifs clés (séparés par des virgules)</label>
              <input className={fieldClass} value={draft.ingredients} onChange={(e) => set("ingredients", e.target.value)} placeholder="Niacinamide, Ferment de Riz…" />
            </div>
            <div className="flex flex-wrap gap-4 sm:col-span-2">
              {([
                ["featured", "En vedette"],
                ["bestSeller", "Best-seller"],
                ["isNew", "Nouveauté"],
              ] as [keyof Draft, string][]).map(([k, lbl]) => (
                <label key={k} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-camel-deep" checked={draft[k] as boolean} onChange={(e) => set(k, e.target.checked as never)} />
                  {lbl}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button type="submit" className="rounded-full bg-camel-deep px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark">
              {editingSlug ? "Enregistrer" : "Créer le produit"}
            </button>
            <button type="button" onClick={close} className="rounded-full border border-ink/20 px-6 py-2.5 text-sm font-medium hover:bg-tint">
              Annuler
            </button>
          </div>
        </form>
      )}

      {/* Product list */}
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream">
        {products.length === 0 ? (
          <p className="py-16 text-center text-sm text-taupe">Aucun produit.</p>
        ) : (
          <ul className="divide-y divide-ink/10">
            {products.map((p) => (
              <li key={p.slug} className="flex items-center gap-4 p-3 transition-colors hover:bg-tint sm:p-4">
                <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-tint">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="truncate text-[11px] text-taupe">
                    {p.brand} · {categoryName(p.category)} · {formatPrice(p.price)}
                  </p>
                </div>
                <span
                  className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium sm:inline ${
                    p.availability === "en-stock" ? "bg-[#dfece2] text-[#2f6a41]" : "bg-tint-deep text-camel-deep"
                  }`}
                >
                  {availabilityLabel[p.availability]}
                </span>
                <div className="flex shrink-0 gap-1">
                  <button onClick={() => openEdit(p)} aria-label="Modifier" className="flex size-9 items-center justify-center rounded-lg text-taupe hover:bg-tint hover:text-ink">
                    <Pencil className="size-4" strokeWidth={1.7} />
                  </button>
                  <button onClick={() => handleDelete(p)} aria-label="Supprimer" className="flex size-9 items-center justify-center rounded-lg text-taupe hover:bg-[#f2dede] hover:text-[#8a3a3a]">
                    <Trash2 className="size-4" strokeWidth={1.7} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
