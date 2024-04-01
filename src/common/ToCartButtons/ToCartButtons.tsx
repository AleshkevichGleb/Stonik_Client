import plusImage from "../../assets/images/plus.svg";
// import { calc_cart_count } from "../../reducers/fullCartCount.slice";
// import { decrease_price, increase_price } from "../../reducers/productsSlice";
import { FC, MouseEvent } from "react";
import Button from "../Button/Button";
import styles from "./ToCartButtons.module.scss";

interface ToCartButtonsProps {
    product: any,
    addStyles: any,
    flag: boolean
}

const ToCartButtons: FC<ToCartButtonsProps> = ({product, addStyles, flag}) => {

    const increasePrice = (e: MouseEvent<HTMLButtonElement>) => {
        // const {id} = e.target;
        // dispatch(increase_price({id: id}));
        // dispatch(calc_cart_count());
    }

    const decreasePrice = (e: MouseEvent<HTMLButtonElement>) => {
        // const {id} = e.target;
        // dispatch(decrease_price({id: id}));
        // dispatch(calc_cart_count());
    }

    return (
        product.cartCount > 0
        ?   <div className={styles.buttonsContainer}>
                <span className={addStyles.count}>{product.cartCount}</span>
                <Button 
                    id = {product.id} 
                    onClick={decreasePrice} 
                    addStyles={addStyles.button}
                >
                    —
                </Button>
                {flag 
                ?   <span className={`${styles.cartPrice} ${addStyles.price}`}>{(product.cartCount)}</span>
                :   <span className={`${styles.cartPrice} ${addStyles.price}`}>{(product.cartPrice).toLocaleString()} ₽</span>
                }
                <Button 
                    id = {product.id} 
                    onClick={increasePrice} 
                    addStyles={addStyles.button}
                >
                    <img id = {product.id} className={styles.plusImage} src={plusImage} alt="" />
                </Button>
            </div>
        :   <Button 
                onClick={increasePrice} 
                id = {product.id} 
                addStyles={`${addStyles.bigButton} ${styles.button}` }
            >
                В корзину
            </Button>
    )
}


export default ToCartButtons;
