import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useFavorites } from "@/lib/favorites";
import { useAuth } from "@/lib/auth";
import logo from "@/assets/logo.png";

export const BRAND = "Wglow";

const navLinks = [
  { to: "/boutique", label: "Boutique" },
  { to: "/a-propos", label: "Maison" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const { count: favCount } = useFavorites();
  const { user } = useAuth();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-tint-deep text-ink">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-2 px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.24em]">
          <span className="hidden text-camel-deep sm:inline">✦</span>
          <span>Livraison 24h en Tunisie</span>
          <span className="text-camel-deep/60">·</span>
          <span>Paiement à la livraison</span>
          <span className="hidden text-camel-deep/60 sm:inline">·</span>
          <span className="hidden sm:inline">100% authentique</span>
          <span className="hidden text-camel-deep sm:inline">✦</span>
        </div>
      </div>

      <nav className="sticky top-0 z-50 border-b border-ink/5 bg-cream/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-6 lg:px-12">
        <Link to="/" className="flex items-center" aria-label={BRAND}>
          <img src={logo} alt={BRAND} className="h-11 w-auto sm:h-12" />
        </Link>

        <div className="hidden gap-8 text-xs uppercase tracking-[0.24em] md:flex lg:gap-10">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative transition-colors hover:text-taupe [&.active]:text-taupe"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3.5 sm:gap-5">
          <Link
            to="/connexion"
            aria-label="Mon compte"
            className="hidden items-center gap-2 transition-colors hover:text-taupe sm:flex"
          >
            <User className="size-5" strokeWidth={1.6} />
            <span className="text-xs uppercase tracking-[0.2em]">{user ? user.firstName : "Compte"}</span>
          </Link>

          <Link
            to="/favoris"
            aria-label="Mes favoris"
            className="relative transition-colors hover:text-taupe"
          >
            <Heart className="size-5" strokeWidth={1.6} />
            {favCount > 0 && (
              <span className="absolute -right-2 -top-2 flex min-w-4 items-center justify-center rounded-full bg-camel-deep px-1 text-[9px] font-medium leading-4 text-cream">
                {favCount}
              </span>
            )}
          </Link>

          <Link
            to="/panier"
            aria-label="Mon panier"
            className="relative transition-colors hover:text-taupe"
          >
            <ShoppingBag className="size-5" strokeWidth={1.6} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex min-w-4 items-center justify-center rounded-full bg-camel-deep px-1 text-[9px] font-medium leading-4 text-cream">
                {count}
              </span>
            )}
          </Link>

          <button
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex size-8 items-center justify-center md:hidden"
          >
            <span
              className="absolute h-px w-5 bg-ink transition-transform duration-300"
              style={{ transform: menuOpen ? "rotate(45deg)" : "translateY(-4px)" }}
            />
            <span
              className="absolute h-px w-5 bg-ink transition-transform duration-300"
              style={{ transform: menuOpen ? "rotate(-45deg)" : "translateY(4px)" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className="overflow-hidden border-ink/5 bg-cream/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden"
        style={{
          maxHeight: menuOpen ? "34rem" : "0rem",
          opacity: menuOpen ? 1 : 0,
          borderBottomWidth: menuOpen ? 1 : 0,
        }}
      >
        <div className="flex flex-col gap-1 px-5 py-4 sm:px-6">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="border-b border-ink/5 py-3 font-serif text-2xl italic transition-colors hover:text-taupe"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/favoris"
            onClick={() => setMenuOpen(false)}
            className="border-b border-ink/5 py-3 font-serif text-2xl italic transition-colors hover:text-taupe"
          >
            Favoris ({favCount})
          </Link>
          <Link
            to="/panier"
            onClick={() => setMenuOpen(false)}
            className="border-b border-ink/5 py-3 font-serif text-2xl italic transition-colors hover:text-taupe"
          >
            Panier ({count})
          </Link>
          <Link
            to="/connexion"
            onClick={() => setMenuOpen(false)}
            className="py-3 font-serif text-2xl italic transition-colors hover:text-taupe"
          >
            {user ? `Mon compte · ${user.firstName}` : "Connexion"}
          </Link>
        </div>
      </div>
      </nav>
    </>
  );
}
