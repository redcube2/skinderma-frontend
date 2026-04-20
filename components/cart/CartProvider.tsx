"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  addToCart,
  fetchCart,
  getCartSession,
  removeFromCart,
  updateCartItem,
} from "@/lib/cart";

export interface CartItem {
  key: string;
  id: number;
  name: string;
  quantity: number;
  permalink?: string;
  prices: {
    price: string;
    regular_price: string;
    currency_minor_unit?: number;
    currency_symbol?: string;
  };
  images: Array<{ src: string; alt?: string }>;
  totals?: {
    line_total: string;
    line_subtotal: string;
  };
}

interface CartData {
  items: CartItem[];
  items_count: number;
  totals: {
    total_price: string;
    total_items: string;
    currency_minor_unit: number;
    currency_symbol: string;
  };
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: string;
  currencyMinorUnit: number;
  currencySymbol: string;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  updateItem: (key: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    try {
      const session = await getCartSession();
      const data = await fetchCart(session);
      setCart(data);
    } catch {
      // swallow – empty cart is fine
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addItem = async (productId: number, quantity = 1) => {
    setIsLoading(true);
    try {
      const session = await getCartSession();
      await addToCart(productId, quantity, session);
      await refreshCart();
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (key: string) => {
    setIsLoading(true);
    try {
      const session = await getCartSession();
      await removeFromCart(key, session);
      await refreshCart();
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (key: string, quantity: number) => {
    setIsLoading(true);
    try {
      const session = await getCartSession();
      await updateCartItem(key, quantity, session);
      await refreshCart();
    } finally {
      setIsLoading(false);
    }
  };

  const items: CartItem[] = cart?.items || [];
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart?.totals?.total_price || "0";
  const currencyMinorUnit = cart?.totals?.currency_minor_unit ?? 2;
  const currencySymbol = cart?.totals?.currency_symbol || "€";

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        currencyMinorUnit,
        currencySymbol,
        isOpen,
        isLoading,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        updateItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
