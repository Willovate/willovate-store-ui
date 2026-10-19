import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Reservation } from '../types/restaurant';

interface RestaurantState {
  cart: CartItem[];
  favorites: string[]; // array of menuItem IDs
  reservation: Reservation | null;
  isCartOpen: boolean;
  isReservationModalOpen: boolean;
  orderMode: 'Dine-in' | 'Pickup' | 'Delivery';
}

type Action =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string } // cart item ID
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_RESERVATION'; payload: Reservation }
  | { type: 'TOGGLE_CART'; payload: boolean }
  | { type: 'TOGGLE_RESERVATION_MODAL'; payload: boolean }
  | { type: 'SET_ORDER_MODE'; payload: 'Dine-in' | 'Pickup' | 'Delivery' };

const initialState: RestaurantState = {
  cart: [],
  favorites: [],
  reservation: null,
  isCartOpen: false,
  isReservationModalOpen: false,
  orderMode: 'Dine-in',
};

function restaurantReducer(state: RestaurantState, action: Action): RestaurantState {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter((id) => id !== action.payload)
          : [...state.favorites, action.payload],
      };
    case 'SET_RESERVATION':
      return { ...state, reservation: action.payload };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: action.payload };
    case 'TOGGLE_RESERVATION_MODAL':
      return { ...state, isReservationModalOpen: action.payload };
    case 'SET_ORDER_MODE':
      return { ...state, orderMode: action.payload };
    default:
      return state;
  }
}

const RestaurantContext = createContext<{
  state: RestaurantState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);
  return (
    <RestaurantContext.Provider value={{ state, dispatch }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
}
