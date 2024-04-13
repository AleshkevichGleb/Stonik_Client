import {useMemo} from "react";
import {IProduct} from "../types/types.ts";

export const useSearchProducts = (products: IProduct[], searchValue: string) => {
    const searchProducts: IProduct[] = useMemo(() => {
        if(searchValue.length) {
            const words: string[] = searchValue.split(' ');
            const newProducts: IProduct[] = [];
            products.forEach((product) => {
                let found = true;
                words.forEach(word => {
                    if(!product.name.toLowerCase().includes(word.toLowerCase())) {
                        found = false;
                    }
                })

                if(found) newProducts.push(product)
            })
            return newProducts;
        }
        return products
    },[products, searchValue]);

    return searchProducts;
}