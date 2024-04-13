import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../common/Logo/Logo";
import { navLinks } from "../../constants/links";
import BasketCount from "./BaketCount/BasketCount";
import styles from "./Header.module.scss";
import Menu from "./Menu/Menu";
import {useAppSelector} from "../../hooks/useReducer.ts";
import ProfileImage from "../../assets/images/ProfileImage.tsx";


const Header = () => {
    const [isActiveMenu, setIsActiveMenu] = useState(false)
    const {isAuth} = useAppSelector(state => state.user);

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Menu 
                    onClick = {(e) => {
                        setIsActiveMenu(!isActiveMenu);
                        e.stopPropagation ();
                    }} 
                    isActiveMenu = {isActiveMenu}
                />
                <Logo onClick = {() => setIsActiveMenu(false)}/>
                <div className={isActiveMenu ? styles.menu__active : styles.menu}>
                    <nav className={styles.navbar}>
                        {navLinks.map(link => 
                            <Link 
                                onClick={() => (setIsActiveMenu(false))}
                                key = {link.path} 
                                className = {styles.link} 
                                to = {link.path}
                            >
                                {link.title}
                            </Link>    
                        )}
                    </nav>
                </div>
                <Link to = {isAuth ? '/profile/account' : '/auth'} className={styles.profile__block}>
                    <ProfileImage color={'white'}/>
                    {!isAuth
                        ? <span className={styles.profile__text}>Войти</span>
                        : <span className={styles.profile__text}>Аккаунт</span>
                    }
                </Link>
                <BasketCount onClick = {() => setIsActiveMenu(false)}/>
            </div>
        </header>
    )
};

export default Header;