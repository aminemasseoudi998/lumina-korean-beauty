import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { _setLiveProducts, seedProducts, type Product } from "@/lib/products";

type ProductsContextValue = {
  products: Product[];
  ready: boolean;
  bestSellers: Product[];
  newArrivals: Product[];
  promoProducts: Product[];
  featuredProducts: Product[];
  getBySlug: (slug: string) => Product | undefined;
  byCategory: (slug: string) => Product[];
  addProduct: (product: Product) => { ok: boolean; error?: string };
  updateProduct: (slug: string, patch: Partial<Product>) => void;
  removeProduct: (slug: string) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

const STORAGE_KEY = "wglow-products";

function readStorage(): Product[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Product[]) : null;
  } catch {
    return null;
  }
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  // Start from the seed (matches SSR); hydrate any admin edits after mount.
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStorage();
    if (stored) {
      setProducts(stored);
      _setLiveProducts(stored);
    }
    setReady(true);
  }, []);

  // Persist + keep the non-React registry in sync on every change.
  const commit = useCallback((next: Product[]) => {
    setProducts(next);
    _setLiveProducts(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const addProduct = useCallback<ProductsContextValue["addProduct"]>(
    (product) => {
      if (products.some((p) => p.slug === product.slug)) {
        return { ok: false, error: "Un produit avec ce slug existe déjà." };
      }
      commit([product, ...products]);
      return { ok: true };
    },
    [products, commit],
  );

  const updateProduct = useCallback<ProductsContextValue["updateProduct"]>(
    (slug, patch) => {
      commit(products.map((p) => (p.slug === slug ? { ...p, ...patch } : p)));
    },
    [products, commit],
  );

  const removeProduct = useCallback<ProductsContextValue["removeProduct"]>(
    (slug) => {
      commit(products.filter((p) => p.slug !== slug));
    },
    [products, commit],
  );

  const value = useMemo<ProductsContextValue>(
    () => ({
      products,
      ready,
      bestSellers: products.filter((p) => p.bestSeller),
      newArrivals: products.filter((p) => p.isNew),
      promoProducts: products.filter((p) => p.oldPrice),
      featuredProducts: products.filter((p) => p.featured),
      getBySlug: (slug) => products.find((p) => p.slug === slug),
      byCategory: (slug) => products.filter((p) => p.category === slug),
      addProduct,
      updateProduct,
      removeProduct,
    }),
    [products, ready, addProduct, updateProduct, removeProduct],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts(): ProductsContextValue {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within a ProductsProvider");
  return ctx;
}
