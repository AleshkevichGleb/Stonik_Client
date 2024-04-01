import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartCountSlice from "./slices/cartCount.slice";

const rootReducer = combineReducers({
    count: cartCountSlice,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;