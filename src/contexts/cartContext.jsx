import { createContext, useReducer } from "react";

// Define the initial state of the cart
const initialState = {
  items: [], 
};

// Define the reducer function
const cartReducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {  
    // Add item to the cart
    case "ADD_TO_CART":
      const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id);
      const updatedItems = [...state.items];

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        const updatedItem = { 
          ...existingItem,
          quantity: existingItem.quantity + 1,
        }; 
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      return {...state, items: updatedItems};
    // Remove item from the cart
    case "REMOVE_FROM_CART":
      const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
      const existingItem = state.items[existingCartItemIndex];

      const updatedItemsRemove = [...state.items];
      
      if(existingItem.quantity === 1) { 
        updatedItemsRemove.splice(existingCartItemIndex, 1); 
      } else {
        const updatedItem = { 
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        updatedItemsRemove[existingCartItemIndex] = updatedItem;
      } 

      return {...state, items: updatedItemsRemove};
    // Clear the cart
    case "CLEAR_CART":
      return { ...state, items: [] };
    // Default case
    default:
      return state;
  }
};

// Create the cart context
export const CartContext = createContext({
  items: [],
  addToCart: (item) => {},
  removeFromCart: (id) => {},
  clearCart: () => {},
});

// Create the cart provider component
export const CartContextProvider = ({ children }) => { 
  // Use the useReducer hook to manage the cart state
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Add items to the cart
  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", item });
  };

  // Remove items from the cart
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  // Clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const ctxValue = {
    items: cart.items,
    addToCart,
    removeFromCart,
    clearCart,
  };

  console.log(ctxValue);

  // Provide the cart state and actions to the children components
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};
