import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmounts =
      state.totalAmount + action.payLoad.price * action.payLoad.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payLoad.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItem, updatedItems;

    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payLoad.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.payLoad);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmounts,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payLoad
    );
    const existingCartItem = state.items[existingCartItemIndex];
    console.log(existingCartItem.price);
    const updatedTotalAmounts = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(
        (item) => item.id !== action.payLoad
      );
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmounts,
    };
  }

  if(action.type === 'CLEAR'){
    return defaultCart;
  }

  return defaultCart;
};

function CartProvider(props) {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCart);
  // console.log(defaultCart)

  const addCartItemHandler = (item) => {
    dispatch({ type: "ADD", payLoad: item });
  };

  const removeCartItemHandler = (id) => {
    dispatch({ type: "REMOVE", payLoad: id });
  };

  const clearCartHandler = () => {
    dispatch({type: 'CLEAR'});
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addCartItemHandler,
    removeItem: removeCartItemHandler,
    clearCart: clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
