import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  cart: { cartItems: [] },
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find((x) => x._id === newItem._id);
      const cartItems = existItem
        ? state.cart.cartItems.map((x) => (x._id === newItem._id ? newItem : x))
        : [...state.cart.cartItems, newItem];

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: cartItems,
        },
      };
    case "REMOVE_CART_ITEM":
      const newCartItems = state.cart.cartItems.filter(
        (x) => x._id !== action.payload._id
      );
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
