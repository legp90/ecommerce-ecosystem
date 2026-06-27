import { createContext, useContext, useReducer, useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem } from '../types';

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartState {
  items: CartItem[];
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// 1. Función para leer el estado guardado en el navegador al arrancar
const getInitialState = (): CartState => {
  try {
    const localCart = localStorage.getItem('ecosystem_cart');
    return localCart ? { items: JSON.parse(localCart) } : { items: [] };
  } catch (error) {
    console.error('Error leyendo localStorage, reiniciando carrito:', error);
    return { items: [] };
  }
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        const existingItem = state.items[existingItemIndex];
        if (existingItem.quantity >= action.payload.stock) return state;

        const newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        return { ...state, items: newItems };
      }

      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Inicializamos el Reducer pasándole la función de lectura limpia
  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);

  // 2. Efecto colateral (useEffect) para guardar en localStorage automáticamente cada vez que el carrito mute
  useEffect(() => {
    localStorage.setItem('ecosystem_cart', JSON.stringify(state.items));
  }, [state.items]);

  const cartCount = useMemo(() => {
    return state.items.reduce((acc, item) => acc + item.quantity, 0);
  }, [state.items]);

  const cartTotal = useMemo(() => {
    return state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [state.items]);

  const addToCart = (product: Product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (productId: string) => dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  const updateQuantity = (productId: string, quantity: number) => 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
}