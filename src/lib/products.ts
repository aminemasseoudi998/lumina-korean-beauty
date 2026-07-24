import heroBottle from "@/assets/hero-bottle.jpg";
import skinGlow from "@/assets/skin-glow.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

export type Availability = "en-stock" | "precommande";

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string; // category slug
  size: string;
  price: number; // Tunisian Dinar (TND)
  oldPrice?: number; // for promotions
  image: string;
  gallery: string[];
  availability: Availability;
  tag?: string | null;
  brand: string;
  featured?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  short: string;
  description: string;
  ingredients: string[];
};

export type Brand = {
  name: string;
  origin: string;
  note: string;
};

// Popular authentic Korean beauty houses carried by Wglow.
export const brands: Brand[] = [
  { name: "COSRX", origin: "Séoul", note: "Actifs ciblés, formules épurées." },
  { name: "Beauty of Joseon", origin: "Séoul", note: "Herboristerie traditionnelle revisitée." },
  { name: "Anua", origin: "Séoul", note: "Peaux sensibles, soins apaisants." },
  { name: "SKIN1004", origin: "Séoul", note: "Centella de Madagascar." },
  { name: "Torriden", origin: "Séoul", note: "Hydratation acide hyaluronique." },
  { name: "Round Lab", origin: "Séoul", note: "Eau minérale de Dokdo." },
  { name: "Laneige", origin: "Séoul", note: "Icônes hydratantes de nuit." },
  { name: "Medicube", origin: "Séoul", note: "Soins dermo-technologiques." },
];

export const categories: Category[] = [
  { slug: "essences", name: "Essences", description: "Eaux fermentées micro-filtrées pour réveiller la peau." },
  { slug: "serums", name: "Sérums", description: "Concentrés d'actifs brevetés, ciblés et puissants." },
  { slug: "cremes", name: "Crèmes", description: "Voiles nourrissants pour un fini porcelaine." },
  { slug: "masques", name: "Masques", description: "Rituels intensifs de nuit et de récupération." },
  { slug: "brumes", name: "Brumes", description: "Fraîcheur minérale à vaporiser à tout moment." },
];

export const products: Product[] = [
  {
    slug: "essence-ferment-de-riz",
    name: "Essence Ferment de Riz",
    category: "essences",
    size: "150ml",
    price: 119,
    image: product1,
    gallery: [product1, skinGlow, heroBottle],
    availability: "en-stock",
    tag: "Best-seller",
    brand: "COSRX",
    featured: true,
    bestSeller: true,
    short: "L'essence signature, née d'une fermentation à froid de 72 heures.",
    description:
      "Notre essence emblématique concentre l'eau de riz fermentée micro-filtrée, riche en acides aminés et en minéraux. Appliquée sur peau propre, elle ouvre les canaux d'hydratation et prépare la peau à recevoir les soins suivants. La texture, à mi-chemin entre l'eau et la soie, se fond instantanément pour un teint reposé et lumineux.",
    ingredients: ["Ferment de Riz", "Niacinamide", "Acide Hyaluronique", "Sève de Bambou"],
  },
  {
    slug: "creme-petale-yeon-hwa",
    name: "Crème Pétale Yeon-hwa",
    category: "cremes",
    size: "50ml",
    price: 149,
    image: product2,
    gallery: [product2, skinGlow, product1],
    availability: "en-stock",
    tag: "Nouveau",
    brand: "Beauty of Joseon",
    featured: true,
    isNew: true,
    short: "Un voile de céramides et de camélia pour sceller la lumière.",
    description:
      "Inspirée de la fleur de lotus Yeon-hwa, cette crème enveloppe la peau d'un voile de céramides et d'huile de graine de camélia. Elle restaure la barrière hydrolipidique et scelle l'hydratation pour un fini satiné, jamais gras. Idéale en dernier geste du rituel du soir.",
    ingredients: ["Graine de Camélia", "Céramides", "Propolis Dorée", "Beurre de Karité"],
  },
  {
    slug: "brume-rosee-de-montagne",
    name: "Brume Rosée de Montagne",
    category: "brumes",
    size: "100ml",
    price: 79,
    oldPrice: 99,
    image: product3,
    gallery: [product3, skinGlow, heroBottle],
    availability: "en-stock",
    tag: "Promo",
    brand: "Round Lab",
    featured: true,
    bestSeller: true,
    short: "Une brume minérale puisée aux sources de montagne coréennes.",
    description:
      "Vaporisée à tout moment de la journée, la Brume Rosée de Montagne réhydrate instantanément et fixe le maquillage d'un voile frais. Formulée à partir d'eau minérale des sources de montagne et d'extrait d'armoise apaisante, elle calme les rougeurs et ravive l'éclat.",
    ingredients: ["Eau de Source Minérale", "Armoise Coréenne", "Panthénol"],
  },
  {
    slug: "masque-de-nuit-gyeol-go",
    name: "Masque de Nuit Gyeol-go",
    category: "masques",
    size: "75ml",
    price: 109,
    image: product4,
    gallery: [product4, skinGlow, product2],
    availability: "precommande",
    tag: "Édition Limitée",
    brand: "Laneige",
    featured: true,
    isNew: true,
    short: "Un masque dormant qui répare pendant le sommeil.",
    description:
      "Gyeol-go — « grain parfait » en coréen. Ce masque de nuit dépose un film respirant qui travaille pendant votre sommeil : les saponines de ginseng réparent, l'acide hyaluronique repulpe. Au réveil, la peau est lissée, rebondie et infiniment douce. Rincez ou laissez pénétrer.",
    ingredients: ["Racine de Ginseng", "Acide Hyaluronique", "Miel de Manuka", "Adenosine"],
  },
  {
    slug: "serum-ginseng-eclat",
    name: "Sérum Ginseng Éclat",
    category: "serums",
    size: "30ml",
    price: 165,
    image: skinGlow,
    gallery: [skinGlow, product1, heroBottle],
    availability: "en-stock",
    tag: null,
    brand: "Beauty of Joseon",
    featured: false,
    bestSeller: true,
    short: "Un concentré de saponines de ginseng pour raffermir et illuminer.",
    description:
      "Ce sérum haute intensité délivre une concentration record de saponines de ginseng cultivé six ans. Il stimule l'éclat, raffermit les traits et unifie le teint jour après jour. Quelques gouttes suffisent, matin et soir, avant la crème.",
    ingredients: ["Ginseng 6 ans", "Vitamine C stabilisée", "Peptides", "Ferment de Riz"],
  },
  {
    slug: "essence-bambou-apaisante",
    name: "Essence Bambou Apaisante",
    category: "essences",
    size: "120ml",
    price: 95,
    image: heroBottle,
    gallery: [heroBottle, skinGlow, product3],
    availability: "en-stock",
    tag: null,
    brand: "Anua",
    featured: false,
    isNew: true,
    short: "Une essence légère à la sève de bambou pour les peaux réactives.",
    description:
      "Formulée pour les peaux sensibles, cette essence apaise et hydrate grâce à la sève de bambou et à l'armoise coréenne. Sa texture fluide pénètre sans résidu et renforce la tolérance cutanée au fil des applications.",
    ingredients: ["Sève de Bambou", "Armoise Coréenne", "Allantoïne"],
  },
  {
    slug: "creme-riche-hiver",
    name: "Crème Riche d'Hiver",
    category: "cremes",
    size: "50ml",
    price: 135,
    oldPrice: 159,
    image: product2,
    gallery: [product2, product4, skinGlow],
    availability: "precommande",
    tag: "Promo",
    brand: "Torriden",
    featured: false,
    isNew: true,
    short: "Une crème riche pour nourrir intensément les peaux desséchées.",
    description:
      "Pensée pour les saisons froides, cette crème riche restaure le confort des peaux tiraillées. Beurre de karité, céramides et propolis dorée forment un bouclier nourrissant qui protège du vent et du froid.",
    ingredients: ["Beurre de Karité", "Céramides", "Propolis Dorée", "Squalane"],
  },
  {
    slug: "masque-purifiant-argile",
    name: "Masque Purifiant Argile",
    category: "masques",
    size: "100ml",
    price: 59,
    image: product3,
    gallery: [product3, product1, skinGlow],
    availability: "en-stock",
    tag: null,
    brand: "SKIN1004",
    featured: false,
    bestSeller: true,
    short: "Un masque à l'argile blanche pour désincruster en douceur.",
    description:
      "Ce masque à l'argile blanche de Corée absorbe l'excès de sébum et affine le grain de peau sans dessécher. Enrichi de charbon de bambou, il laisse une peau nette, mate et respirée. À utiliser une à deux fois par semaine.",
    ingredients: ["Argile Blanche", "Charbon de Bambou", "Thé Vert"],
  },
];

// Tunisian Dinar with millimes (3 decimals) — e.g. 119 → "119,000 DT"
export function formatPrice(value: number): string {
  return `${value.toFixed(3).replace(".", ",")} DT`;
}

export function discountPercent(product: Product): number {
  if (!product.oldPrice || product.oldPrice <= product.price) return 0;
  return Math.round((1 - product.price / product.oldPrice) * 100);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function categoryName(slug: string): string {
  return getCategory(slug)?.name ?? slug;
}

export const featuredProducts = products.filter((p) => p.featured);
export const promoProducts = products.filter((p) => p.oldPrice);
export const bestSellers = products.filter((p) => p.bestSeller);
export const newArrivals = products.filter((p) => p.isNew);

export const availabilityLabel: Record<Availability, string> = {
  "en-stock": "En stock",
  precommande: "En précommande",
};
