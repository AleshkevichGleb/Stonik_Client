import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./BasketCount.module.scss";
import {useAppSelector} from "../../../hooks/useReducer.ts";
import BasketImage from "../../../assets/images/BasketImage.tsx";

interface BasketCountProps {
    onClick: () => void;
}

const BasketCount: FC<BasketCountProps>= ({onClick}) => {
    const {basketPrice} = useAppSelector(state => state.basket);
    return (
        <Link to = "/basket" className={styles.container} onClick={onClick}>
            <BasketImage width={'30px'} height={'23px'}/>
            <span className={styles.text}>{basketPrice.toFixed(1)}BYN</span>
        </Link>
    )
}

export default BasketCount;