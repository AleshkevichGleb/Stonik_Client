import styles from "./Profile.module.scss";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {FC} from "react";
import {useAppDispatch} from "../../hooks/useReduceer.ts";
import historyImage from "../../assets/images/history.svg";
import settingsImage from "../../assets/images/settings.svg";
import BasketImage from "../../assets/images/BasketImage.tsx";
import LogoutImage from "../../assets/images/logout.svg";
import ProfileImage from "../../assets/images/ProfileImage.tsx";
import TrashImage from "../../assets/images/trash.svg";
import {removeTokenFromLocaleStorage} from "../../helpers/localStorageHelper.ts";
import {resetUser} from "../../store/slices/user.slice.ts";

const Profile: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const url = useLocation().pathname.split('/')[2];

    return (
        <div className={styles.container}>
            <div className={styles.chooseBlock}>
                <div className={styles.chooseList}>
                    <Link to='account' className={url === 'account' ? styles.chooseItem_active : styles.chooseItem}>
                        <ProfileImage color={'#000'}/>
                        <span className={styles.text}>Личный кабинет</span>
                    </Link>
                    <Link to='/basket' className={styles.chooseItem}>
                        <BasketImage width={'24px'} height={'24px'}/>
                        <span className={styles.text}>Корзина</span>
                    </Link>
                    <Link to='history' className={url === 'history' ? styles.chooseItem_active : styles.chooseItem}>
                        <img src={historyImage} alt=""/>
                        <span className={styles.text}>История заказов</span>
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
                        }}
                    >
                        <img src={LogoutImage} alt=""/>
                        <span className={styles.redText}>Выйти из аккаунта</span>
                    </div>
                    <div className={styles.chooseItem}>
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