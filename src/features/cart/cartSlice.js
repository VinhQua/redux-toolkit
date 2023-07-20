import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
const initialState = {
  cartItems: cartItems,
  amount: 5,
  total: 4,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload: id }) => {
      // console.log(action);
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    toggle: (state, { payload: { id, option } }) => {
      const cartItem = state.cartItems.find((item) => item.id === id);
      if (option === "increase") {
        cartItem.amount += 1;
      } else if (option === "decrease") {
        cartItem.amount -= 1;
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

// console.log(cartSlice);

export const { clearCart, removeItem, toggle, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
