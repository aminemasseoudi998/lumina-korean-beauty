import { Link } from "@tanstack/react-router";
import { BRAND } from "./SiteNav";
import logo from "@/assets/logo.png";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-tint pt-20 pb-10 text-ink sm:pt-24 sm:pb-12">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Link to="/" className="mb-6 inline-block" aria-label={BRAND}>
              <img src={logo} alt={BRAND} className="h-16 w-auto sm:h-20" />
            </Link>
            <p className="max-w-[36ch] text-pretty text-sm leading-relaxed text-taupe">
              La maison de cosmétiques coréens authentiques en Tunisie. Livraison 24h et paiement à la
              livraison, pour celles et ceux qui cherchent la lumière.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            <div>
              <h5 className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-camel-deep">Maison</h5>
              <ul className="space-y-3 text-sm">
                <li><Link to="/a-propos" className="hover:text-camel-deep transition-colors">Notre histoire</Link></li>
                <li><Link to="/blog" className="hover:text-camel-deep transition-colors">Journal</Link></li>
                <li><Link to="/contact" className="hover:text-camel-deep transition-colors">Contact</Link></li>
                <li><Link to="/a-propos" className="hover:text-camel-deep transition-colors">Notre mission</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-camel-deep">Boutique</h5>
              <ul className="space-y-3 text-sm">
                <li><Link to="/boutique" search={{ categorie: "serums" }} className="hover:text-camel-deep transition-colors">Sérums</Link></li>
                <li><Link to="/boutique" search={{ categorie: "cremes" }} className="hover:text-camel-deep transition-colors">Crèmes</Link></li>
                <li><Link to="/boutique" search={{ categorie: "masques" }} className="hover:text-camel-deep transition-colors">Masques</Link></li>
                <li><Link to="/boutique" search={{ categorie: "brumes" }} className="hover:text-camel-deep transition-colors">Brumes</Link></li>
                <li><Link to="/boutique" className="flex items-center gap-1 text-camel-deep hover:text-camel-dark transition-colors">Tout voir <span>→</span></Link></li>
              </ul>
            </div>
            <div>
              <h5 className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-camel-deep">Aide</h5>
              <ul className="space-y-3 text-sm">
                <li><Link to="/livraison" className="hover:text-camel-deep transition-colors">Livraison</Link></li>
                <li><Link to="/confidentialite" className="hover:text-camel-deep transition-colors">Confidentialité</Link></li>
                <li><Link to="/mentions-legales" className="hover:text-camel-deep transition-colors">Mentions légales</Link></li>
                <li><Link to="/contact" className="hover:text-camel-deep transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-camel-deep">Suivez-nous</h5>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="inline-flex items-center gap-1 hover:text-camel-deep transition-colors">Instagram <ArrowUpRight className="size-3" strokeWidth={1.5} /></a></li>
                <li><a href="#" className="inline-flex items-center gap-1 hover:text-camel-deep transition-colors">TikTok <ArrowUpRight className="size-3" strokeWidth={1.5} /></a></li>
                <li><a href="#" className="inline-flex items-center gap-1 hover:text-camel-deep transition-colors">Pinterest <ArrowUpRight className="size-3" strokeWidth={1.5} /></a></li>
                <li><a href="#" className="inline-flex items-center gap-1 hover:text-camel-deep transition-colors">Facebook <ArrowUpRight className="size-3" strokeWidth={1.5} /></a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-8 text-[10px] uppercase tracking-[0.24em] text-taupe sm:mt-20 md:flex-row md:items-center">
          <span>© 2024 — {BRAND} · Cosmétiques coréens en Tunisie</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/confidentialite" className="hover:text-ink transition-colors">Confidentialité</Link>
            <Link to="/livraison" className="hover:text-ink transition-colors">Livraison</Link>
            <Link to="/mentions-legales" className="hover:text-ink transition-colors">Mentions légales</Link>
            <Link to="/contact" className="hover:text-ink transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
