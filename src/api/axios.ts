import axios, {AxiosInstance} from "axios";
import {getTokenFromLocaleStorage} from "../helpers/localStorageHelper.ts";

export const instance: AxiosInstance = axios.create({
    baseURL: process.env.HOST_URL,
});

instance.interceptors.request.use(config => {
    const token = getTokenFromLocaleStorage();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});