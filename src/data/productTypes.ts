import {IProduct} from "../types/types.ts";

export const getProductTypes = (products: IProduct[]) => {
    const types = products.map(product => {
        if(product.type === 'Подоконник') return product.type + 'и';
        return (product.type).slice(0, -1) + 'ы';
    })

    const filterProductTypes: string[] = Array.from(new Set(types));
    return filterProductTypes;
}

export const  getCorrectProductTypes = (products: IProduct[]) => {
    const types = products.map(product => {
        return product.type
    })

    return Array.from(new Set(types));
}