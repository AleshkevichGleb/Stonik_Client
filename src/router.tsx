import {createBrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home/Home.tsx";
import Products from "./pages/Products/Products.tsx";
import Product from "./pages/Product/Product.tsx";
import Basket from "./pages/Basket/Basket.tsx";
import FAQ from "./pages/FAQ/FAQ.tsx";
import FormComponent from "./pages/FormComponent/FormComponent.tsx";
import ControlData from "./pages/ControlData/ControlData.tsx";
import News from "./pages/News/News.tsx";
import NewsPage from "./pages/NewsItemPage/NewsItemPage.tsx";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Settings from "./components/Settings/Settings.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import PersonalAccountProfile from "./components/PersonalAccountProfile/PersonalAccountProfile.tsx";
import HistoryProfile from "./components/HistoryProfile/HistoryProfile.tsx";
import FavouritesProfile from "./components/FavouritesProfile/FavouritesProfile.tsx";
import ADMIN from "./pages/ADMIN/ADMIN.tsx";
import AdminNews from "./components/ADMIN/AdminNews/AdminNews.tsx";
import AdminReviews from "./components/ADMIN/AdminReviews/AdminReviews.tsx";
import AdminProducts from "./components/ADMIN/AdminProducts/AdminProducts.tsx";
import AdminOrders from "./components/ADMIN/AdminOrders/AdminOrders.tsx";
import About from "./pages/About/About.tsx";

const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            { path: "/", element: <Home /> },
            { path: "/products", element: <Products/> },
            { path: "/products/:type/:id", element: <Product/> },
            { path: "/basket", element: <Basket/>},
            { path: "/FAQ", element: <FAQ /> },
            { path: "/order", element: <FormComponent /> },
            { path: "/data", element: <ControlData /> },
            { path: "/news", element: <News /> },
            { path: "/news/:id", element: <NewsPage /> },
            { path: "/auth", element: <AuthPage /> },
            { path: "/about", element: <About /> },
            {
                path: "/profile",
                element: <Profile />,
                children: [
                    { path: "settings", element: <Settings /> },
                    { path: "account", element: <PersonalAccountProfile /> },
                    { path: "history", element: <HistoryProfile /> },
                    // { path: "reviews", element: <ReviewsProfile /> },
                    { path: "favourites", element: <FavouritesProfile /> },
                ],
            },
            {
                path: '/admin',
                element: <ADMIN/>,
                children: [
                    {path: "news", element: <AdminNews/>},
                    {path: "products", element: <AdminProducts/>},
                    {path: "reviews", element: <AdminReviews/>},
                    {path: "orders", element: <AdminOrders/>},
                ]
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
]);

export default router;
