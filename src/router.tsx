import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home/Home.tsx";
import Products from "./pages/Products/Products.tsx";
import Product from "./pages/Product/Product.tsx";
import Basket from "./pages/Basket/Basket.tsx";
import FAQ from "./pages/FAQ/FAQ.tsx";
import FormComponent from "./pages/FormComponent/FormComponent.tsx";
import ControlData from "./pages/ControlData/ControlData.tsx";
import News from "./pages/News/News.tsx";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Settings from "./components/Settings/Settings.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import PersonalAccountProfile from "./components/PersonalAccountProfile/PersonalAccountProfile.tsx";
import HistoryProfile from "./components/HistoryProfile/HistoryProfile.tsx";

const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            { path: "/", element: <Home /> },
            { path: "/products", element: <Products/> },
            { path: "/products/:id", element: <Product/> },
            { path: "/basket", element: <Basket/>},
            { path: "/FAQ", element: <FAQ /> },
            { path: "/order", element: <FormComponent /> },
            { path: "/data", element: <ControlData /> },
            { path: "/news", element: <News /> },
            { path: "/auth", element: <AuthPage /> },
            {
                path: "/profile",
                element: <Profile />,
                children: [
                    { path: "settings", element: <Settings /> },
                    { path: "account", element: <PersonalAccountProfile /> },
                    { path: "history", element: <HistoryProfile /> },
                ],
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
]);

export default router;
