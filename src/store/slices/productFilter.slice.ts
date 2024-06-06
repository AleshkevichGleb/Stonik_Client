import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilter} from "../../types/types.ts";


const initialState: IFilter = {
    page: 1,
    limit: 9,
    sort: 'default',
    isSale: false,
    startPrice: '0',
    lastPrice: '',
    type: [],
    searchValue: '',
    maxPrice: 0,
}

const productFilterSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<Partial<IFilter>>) => {
            return { ...state, ...action.payload };
        },

        clearFilter: (state) => {
            return {
                ...state,
                page: 1,
                limit: 9,
                sort: 'default',
                isSale: false,
                startPrice: '',
                lastPrice: '',
                type: [],
                searchValue: '',
            }
        }
    }
})


export const {setFilter,clearFilter} = productFilterSlice.actions;
export default productFilterSlice.reducer;