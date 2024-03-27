import { FC } from "react";
import { Link } from "react-router-dom";
import buyImage from "../../../assets/images/buy.svg";
import styles from "./BasketCount.module.scss";

interface BasketCountProps {
    onClick: () => void;
}

const BasketCount: FC<BasketCountProps>= ({onClick}) => {
    return (
        <Link to = "/basket" className={styles.container} onClick={onClick}>
            <img className = {styles.image} src = {buyImage} alt = ""/>
            <span className={styles.text}>0</span>
        </Link>
    )
}

export default BasketCount;