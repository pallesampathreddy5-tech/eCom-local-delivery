import { createContext, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "localkart_guest_cart";
const GuestCartContext = createContext(null);

const loadItems = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

export const GuestCartProvider = ({ children }) => {
  const [items, setItems] = useState(loadItems);

  const persist = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  };

  const addItem = (product) => {
    const existing = items.find((entry) => entry.productId === product.id);
    let next;

    if (existing) {
      next = items.map((entry) =>
        entry.productId === product.id ? { ...entry, quantity: entry.quantity + 1 } : entry
      );
    } else {
      next = [
        ...items,
        {
          productId: product.id,
          name: product.name,
          categoryId: product.categoryId,
          shopName: product.shopName,
          price: product.price,
          quantity: 1
        }
      ];
    }

    persist(next);
  };

  const updateQty = (productId, quantity) => {
    const next = items.map((entry) =>
      entry.productId === productId ? { ...entry, quantity } : entry
    );
    persist(next);
  };

  const removeItem = (productId) => {
    const next = items.filter((entry) => entry.productId !== productId);
    persist(next);
  };

  const clear = () => persist([]);

  const summary = useMemo(() => {
    const totalItems = items.reduce((sum, entry) => sum + entry.quantity, 0);
    const subtotal = items.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
    return { totalItems, subtotal };
  }, [items]);

  return (
    <GuestCartContext.Provider value={{ items, summary, addItem, updateQty, removeItem, clear }}>
      {children}
    </GuestCartContext.Provider>
  );
};

export const useGuestCart = () => {
  const context = useContext(GuestCartContext);
  if (!context) {
    throw new Error("useGuestCart must be used within GuestCartProvider");
  }
  return context;
};
