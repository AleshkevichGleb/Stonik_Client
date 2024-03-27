import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CartCountSlice from "./slices/CartCount.slice";

const rootReducer = combineReducers({
    count: CartCountSlice,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;