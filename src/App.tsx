import {Outlet, useNavigate} from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import {useEffect, useState} from "react";
import {useAppDispatch} from "./hooks/useReducer.ts";
import {setUser} from "./store/slices/user.slice.ts";
import BasketService from "./services/basketService.ts";
import UserService from "./services/userService.ts";
import {setBasket} from "./store/slices/basket.slice.ts";
import Loader from "./common/Loader/Loader.tsx";
import {getTokenFromLocaleStorage, removeTokenFromLocaleStorage} from "./helpers/localStorageHelper.ts";
import {AxiosError} from "axios";
import ScrollToTop from "./common/ScrollToTop.tsx";
function App() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const getUserData =  async() => {
        try {
            setIsLoading(true)
            if(!getTokenFromLocaleStorage().length)  throw new Error('Ошибка полученя профиля')

            const user = await UserService.getProfile()
            if(user instanceof AxiosError) {
                throw new Error('Ошибка полученя профиля')
                navigate('/')
            }
            dispatch(setUser(user));

            const basketProducts = await BasketService.getForUser();
            if(basketProducts.length) dispatch(setBasket(basketProducts));
        } catch (e) {
            removeTokenFromLocaleStorage('token');
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getUserData();
    }, []);

    if(isLoading) return  <Loader/>

      return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
            <ScrollToTop/>
        </>
      )
}

export default App
