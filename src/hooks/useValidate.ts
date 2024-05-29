import { useState } from "react";
import {IErrorValidatePersonDate} from "../types/types.ts";


export const useValidate = () => {
    const [error, setError] = useState<IErrorValidatePersonDate>({
        name: '',
        phone: '',
        street: '',
        city: '',
        email: '',
        house: '',
        flat: '',
    });

    const validate = (name: string, value: string) => {
        switch(name) {
            case "name": {
                if(!/^[a-zA-Za-яА-Я]{2,16}$/.test(value)) {
                    setError({...error, name: 'Введите ваше настоящие имя'})
                } else {
                    setError({...error, name: ''});
                }
                break;
            }

            case 'phone': {
                if(!/^(\+?375|80)\(?(29|25|44|33)\)?(\d{3})(\d{2})(\d{2})$/.test(value)) {
                    setError({...error, phone: 'Введите правильно номер телефона, напр.: +375(29)2013212 '})
                } else {
                    setError({...error, phone: ''})
                }
                break;
            }

            case 'email': {
                if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,60}$/i.test(value)) {
                    setError({...error, email: 'Введите корректный email-адрес'})
                } else {
                    setError({...error, email: ''})
                }
                break;
            }

            case 'city': {
                if(!/^[A-Zа-я-]{2,20}$/i.test(value)) {
                    setError({...error, city: 'Название города должно содержать только буквы'})
                } else {
                    setError({...error, city: ''})
                }
                break;
            }

            case 'street': {
                if(!/^[a-zA-Za-яА-Я]{4,25}$/.test(value)) {
                    setError({...error, street: 'Название улицы должно содержать только буквы'})
                } else {
                    setError({...error, street: ''})
                }
                break;
            }

            case 'house': {
                if(!/^[0-9]{0,3}\s?[к|К|/]?\s?[0-9]{1}$/.test(value)) {
                    setError({...error, house: 'Номер дома должен содержать только цифры (и)или "/"'})
                } else {
                    setError({...error, house: ''})
                }
                break;
            }

            case 'flat': {
                if(!/^[0-9 /]{0,4}$/.test(value)) {
                    setError({...error, flat: 'Номер квартиры должен содержать только цифры'})
                } else {
                    setError({...error, flat: ''})
                }
                break;
            }

            default: break;
        }
    }

    return {validate, error};
}
