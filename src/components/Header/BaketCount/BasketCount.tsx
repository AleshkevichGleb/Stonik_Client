import { FC } from "react";
import { Link } from "react-router-dom";
import buyImage from "../../../assets/images/buy.svg";
import styles from "./BasketCount.module.scss";
import {useAppSelector} from "../../../hooks/useReduceer.ts";

interface BasketCountProps {
    onClick: () => void;
}

const BasketCount: FC<BasketCountProps>= ({onClick}) => {
    const {basketPrice} = useAppSelector(state => state.basket);
    return (
        <Link to = "/basket" className={styles.container} onClick={onClick}>
            <img className = {styles.image} src = {buyImage} alt = ""/>
            <span className={styles.text}>{basketPrice.toFixed(1)}BYN</span>
        </Link>
    )
}

export default BasketCount;