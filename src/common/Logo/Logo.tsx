import { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import styles from "./Logo.module.scss";

interface LogoProps {
    text?:string,
    addStyles?: any,
    onClick?: () =>  void,
}

const Logo:FC<LogoProps> = ({text, addStyles, onClick}) => {
    return (
        <div onClick={onClick} className={`${styles.logo} ${addStyles}`}>
            <Link to = '/'>
                <img className={`${styles.logo__image}`} src = {logo} alt="logo" />
            </Link>
            {text && 
                <span className={styles.text}>{text}</span>
            }
        </div>
    )
}

export default Logo;