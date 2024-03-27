import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../../assets/images/Profile.svg";
import Logo from "../../common/Logo/Logo";
import { navLinks } from "../../constants/links";
import BasketCount from "./BaketCount/BasketCount";
import styles from "./Header.module.scss";
import Menu from "./Menu/Menu";


const Header = () => {
    const [isActiveMenu, setIsActiveMenu] = useState(false)
    const isAuth = false;

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
                <Link to = {isAuth ? '/profile' : '/auth'} className={styles.profile__block}>
                    <img src={ProfileImage} alt="ProfileImage" />
                    {!isAuth &&  <span className={styles.profile__text}>Войти</span>}
                </Link>
                <BasketCount onClick = {() => setIsActiveMenu(false)}/>
            </div>
        </header>
    )
};

export default Header;