import skinGlow from "@/assets/skin-glow.jpg";
import heroBottle from "@/assets/hero-bottle.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "geste-du-soir",
    title: "Le geste du soir, revisité",
    category: "Rituel",
    readTime: "04 min",
    date: "12 juin 2024",
    excerpt:
      "Comment transformer votre routine du soir en un moment de décompression complète, geste après geste.",
    image: product2,
    body: [
      "Le soir, la peau entre dans sa phase de réparation. C'est le moment idéal pour déposer les actifs les plus riches et laisser le sommeil faire le reste.",
      "Commencez par un double nettoyage : une huile de camélia pour dissoudre le maquillage et la pollution, puis un nettoyant doux à l'eau de riz. La peau est nette, jamais tiraillée.",
      "Appliquez ensuite l'essence en la pressant délicatement du bout des doigts. Terminez par le masque de nuit, en fine couche, pour sceller l'hydratation jusqu'au matin.",
      "Ce rituel ne prend que quelques minutes, mais il change tout : la peau se réveille repulpée, lissée et lumineuse.",
    ],
  },
  {
    slug: "ateliers-fermentation",
    title: "Dans nos ateliers de fermentation",
    category: "Atelier",
    readTime: "06 min",
    date: "28 mai 2024",
    excerpt:
      "Plongée au cœur de nos ateliers de Séoul, là où le temps devient un ingrédient à part entière.",
    image: product3,
    body: [
      "La fermentation est un art ancestral en Corée. Nous l'avons adaptée au soin de la peau, en cultivant nos ferments dans de petites cuves de céramique.",
      "Pendant 72 heures, à basse température, les micro-organismes transforment l'eau de riz en un concentré d'acides aminés et de minéraux parfaitement assimilables.",
      "Ce procédé lent garantit des actifs stables, puissants et respectueux de la barrière cutanée. Rien n'est précipité : chaque lot est goûté, mesuré, validé.",
      "C'est cette patience que vous retrouvez dans chaque flacon — une lumière qui se cultive, jour après jour.",
    ],
  },
  {
    slug: "comprendre-fermentation",
    title: "Pourquoi la fermentation change tout",
    category: "Science",
    readTime: "05 min",
    date: "10 mai 2024",
    excerpt:
      "Acides aminés, peptides, biodisponibilité : ce que la fermentation apporte réellement à votre peau.",
    image: skinGlow,
    body: [
      "La fermentation décompose les molécules en fragments plus petits, plus facilement absorbés par la peau. On parle de biodisponibilité accrue.",
      "Elle génère aussi de nouveaux composés bénéfiques : peptides, antioxydants et acides aminés qui n'existaient pas dans la matière première.",
      "Résultat : des soins mieux tolérés, plus efficaces, et une peau renforcée dans le temps.",
    ],
  },
  {
    slug: "routine-minimaliste",
    title: "La routine minimaliste qui fonctionne",
    category: "Rituel",
    readTime: "03 min",
    date: "22 avril 2024",
    excerpt: "Trois gestes essentiels pour une peau lumineuse, sans surcharger votre salle de bain.",
    image: product1,
    body: [
      "Moins, mais mieux. Une essence, un sérum ciblé et une crème protectrice suffisent à couvrir l'essentiel des besoins de la peau.",
      "L'important n'est pas le nombre de produits, mais la régularité et la qualité des formules. La constance est le vrai secret de l'éclat.",
      "Écoutez votre peau et ajustez selon les saisons : plus riche en hiver, plus légère en été.",
    ],
  },
  {
    slug: "lumiere-du-matin",
    title: "Protéger la lumière du matin",
    category: "Conseil",
    readTime: "04 min",
    date: "05 avril 2024",
    excerpt: "Le rôle clé de l'hydratation et de la protection dès les premières heures de la journée.",
    image: heroBottle,
    body: [
      "Le matin, la peau a besoin d'être hydratée et protégée. Une brume minérale suivie d'une crème légère prépare le teint pour la journée.",
      "N'oubliez jamais la protection solaire : c'est le geste anti-âge le plus efficace, toutes saisons confondues.",
      "Une peau bien hydratée reflète mieux la lumière — c'est là que naît l'éclat naturel.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
