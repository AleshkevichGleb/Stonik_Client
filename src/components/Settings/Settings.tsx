import {useAppDispatch, useAppSelector} from "../../hooks/useReducer.ts";
import {ChangeEvent, useMemo, useRef, useState} from "react";
import {IRegistrationUser} from "../../types/types.ts";
import userService from "../../services/userService.ts";
import {setTokenToLocaleStorage} from "../../helpers/localStorageHelper.ts";
import {setUser} from "../../store/slices/user.slice.ts";
import {toast} from "react-toastify";
import styles from "./Settings.module.scss";
import clearUserImage from "../../assets/images/clearUser.png";
import MyInput from "../../common/Input/MyInput.tsx";
const Settings = () => {

    const {user} = useAppSelector(state => state.user);
    const [editUser, setEditUser] = useState<IRegistrationUser>({...user});

    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     if(!isAuth) navigate('/auth')
    // }, [dispatch]);

    const isCompareUserData = useMemo(() =>
            JSON.stringify({name: user.name, email: user.email, surname: user.surname, city: user.city })
            === JSON.stringify({name: editUser.name, email: editUser.email, surname: editUser.surname, city: editUser.city }),
        [user,editUser, setEditUser, dispatch]);

    const handleUser = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setEditUser({...editUser, [id]: value})
    }

    const sendEditUser = async() => {
        try {
            const data = await userService.update({
                email: editUser.email,
                city: editUser.city,
                name: editUser.name,
                surname: editUser.surname,
            }, String(user.id));
            setTokenToLocaleStorage('token',data.token);

            dispatch(setUser({...editUser, image: user.image}));

            toast.success('Данные успешно обновлены')
        } catch (e) {
            console.log(e)
        }
    }

    const updatePhoto = async() => {
        const formData = new FormData();
        if (ref.current && ref.current.files && ref.current.files.length > 0) {
            formData.append('image', ref.current.files[0]);
        }

        const data = await userService.updateAvatar(formData, user.id);
        setTokenToLocaleStorage('token',data.token);
        dispatch(setUser(data.user))
    }
    const ref = useRef<HTMLInputElement | null>(null);

    return (
        <div className={styles.container}>
            <div className={styles.userBlock}>
                <div className={styles.userInfo}>
                    <div className={styles.userChange}>
                        <MyInput
                            addStyles={styles.addStyles}
                            id='name'
                            placeholder={'Имя'}
                            onChange={handleUser}
                            value={editUser.name}
                            type='text'
                            inputStyles={styles.inpuStyles}
                            labelStyles={styles.labelStyles}
                        />
                        <MyInput
                            addStyles={styles.addStyles}
                            id='surname'
                            placeholder={'Фамилия'}
                            onChange={handleUser}
                            value={editUser.surname}
                            type='text'
                            inputStyles={styles.inpuStyles}
                            labelStyles={styles.labelStyles}
                        />
                        <MyInput
                            addStyles={styles.addStyles}
                            id='email'
                            placeholder={'Почта'}
                            onChange={handleUser}
                            value={editUser.email}
                            type='email'
                            inputStyles={styles.inpuStyles}
                            labelStyles={styles.labelStyles}
                        />
                        <MyInput
                            addStyles={styles.addStyles}
                            id='city'
                            placeholder={'Город'}
                            onChange={handleUser}
                            value={editUser.city}
                            type='text'
                            inputStyles={styles.inpuStyles}
                            labelStyles={styles.labelStyles}
                        />
                    </div>
                    <button
                        className={styles.button}
                        disabled={isCompareUserData}
                        onClick={sendEditUser}
                    >
                        Сохранить изменения
                    </button>
                </div>
                <div className={styles.userImageBlock}>
                    <img className={styles.image} src={user.image ? user.image : clearUserImage} alt=""/>
                    <label className="input-file">
                        <input ref={ref} type="file" name="file" onChange={updatePhoto}/>
                        <span>{user.image ? 'Изменить фото' : 'Добавить фото'}</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Settings;