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
    name: string,
    surname: string,
    phone: string,
    city: '',
}