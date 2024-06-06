import {ChangeEvent, FC, MouseEvent, useState} from 'react';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import userService from '../../services/userService';
import {IRegistrationUser } from '../../types/types';
import styles from "./Auth.module.scss";
import {setUser as setUserRedux, setAuth} from "../../store/slices/user.slice.ts";
import {useAppDispatch} from "../../hooks/useReducer.ts";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import BasketService from "../../services/basketService.ts";
import {setBasket} from "../../store/slices/basket.slice.ts";
import loaderIcon from "../../assets/images/loader-icon.svg";

const Auth: FC = () => {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<IRegistrationUser>({
        id: '',
        email: '',
        name: '',
        password: '',
        surname: '',
        city: '',
        role: '',
        image: '',
        createdAt: '',
        updatedAt: ''
    });

    const [isRegistration, setIsRegistration] = useState<boolean>(false);
    const handleRegistration = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setUser({...user, [name]: value})
    }

    const authorization = async (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(isRegistration) {
            try {
                if(!user.email || !user.password || !user.name || !user.surname) {
                    return toast.error('Заполните все поля!')
                }
                setIsDisabled(true)
                await userService.registration(user);
                const userData = await userService.getProfile();
                if(userData instanceof AxiosError) {
                    throw new Error('Ошибка полученя профиля')
                }

                if(userData)
                    dispatch(setUserRedux(userData))

                dispatch(setAuth(true));
                toast.success('Пользователь успешно зарегестрирован!')

                navigate('/profile/account')
            } catch(e: any) {
                toast.error(e.response.data.message);
            } finally {
                setIsDisabled(false);
            }          

        } else {
            try  {
                if(!user.email || !user.password) {
                    return toast.error('Заполните все поля!')
                }
                setIsDisabled(true);
                await userService.login({email: user.email, password: user.password});
                const userData = await userService.getProfile();
                if(userData instanceof AxiosError) {
                    throw new Error('Ошибка полученя профиля')
                }

                if(userData)
                    dispatch(setUserRedux(userData))

                const basketProducts = await BasketService.getForUser();
                if(basketProducts.length) dispatch(setBasket(basketProducts));

                dispatch(setAuth(true));
                navigate('/profile/account')
                toast.success('Вы вошли в аккаунт');
            } catch(e: any) {
                toast.error(e.response.data.message);   
            } finally {
                setIsDisabled(false)
            }
        }
    }

    return (
        <div className={styles.container}>
            <h2>{isRegistration ? 'Регистрация' : 'Вход'}</h2>
            <form className={styles.content}>
                {
                    isRegistration
                        ?
                        <>
                            <input
                                name='email'
                                className={styles.input}
                                placeholder='Почта'
                                type="email"
                                value={user.email}
                                onChange={handleRegistration}
                                required = {true}
                            />
                            <input
                                name='name'
                                className={styles.input}
                                placeholder='Имя'
                                type="text"
                                required = {true}
                                value={user.name}
                                onChange={handleRegistration}
                            />
                            <input
                                name='surname'
                                className={styles.input}
                                placeholder='Фамилия'
                                type="text"
                                value={user.surname}
                                onChange={handleRegistration}
                            />
                            <input
                                name='password'
                                className={styles.input}
                                placeholder='Пароль'
                                type="password"
                                value={user.password}
                                onChange={handleRegistration}
                                required = {true}
                            />
                        </>
                        :
                        <>
                            <input
                                name='email'
                                className={styles.input}
                                placeholder='Почта'
                                type="email"
                                value={user.email}
                                onChange={handleRegistration}
                            />
                            <input
                                name='password'
                                className={styles.input}
                                placeholder='Пароль'
                                type="password"
                                value={user.password}
                                onChange={handleRegistration}
                            />
                        </>
                }
                <button
                    onClick={authorization}
                    disabled={isDisabled}
                    className={styles.button}
                >
                    {isDisabled? <img width={25} src={loaderIcon} alt="loader"/> : isRegistration ? 'Зарегестрироваться' : 'Войти'}
                </button>
            </form>
            <div>
                <span onClick={() => setIsRegistration(!isRegistration)}
                      style={{cursor: 'pointer'}}>{isRegistration ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}</span>
                <span onClick={ () => {
                        setIsRegistration(!isRegistration);
                        setUser({
                            id: '',
                            email: '',
                            name: '',
                            password: '',
                            surname: '',
                            city: '',
                            role: 'User',
                            image: '',
                            createdAt: '',
                            updatedAt: '',
                        })}}
                      style={{cursor: 'pointer'}}>
                    {isRegistration ? ' Войти' : ' Зарегистрироваться'}
                </span>
            </div>
        </div>
    )
};

export default Auth;