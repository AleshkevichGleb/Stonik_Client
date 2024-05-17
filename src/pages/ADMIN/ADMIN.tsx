import styles from "./ADMIN.module.scss";
import {useEffect, useState} from "react";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {getTokenFromLocaleStorage} from "../../helpers/localStorageHelper.ts";
import {jwtDecode} from "jwt-decode";
import Loader from "../../common/Loader/Loader.tsx";
const ADMIN = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoading(true);

        const token = getTokenFromLocaleStorage();
        if(!token) return  navigate(-1);

        const data:{role: string} = jwtDecode(token);
        if(data.role !== 'admin') navigate(-1)

        setIsLoading(false)
    }, []);

    const url = useLocation().pathname.split('/')[2];

    if(isLoading) return  <Loader/>

    return(
        <div className={styles.container}>
            <div className={styles.admin__navigate}>
                <Link className={url === 'news' ? [styles.admin__navigateItem, styles.active].join(' ') : styles.admin__navigateItem} to = {'news'}>Новости</Link>
                <Link className={url === 'products' ? [styles.admin__navigateItem, styles.active].join(' ') : styles.admin__navigateItem}  to = {'products'}>Товары</Link>
                <Link className={url === 'reviews' ? [styles.admin__navigateItem, styles.active].join(' ') : styles.admin__navigateItem}  to = {'reviews'}>Отзывы</Link>
                <Link className={url === 'orders' ? [styles.admin__navigateItem, styles.active].join(' ') : styles.admin__navigateItem}  to = {'orders'}>Заказы</Link>
            </div>
            <Outlet/>
        </div>
    )
}

export default ADMIN;