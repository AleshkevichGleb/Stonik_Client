import axios from "axios";
import { setTokenToLocaleStorage } from "../helpers/localStorageHelper";
import { ILoginUser, IRegistrationUser } from "../types/types";

class UserService {
    async registration (registrationUser: IRegistrationUser) {
        const { data } = await axios.post(process.env.HOST_URL + '/user/registration', {
            ...registrationUser
        })
        // console.log(data);
        
        setTokenToLocaleStorage('token', data.token);
        return data;
    }

    async login(user: ILoginUser) {
        const { data } = await axios.post(process.env.HOST_URL + '/user/login', {
            ...user
        })
        // console.log(data);

        setTokenToLocaleStorage('token', data.token);
        return data;
    }
}

export default new UserService();