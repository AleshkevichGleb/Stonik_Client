import { FC } from "react";

export interface INavLinks {
    path: string;
    element: FC;
    title: string;
}

export interface IFooterImages {
    id: string | number; 
    img: string;
    url: string;
}

export interface IRoutes {
    path: string,
    element: FC,
}

export interface ILoginUser {
    email: string,
    password: string,
}

export interface IRegistrationUser extends ILoginUser {
    id: string | number,
    name: string,
    surname: string,
    city: '',
    role: 'User' | 'Admin' | '',
    image: string,
}

export interface IProduct {
    id: number | string
    name: string
    description: string
    price: number
    images: string[]
    rating: null | number
    isSale: boolean
    salePrice: number
    info: IProductInfo[],
    type: ProductType
    amount: number,
    createdAt: string
    updatedAt: string
}
export interface IProductData extends Omit<IProduct, 'info'>{
    info: string
}


interface IProductInfo {
    title: string,
    text: string,
}

export type ProductType = 'sill' | 'shell' | 'worktop' | 'vase'
