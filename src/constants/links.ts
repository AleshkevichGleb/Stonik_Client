import facebook from "../assets/images/Facebook.svg";
import instagram from "../assets/images/Instagram.svg";
import pinterest from "../assets/images/Pinterest.svg";
import twitter from "../assets/images/Twitter.svg";
import youtube from "../assets/images/YouTube.svg";
import AuthPage from "../pages/AuthPage/AuthPage";
import Basket from "../pages/Basket/Basket";
import ControlData from "../pages/ControlData/ControlData";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { default as FAQ, default as FAQPage } from "../pages/FAQ/FAQ";
import FormComponent from "../pages/FormComponent/FormComponent";
import Home from "../pages/Home/Home";
import News from "../pages/News/News";
import Product from "../pages/Product/Product";
import Products from "../pages/Products/Products";
import Profile from "../pages/Profile/Profile";
import { IFooterImages, INavLinks, IRoutes } from "../types/types";

export const footerImages: IFooterImages[] = [
    { id: 1, img: facebook, url: "https://ru-ru.facebook.com/", },
    { id: 2, img: instagram, url: "https://www.instagram.com/?hl=ru", },
    { id: 3, img: twitter, url: "https://twitter.com/i/flow/login?redirect_after_login=%2F", },
    { id: 4, img: youtube, url: "https://www.youtube.com/", },
    { id: 5, img: pinterest, url: "https://www.pinterest.com/", },
]
export const navLinks: INavLinks[] = [
    { path: '/', element: Home, title: "Главная" },
    { path: '/products', element: Products, title: "Каталог" },
    { path: '/basket', element: Basket, title: "Корзина" },
    { path: '/news', element: News, title: "News" },
    { path: '/FAQ', element: FAQPage, title: "FAQ's" },
]

export const routes: IRoutes[] = [
    { path: "/", element: Home },
    { path: "/products", element: Products },
    { path: "/products/:id", element: Product },
    { path: "/basket", element: Basket },
    { path: "/FAQ", element: FAQ },
    { path: "/order", element: FormComponent },
    { path: "/data", element: ControlData },
    { path: "/news", element: News },
    { path: "/auth", element: AuthPage },
    { path: "/profile", element: Profile },
    { path: "*", element: ErrorPage },
];