import { createContext, useReducer } from "react";

// Define the initial state of the cart
const initialState = [];

// Define the reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

// Create the cart context
export const CartContext = createContext();

// Create the cart provider component
export const CartProvider = ({ children }) => {
  // Use the useReducer hook to manage the cart state
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Add items to the cart
  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  // Remove items from the cart
  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  };

  // Clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const ctxValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  // Provide the cart state and actions to the children components
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};
