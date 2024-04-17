import {useMemo} from "react";
import {IProduct} from "../types/types.ts";

export type TSort = 'name' | 'price' | 'type' | 'default'
export const useSortProducts = (products: IProduct[], sort: TSort) => {

    const sortedProducts = useMemo(() => {
        let newProducts: IProduct[] = [];
        switch (sort) {
            case "name": {
                newProducts = [...products].sort((a,b) => a[sort].localeCompare(b[sort]))
                break
            }
            case "price": {
                newProducts = [...products].sort((a,b) => a[sort] - b[sort])
                break
            }
            case "type": {
                newProducts = [...products].sort((a,b) => a[sort].localeCompare(b[sort]))
                break
            }
            case "default": {
                newProducts = [...products].sort((a,b) => +a.id - +b.id)
                break;
            }
            default: return products;
        }

        return newProducts;
    }, [sort, products]);

    return sortedProducts
}
export const useSearchProducts = (products: IProduct[], searchValue: string, sort: TSort, isSale: boolean) => {
    const sortedProducts = useSortProducts(products, sort);
    // if(isSale) {
    //     newProducts = [...newProducts].filter(product => product.isSale)
    // }

    const searchProducts: IProduct[] = useMemo(() => {
        if(searchValue.length) {
            const words: string[] = searchValue.split(' ');
            return sortedProducts.filter((product) => {
                return words.every((word) => product.name.toLowerCase().includes(word.toLowerCase()));
            });
        }
        return sortedProducts;
    },[sortedProducts, searchValue, isSale]);
    return searchProducts;
}