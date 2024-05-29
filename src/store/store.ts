import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice.ts";
import productFilter from "./slices/productFilter.slice.ts";
import basketSlice from "./slices/basket.slice.ts";
import personSlice from "./slices/person.slice.ts";

const rootReducer = combineReducers({
    user: userSlice,
    filter: productFilter,
    basket: basketSlice,
    person: personSlice,
})
export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;