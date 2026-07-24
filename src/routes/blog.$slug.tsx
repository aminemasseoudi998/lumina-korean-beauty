import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { blogPosts, getPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <PageShell>
        <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-32 text-center sm:px-6">
          <h1 className="font-serif text-4xl italic sm:text-5xl">Article introuvable</h1>
          <p className="mt-4 text-taupe">Cet article n'existe pas ou a été déplacé.</p>
          <Link
            to="/blog"
            className="mt-8 rounded-full bg-camel-deep px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-camel-dark"
          >
            Retour au journal
          </Link>
        </div>
      </PageShell>
    );
  }

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 pt-12 pb-16 sm:px-6 sm:pt-16">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-taupe">
          <Link to="/" className="hover:text-ink">Accueil</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-ink">Journal</Link>
        </nav>

        <p className="mt-8 text-[10px] uppercase tracking-[0.24em] text-taupe">
          {post.category} · {post.readTime} · {post.date}
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium italic leading-[1.02] sm:text-5xl lg:text-6xl">
          {post.title}
        </h1>

        <div className="mt-10 aspect-[16/10] overflow-hidden rounded-lg bg-sand outline outline-1 -outline-offset-1 outline-black/5">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
        </div>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/80">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-12 border-t border-ink/10 pt-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-taupe transition-colors hover:text-ink">
            ← Tous les articles
          </Link>
        </div>
      </article>

      {/* More posts */}
      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-6 sm:pb-28 lg:px-12">
        <div className="border-t border-ink/10 pt-14">
          <h2 className="mb-10 font-serif text-3xl italic sm:text-4xl">À lire aussi</h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-lg bg-sand outline outline-1 -outline-offset-1 outline-black/5">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-taupe">{p.category} · {p.readTime}</p>
                <h3 className="mt-2 font-serif text-xl leading-snug">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
