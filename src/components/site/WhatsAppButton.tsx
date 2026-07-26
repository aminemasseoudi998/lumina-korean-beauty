import { useLocation } from "@tanstack/react-router";

// Floating WhatsApp contact button — styled to match the beige/camel palette.
const WHATSAPP_NUMBER = "21671000000"; // international format, no "+"
const PREFILLED = "Bonjour Wglow ! J'aimerais des conseils sur vos produits coréens.";

export function WhatsAppButton() {
  const pathname = useLocation({ select: (l) => l.pathname });
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILLED)}`;

  // Hide on product pages (sticky add-to-cart occupies the corner) and in the admin area.
  if (pathname.startsWith("/produit/") || pathname.startsWith("/admin")) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className="group fixed right-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-50 flex items-center gap-0 overflow-hidden rounded-full bg-camel-deep py-3.5 pl-4 pr-4 text-cream shadow-lg ring-1 ring-ink/10 transition-all duration-500 hover:bg-camel-dark hover:pr-6 md:right-7 md:bottom-7"
    >
      {/* Soft pulse */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-camel-deep/30"
        style={{ animationDuration: "2.6s" }}
      />

      <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-current" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.885 9.886m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
      </svg>

      {/* Label expands on hover (desktop) */}
      <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-500 group-hover:ml-3 group-hover:max-w-[12rem] group-hover:opacity-100">
        Écrivez-nous
      </span>
    </a>
  );
}
