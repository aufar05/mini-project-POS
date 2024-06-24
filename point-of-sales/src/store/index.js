import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./reducers/ordersSlice";

const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});

export default store;
