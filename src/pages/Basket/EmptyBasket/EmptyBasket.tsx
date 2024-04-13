import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import emptyCartImage from "../../../assets/images/emptyCart.png";
import Button from '../../../common/Button/Button';
import styles from "./EmptyBasket.module.scss";

const EmptyBasket: FC = () => {
    const navigate = useNavigate();

    return(
        <div className={styles.container}>
            <img className={styles.image} src={emptyCartImage} alt="sdfdsf" />
            <span className={styles.text}>Ваша корзина пуста</span>
            <Button addStyles={styles.button} onClick={() => {
                navigate('/products');
            }}>В каталог</Button>
        </div>
    )
};

export default EmptyBasket;