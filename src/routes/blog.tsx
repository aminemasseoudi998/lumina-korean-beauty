import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, PageShell } from "@/components/site/PageShell";
import { blogPosts } from "@/lib/blog";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
});

function BlogPage() {
  const [category, setCategory] = useState<string | null>(null);

  const blogCategories = useMemo(
    () => Array.from(new Set(blogPosts.map((p) => p.category))),
    [],
  );

  const visible = category ? blogPosts.filter((p) => p.category === category) : blogPosts;
  const [featured, ...rest] = visible;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Journal"
        title={
          <>
            La lettre <span className="italic text-taupe">du matin.</span>
          </>
        }
        intro="Rituels saisonniers, notes d'atelier et regards sur la science de la fermentation coréenne."
      />

      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-6 sm:pb-28 lg:px-12">
        {/* Category filter */}
        <div className="mb-12 flex flex-wrap gap-2 border-b border-ink/10 pb-8">
          <button
            onClick={() => setCategory(null)}
            className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${
              !category ? "border-camel-deep bg-camel-deep text-cream" : "border-ink/20 hover:border-camel-deep"
            }`}
          >
            Tout
          </button>
          {blogCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${
                category === c ? "border-camel-deep bg-camel-deep text-cream" : "border-ink/20 hover:border-camel-deep"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured */}
        {featured && (
        <Link
          to="/blog/$slug"
          params={{ slug: featured.slug }}
          className="group grid grid-cols-1 gap-6 border-b border-ink/10 pb-14 lg:grid-cols-2 lg:gap-12"
        >
          <div className="relative aspect-[16/11] overflow-hidden rounded-lg bg-sand outline outline-1 -outline-offset-1 outline-black/5">
            <img
              src={featured.image}
              alt={featured.title}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.24em] text-taupe">
              {featured.category} · {featured.readTime} · {featured.date}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.05] sm:text-4xl lg:text-5xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-prose leading-relaxed text-taupe">{featured.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] transition-transform group-hover:translate-x-1">
              Lire l'article →
            </span>
          </div>
        </Link>
        )}

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className="group block">
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-lg bg-sand outline outline-1 -outline-offset-1 outline-black/5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-taupe">
                {post.category} · {post.readTime}
              </p>
              <h3 className="mt-2 font-serif text-xl leading-snug sm:text-2xl">{post.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-taupe">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
