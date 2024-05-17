import styles from "./Profile.module.scss";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/useReducer.ts";
import historyImage from "../../assets/images/history.svg";
import settingsImage from "../../assets/images/settings.svg";
import LogoutImage from "../../assets/images/logout.svg";
import ProfileImage from "../../assets/images/ProfileImage.tsx";
import TrashImage from "../../assets/images/trash.svg";
import FavouriteImage from "../../assets/images/favourite.svg";
import { removeTokenFromLocaleStorage} from "../../helpers/localStorageHelper.ts";
import {resetUser} from "../../store/slices/user.slice.ts";
import {clearBasket} from "../../store/slices/basket.slice.ts";
import BasketImage from "../../assets/images/BasketImage.tsx";
import {instance} from "../../api/axios.ts";

const Profile: FC = () => {
    const {isAuth, user} = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const url = useLocation().pathname.split('/')[2];

    useEffect(() => {
        if(!isAuth) navigate('/auth')
    }, [dispatch]);

    const deleteProfile = async() => {
        try {
            const req = await instance.delete(`user/${user.id}`)
            if(req.status === 200) {
                navigate('/auth');
                removeTokenFromLocaleStorage('token');
                dispatch(resetUser());
                dispatch(clearBasket());
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.chooseBlock}>
                <div className={styles.chooseList}>
                    <Link to='account' className={url === 'account' ? styles.chooseItem_active : styles.chooseItem}>
                        <ProfileImage color={'#000'}/>
                        <span className={styles.text}>Личный кабинет</span>
                    </Link>
                    <Link to='history' className={url === 'history' ? styles.chooseItem_active : styles.chooseItem}>
                        <img src={historyImage} alt=""/>
                        <span className={styles.text}>История заказов</span>
                    </Link>
                    <Link to='favourites' className={url === 'favourites' ? styles.chooseItem_active : styles.chooseItem}>
                        <img src={FavouriteImage} alt=""/>
                        <span className={styles.text}>Избранное</span>
                    </Link>
                    {/*<Link to='reviews' className={url === 'reviews' ? styles.chooseItem_active : styles.chooseItem}>*/}
                    {/*    <img src={ReviewImage} alt=""/>*/}
                    {/*    <span className={styles.text}>Отзывы</span>*/}
                    {/*</Link>*/}
                    <Link to='/basket' className={styles.chooseItem}>
                        <BasketImage width={'24px'} height={'24px'}/>
                        <span className={styles.text}>Корзина</span>
                    </Link>
                    <Link to='settings' className={url === 'settings' ? styles.chooseItem_active : styles.chooseItem}>
                        <img src={settingsImage} alt=""/>
                        <span className={styles.text}>Настройки</span>
                    </Link>
                    <div
                        className={styles.chooseItem}
                        onClick={() => {
                            navigate('/auth');
                            removeTokenFromLocaleStorage('token');
                            dispatch(resetUser());
                            dispatch(clearBasket());
                        }}
                    >
                        <img src={LogoutImage} alt=""/>
                        <span className={styles.redText}>Выйти из аккаунта</span>
                    </div>
                    <div
                        className={styles.chooseItem}
                        onClick = {deleteProfile}

                    >
                        <img src={TrashImage} alt=""/>
                        <span className={styles.redText}>Удалить профиль</span>
                    </div>

                </div>
            </div>
            <Outlet/>
        </div>
    )
};

export default Profile;