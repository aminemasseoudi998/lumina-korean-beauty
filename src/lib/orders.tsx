import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type OrderStatus = "en-attente" | "confirmee" | "en-livraison" | "livree" | "annulee";

export const orderStatuses: OrderStatus[] = [
  "en-attente",
  "confirmee",
  "en-livraison",
  "livree",
  "annulee",
];

export const orderStatusLabel: Record<OrderStatus, string> = {
  "en-attente": "En attente",
  confirmee: "Confirmée",
  "en-livraison": "En cours de livraison",
  livree: "Livrée",
  annulee: "Annulée",
};

export type OrderCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  notes?: string;
};

export type OrderItem = { slug: string; name: string; qty: number; price: number };

export type Order = {
  ref: string;
  createdAt: number;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  payment: string;
  status: OrderStatus;
};

type OrdersContextValue = {
  orders: Order[];
  ready: boolean;
  createOrder: (data: Omit<Order, "createdAt" | "status">) => Order;
  setStatus: (ref: string, status: OrderStatus) => void;
  removeOrder: (ref: string) => void;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

const STORAGE_KEY = "wglow-orders";

function readStorage(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrders(readStorage());
    setReady(true);
  }, []);

  const commit = useCallback((next: Order[]) => {
    setOrders(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const createOrder = useCallback<OrdersContextValue["createOrder"]>(
    (data) => {
      const order: Order = { ...data, createdAt: Date.now(), status: "en-attente" };
      // newest first
      setOrders((prev) => {
        const next = [order, ...prev];
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
      return order;
    },
    [],
  );

  const setStatus = useCallback<OrdersContextValue["setStatus"]>(
    (ref, status) => {
      setOrders((prev) => {
        const next = prev.map((o) => (o.ref === ref ? { ...o, status } : o));
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [],
  );

  const removeOrder = useCallback<OrdersContextValue["removeOrder"]>(
    (ref) => {
      commit(orders.filter((o) => o.ref !== ref));
    },
    [orders, commit],
  );

  const value = useMemo<OrdersContextValue>(
    () => ({ orders, ready, createOrder, setStatus, removeOrder }),
    [orders, ready, createOrder, setStatus, removeOrder],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within an OrdersProvider");
  return ctx;
}
