import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice += action.payload.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
      state.total += action.payload.price;
    },
    removeProduct: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.total -= state.items[index].totalPrice;
        state.items.splice(index, 1);
      }
    },
    incrementQuantity: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice += existingProduct.price;
        state.total += existingProduct.price;
      }
    },
    decrementQuantity: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        existingProduct.totalPrice -= existingProduct.price;
        state.total -= existingProduct.price;
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  incrementQuantity,
  decrementQuantity,
} = ordersSlice.actions;

export default ordersSlice.reducer;
