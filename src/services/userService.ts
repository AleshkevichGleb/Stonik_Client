import axios from "axios";
import { setTokenToLocaleStorage } from "../helpers/localStorageHelper";
import { ILoginUser, IRegistrationUser } from "../types/types";
import {instance} from "../api/axios.ts";

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


    async update(data: {email: string, name: string, surname: string, city: string}, id: string) {
        try {
            const {data: resData} = await instance.patch(`/user/${id}`, {
                ...data
            })
            return resData;
        } catch (e) {
            return e;
        }
    }

    async updateAvatar(data: FormData, id: string | number) {
        try {
            const {data: responseData} = await instance.patch(`/user/${id}`, data)

            return responseData;
        } catch (e)  {
            console.log(e)
        }
    }

    async getProfile() {
        try {
            const response = await instance.get('/user/profile');
            return response.data;
        } catch (e) {
            // console.log(e)
            return e
        }
    }
}

export default new UserService();