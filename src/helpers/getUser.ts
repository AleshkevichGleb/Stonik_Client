import {useAppDispatch} from "../hooks/useReducer.ts";
import UserService from "../services/userService.ts";
import {AxiosError} from "axios";
import {setUser} from "../store/slices/user.slice.ts";
import BasketService from "../services/basketService.ts";
import {setBasket} from "../store/slices/basket.slice.ts";
import {removeTokenFromLocaleStorage} from "./localStorageHelper.ts";

const dispatch = useAppDispatch();

export default async function () {
    try {
        const user = await UserService.getProfile()
        if(user instanceof AxiosError) {
            throw new Error('Ошибка полученя профиля')
        }
        dispatch(setUser(user));

        const basketProducts = await BasketService.getForUser();
        if(basketProducts.length) dispatch(setBasket(basketProducts));
    } catch (e) {
        console.log(e)
        removeTokenFromLocaleStorage('token');
    }
}