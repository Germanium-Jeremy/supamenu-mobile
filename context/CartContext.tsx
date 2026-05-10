import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { MenuItem } from '@/data/restaurants';

// ── Types ──────────────────────────────────────────────────────
export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'INCREMENT'; payload: string }
  | { type: 'DECREMENT'; payload: string }
  | { type: 'CLEAR' };

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

// ── Reducer ────────────────────────────────────────────────────
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case 'INCREMENT':
      return {
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case 'DECREMENT': {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity <= 1) {
        return { items: state.items.filter((i) => i.id !== action.payload) };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────────
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item: MenuItem) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const increment = (id: string) => dispatch({ type: 'INCREMENT', payload: id });
  const decrement = (id: string) => dispatch({ type: 'DECREMENT', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, increment, decrement, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
