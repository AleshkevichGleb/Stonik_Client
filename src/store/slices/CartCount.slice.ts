import { createSlice } from "@reduxjs/toolkit";


const fullCartCount = createSlice({
    name: 'fullCartCount',
    initialState: {
        count: 0,
    },

    reducers: {
        calc_cart_count: (state) => {
            const storage = localStorage.getItem('basket')
            const basket: any[] = storage ? JSON.parse(storage) : [];
            if (basket.length) {
                const count = basket.reduce((acc, product) => acc + product.cartCount || 0, 0)
                state.count = count;
            } else {
                state.count = 0;
            }
        }
    },
})

export const { calc_cart_count } = fullCartCount.actions;
export default fullCartCount.reducer;