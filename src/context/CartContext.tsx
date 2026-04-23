import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Movie {
  id: string;
  title: string;
  price: number;
  posterUrl: string;
  producer: string;
}

interface CartContextType {
  items: Movie[];
  addItem: (movie: Movie) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Movie[]>([]);

  const addItem = (movie: Movie) => {
    setItems(prev => {
      if (prev.find(item => item.id === movie.id)) {
        toast.error(`${movie.title} is already in your cart`);
        return prev;
      }
      toast.success(`${movie.title} added to cart`);
      return [...prev, movie];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};