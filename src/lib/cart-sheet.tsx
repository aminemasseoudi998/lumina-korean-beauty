import { createContext, useContext, useState, type ReactNode } from "react";

type CartSheetContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartSheetContext = createContext<CartSheetContextValue | null>(null);

export function CartSheetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <CartSheetContext.Provider value={{ open, setOpen }}>
      {children}
    </CartSheetContext.Provider>
  );
}

export function useCartSheet(): CartSheetContextValue {
  const ctx = useContext(CartSheetContext);
  if (!ctx) throw new Error("useCartSheet must be used within a CartSheetProvider");
  return ctx;
}
