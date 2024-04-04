import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartCountSlice from "./slices/cartCount.slice";
import userSlice from "./slices/user.slice.ts";
import productsSlice from "./slices/products.slice.ts";
import basketSlice from "./slices/basket.slice.ts";

const rootReducer = combineReducers({
    count: cartCountSlice,
    user: userSlice,
    products: productsSlice,
    basket: basketSlice,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;