import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";

const url = `https://course-api.com/react-useReducer-cart-project`;

const initialState = {
  cartItems: [],
  amount: 5,
  total: 4,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    // console.log(thunkAPI);
    // console.log(thunkAPI.getState());
    // thunkAPI.dispatch(openModal());
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      // console.log(action);
      state.isLoading = false;
    });
  },
});

// console.log(cartSlice);

export const { clearCart, removeItem, toggle, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
