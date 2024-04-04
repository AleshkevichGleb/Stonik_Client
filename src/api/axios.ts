import axios from "axios";
import {getTokenFromLocaleStorage} from "../helpers/localStorageHelper.ts";

export const instance = axios.create({
    baseURL: process.env.HOST_URL,
    headers: {Authorization: 'Bearer ' + getTokenFromLocaleStorage()}
})