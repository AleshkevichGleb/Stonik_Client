import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../types/types.ts";


const findProduct = (products: IBasketProduct[], id: number | string) => {
    const product = products.find((product) => +product.product.id === +id );
    if(product) return product
    return undefined;
}

export interface IBasketProduct {
    count: number,
    product: IProduct,
}
interface IInitialState {
    products: IBasketProduct[]
    basketPrice: number,
}

const initialState: IInitialState = {
    products: [],
    basketPrice: 0,
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action:PayloadAction<IBasketProduct[]>) => {
            state.products = action.payload

            state.basketPrice = state.products.reduce((acc, basketProduct) => {
                return  acc + +basketProduct.count * +basketProduct.product.price;
            }, 0);

        },


        addProduct:(state, action: PayloadAction<IProduct>) => {
            const product = findProduct(state.products, action.payload.id);
            if(product) {
                product.count += 1;
            } else {
                const productData = action.payload;
                state.products = [...state.products, {product: productData, count: 1}];
            }

            state.basketPrice = state.products.reduce((acc, basketProduct) => {
                return  acc + +basketProduct.count * +basketProduct.product.price;
            }, 0);
        },

        deleteProduct: (state, action: PayloadAction<IProduct>) => {
            const product = findProduct(state.products, action.payload.id);
            if(product && product?.count > 1) {
                product.count -= 1;
            } else if(product && product?.count <= 1) {
                state.products = state.products.filter(basketProduct => +basketProduct.product.id !== +product.product.id)
            }

            state.basketPrice = state.products.reduce((acc, basketProduct) => {
                return  acc + +basketProduct.count * +basketProduct.product.price;
            }, 0);
        },

        removeFromBasket: (state, action: PayloadAction<string | number>) => {
            const product = findProduct(state.products, action.payload);
            if(product) state.products = state.products.filter(basketProduct => +basketProduct.product.id !== +product.product.id)

            state.basketPrice = state.products.reduce((acc, basketProduct) => {
                return  acc + +basketProduct.count * +basketProduct.product.price;
            }, 0);
        },

        clearBasket: (state) => {
            state.products = [];
            state.basketPrice = 0;
        }


    }
})

export const {addProduct,
              setBasket,
              deleteProduct,
              removeFromBasket,
              clearBasket
} = basketSlice.actions;
export default basketSlice.reducer;