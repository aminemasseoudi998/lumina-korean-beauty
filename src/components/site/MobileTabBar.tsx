import { Link, useLocation } from "@tanstack/react-router";
import { Heart, Home, ShoppingBag, Sparkles, User } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useCartSheet } from "@/lib/cart-sheet";
import { useFavorites } from "@/lib/favorites";
import { useAuth } from "@/lib/auth";

// App-style bottom navigation for touch devices. Hidden from md up.
export function MobileTabBar() {
  const { count } = useCart();
  const { setOpen: setCartOpen } = useCartSheet();
  const { count: favCount } = useFavorites();
  const { user } = useAuth();
  const pathname = useLocation({ select: (l) => l.pathname });

  // Storefront navigation only — not in the admin area.
  if (pathname.startsWith("/admin")) return null;

  const tabs = [
    { to: "/", label: "Accueil", icon: Home, exact: true, badge: 0 },
    { to: "/boutique", label: "Boutique", icon: Sparkles, exact: false, badge: 0 },
    { to: "/favoris", label: "Favoris", icon: Heart, exact: false, badge: favCount },
    { to: "/panier", label: "Panier", icon: ShoppingBag, exact: false, badge: count },
    { to: "/connexion", label: user ? user.firstName : "Compte", icon: User, exact: false, badge: 0 },
  ] as const;

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/90 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {tabs.map((t) =>
          t.to === "/panier" ? (
            <li key={t.to} className="flex-1">
              <button
                onClick={() => setCartOpen(true)}
                className="group flex w-full flex-col items-center gap-1 py-2 text-taupe transition-colors"
              >
                <span className="relative flex size-6 items-center justify-center">
                  <t.icon className="size-[22px]" strokeWidth={1.6} />
                  {t.badge > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex min-w-4 items-center justify-center rounded-full bg-camel-deep px-1 text-[9px] font-semibold leading-4 text-cream">
                      {t.badge}
                    </span>
                  )}
                </span>
                <span className="max-w-full truncate px-0.5 text-[9px] font-medium uppercase tracking-[0.08em]">
                  {t.label}
                </span>
              </button>
            </li>
          ) : (
            <li key={t.to} className="flex-1">
              <Link
                to={t.to}
                activeOptions={{ exact: t.exact }}
                activeProps={{ "data-active": "true" }}
                className="group flex flex-col items-center gap-1 py-2 text-taupe transition-colors data-[active=true]:text-camel-deep"
              >
                <span className="relative flex size-6 items-center justify-center">
                  <t.icon className="size-[22px]" strokeWidth={1.6} />
                  {t.badge > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex min-w-4 items-center justify-center rounded-full bg-camel-deep px-1 text-[9px] font-semibold leading-4 text-cream">
                      {t.badge}
                    </span>
                  )}
                </span>
                <span className="max-w-full truncate px-0.5 text-[9px] font-medium uppercase tracking-[0.08em]">
                  {t.label}
                </span>
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
