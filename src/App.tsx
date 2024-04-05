import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import { routes } from "./constants/links"
import {useEffect, useState} from "react";
import {useAppDispatch} from "./hooks/useReduceer.ts";
import {setUser} from "./store/slices/user.slice.ts";
import BasketService from "./services/basketService.ts";
import UserService from "./services/userService.ts";
import {setBasket} from "./store/slices/basket.slice.ts";
import Loader from "./common/Loader/Loader.tsx";
// import {getTokenFromLocaleStorage} from "./helpers/localStorageHelper.ts";
// import ProductService from "./services/productService.ts";
function App() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const getUserData =  async() => {
        try {
            setIsLoading(true)
            const user = await UserService.getProfile()
            dispatch(setUser(user));

            const basketProducts = await BasketService.getForUser();
            if(basketProducts.length) dispatch(setBasket(basketProducts));
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getUserData();
    }, []);

  return (
    <>
        {
        isLoading
            ? <Loader/>
            :<>
                <Header/>
                <main>
                    {
                        <Routes>
                            {routes.map(route =>
                                <Route key={route.path} path = {route.path} element = {<route.element/>}/>
                            )}
                        </Routes>
                    }
                </main>
                <Footer/>
            </>
        }
    </>
  )
}

export default App
