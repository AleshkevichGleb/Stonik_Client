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

interface IRouteChildren {
    path: string,
    element: FC,
}
export interface IRoutes {
    path: string,
    element: FC,
    children?: IRouteChildren[],
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
    createdAt: string,
    updatedAt: string,
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


export interface IBasketData {
    count: number,
    product: IProduct,
}

export interface IPersonData {
    name: string,
    phone: string,
    email: string,
    city: string,
    street: string,
    house: string,
    flat: string,
    payment: {
        type: string,
        surrender_of_money: string,
    },
    agreement: boolean,
}

export interface IErrorValidatePersonDate {
    name: string,
    phone: string,
    street: string,
    city: string,
    email: string,
    house: string,
    flat: string,
}

export type TPersonDataField = 'name' | 'phone' | 'phone' | 'email' | 'house'| 'city' | 'street' | 'house' | 'flat' | 'agreement'

export type OrderStatusTypes = 'В обработке' | 'В пути' | 'Доставлено'

export interface IOrder {
    id: number
    userId: number
    productId: number
    count: number
    status: OrderStatusTypes
    createdAt: string
    updatedAt: string
    product: IProduct
}

export interface IReview {
    id: number
    message: string
    rating: number
    userId: number
    productId: number
    createdAt: string
    updatedAt: string
    user: IUserReview
}

export interface IUserReview {
    name: string
    surname: string
    email: string
    image: string
}