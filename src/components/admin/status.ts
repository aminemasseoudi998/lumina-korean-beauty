import type { OrderStatus } from "@/lib/orders";

// Beige-palette status colors (kept AA-legible on their light fills).
export function statusBadgeClass(status: OrderStatus): string {
  switch (status) {
    case "en-attente":
      return "bg-tint-deep text-camel-deep";
    case "confirmee":
      return "bg-[#e4ecf0] text-[#3a5a6b]";
    case "en-livraison":
      return "bg-[#efe7cf] text-[#7a6320]";
    case "livree":
      return "bg-[#dfece2] text-[#2f6a41]";
    case "annulee":
      return "bg-[#f2dede] text-[#8a3a3a]";
  }
}
