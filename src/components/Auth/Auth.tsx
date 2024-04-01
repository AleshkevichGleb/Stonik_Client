
import { jwtDecode } from 'jwt-decode';
import { ChangeEvent, FC, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import userService from '../../services/userService';
import { ILoginUser, IRegistrationUser } from '../../types/types';
import styles from "./Auth.module.scss";

const Auth: FC = () => {
    const [isDisabled, setisDisabled] = useState<boolean>(false);
    
    const [registrationUser, setRegistrationUser] = useState<IRegistrationUser>({
        email: '',
        name: '',
        password: '',
        phone: '',
        surname: '',
        city: '',
        role: 'User',
    });

    const [user, setUser] = useState<ILoginUser>({
        email: '',
        password: '',
    });

    const [isRegistration, setIsRegistration] = useState<boolean>(false);

    const handleRegistration = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        
        setRegistrationUser({...registrationUser, [name]: value})
    }

    const authorization = async () => {
        if(isRegistration) {
            setUser({
                email: registrationUser.email,
                password: registrationUser.password,
            })
            try {
                setisDisabled(true)
                const data = await userService.registration(registrationUser);
                console.log(data.token);
                
                toast.success('Пользователь успешно зарегестрирован!')
                // navigate('/profile')
                // dispatch(setUserRedux(registrationUser));
                // dispatch(setAuth(true));
                setRegistrationUser({email: '', name: '', password: '', phone: '', surname: '', city: '', role: 'User'})
                localStorage.removeItem('basket');

            } catch(e: any) {
                toast.error(e.response.data.message);
            } finally {
                setisDisabled(false);
            }          

        } else {
            try  {
                setisDisabled(true);
                const data= await userService.login(user);
                const decodedUser: IRegistrationUser = jwtDecode(data.token);
                if(decodedUser) 
                    // dispatch(setUserRedux({
                    //     email: decodedUser.email || '',
                    //     name: decodedUser.name || '',
                    //     password: decodedUser.password || '',
                    //     phone: decodedUser.phone || '',
                    //     surname: decodedUser.surname || '',
                    //     city: decodedUser.city || '',
                    // }))
                
                toast.success('Вы вошли в аккаунт');
                localStorage.removeItem('basket');
            } catch(e: any) {
                toast.error(e.response.data.message);   
            } finally {
                setisDisabled(false)
            }
        }
    }

    return (
        <div className={styles.container}>
            <h2>{isRegistration ? 'Регистрация' : 'Вход'}</h2>
            <div className={styles.content}>
                {
                    isRegistration 
                    ?
                        <>
                            <input 
                                name='email'
                                className={styles.input} 
                                placeholder='Почта*' 
                                type="email" 
                                value={registrationUser.email}
                                onChange={handleRegistration}
                            />
                            <input 
                                name='name'
                                className={styles.input} 
                                placeholder='Имя' 
                                type="text" 
                                value={registrationUser.name}
                                onChange={handleRegistration}
                            />
                            <input 
                                name='surname'
                                className={styles.input} 
                                placeholder='Фамилия' 
                                type="text" 
                                value={registrationUser.surname}
                                onChange={handleRegistration}
                            />
                            <PhoneInput 
                                value={registrationUser.phone} 
                                onChange={phone => setRegistrationUser({...registrationUser, phone})} 
                                inputStyle={{width: '100%'}}
                            />
                            <input 
                                name='password'
                                className={styles.input} 
                                placeholder='Пароль*' 
                                type="password" 
                                value={registrationUser.password}
                                onChange={handleRegistration}
                            />
                        </>
                    : 
                        <>
                            <input 
                                className={styles.input} 
                                placeholder='Почта*' 
                                type="email" 
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                            />
                            <input 
                                className={styles.input} 
                                placeholder='Пароль' 
                                type="password" 
                                value={user.password}
                                  onChange={(e) => setUser({...user, password: e.target.value})}
                            />
                        </>
                }
            </div>
            <button onClick={authorization} disabled = {isDisabled} className={styles.button}>{isRegistration ? 'Зарегестрироваться' : 'Войти'}</button>
            <div>
                <span onClick={() => setIsRegistration(!isRegistration)} style={{cursor: 'pointer'}}>{isRegistration ? 'Уже есть аккаунт?':'Нет аккаунта?'}</span>
                <span onClick={() => setIsRegistration(!isRegistration)} style={{cursor: 'pointer'}}>{isRegistration ? ' Войти' : ' Зарегестрироваться'}</span>
            </div>
        </div>
    )
};

export default Auth;