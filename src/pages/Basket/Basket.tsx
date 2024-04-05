import {MouseEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import ToCartButtons from "../../common/ToCartButtons/ToCartButtons";
import styles from "./Basket.module.scss";
import EmptyBasket from "./EmptyBasket/EmptyBasket";
import {useAppDispatch, useAppSelector} from "../../hooks/useReduceer.ts";
import {removeFromBasket} from "../../store/slices/basket.slice.ts";
import basketService from "../../services/basketService.ts";
import crossImage from "../../assets/images/cross.svg";


const Basket = () => {
    // const {products} = useSelector(state => state.products);
    const { products,basketPrice } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [basketCount, setBasketCount] = useState(0);
    useEffect(() => {
        let fullCount = 0;
        products.forEach(product => {
            fullCount += +product.count;
        })
        setBasketCount(fullCount);
    }, [products])

    const removeProduct = async (e: MouseEvent<HTMLButtonElement>) => {
        const {id} = e.currentTarget;
        const data = await basketService.changeCount(id, -99999)
        console.log(data)
        dispatch(removeFromBasket(id))

    }

    
    return (
        <div className={styles.basket__container}>
            {
                products.length
                ? <div className={styles.products}>
                    {products.map(product =>
                        <div className={styles.product} key={product.product.id}>
                            <div className={styles.product__textBlock}>
                                <img 
                                    className={styles.produt__image} 
                                    src = {product.product.images[0]}
                                    alt = {product.product.name}
                                    onClick={() => navigate(`/products/${product.product.id}`)}
                                />
                                <div className={styles.product__textInfo}>
                                    <span className={styles.product__title}>{product.product.name}</span>
                                    <span className={styles.product__description}>{product.product.description}</span>
                                </div>
                            </div>
                            <div className={styles.product__functional}>
                                <ToCartButtons  flag={true} addStyles={{button: styles.smallButton, count: styles.cartCount, price: styles.addStylePrice}} product={product.product}/>
                                
                                <span className={styles.product__price}>{(product.product.price * product.count).toLocaleString()} BYN</span>
                                <button  
                                    id = {String(product.product.id)}
                                    className={styles.smallButton}
                                    onClick={removeProduct}
                                >
                                    <img src={crossImage} alt="cross"/>
                                </button>
                             </div>
                        </div>
                    )}  
                    <div className={styles.finalPriceBlock}>
                        <span>Сумма вашего заказа: <span className={styles.finalPrice}>{basketPrice.toFixed(1)}  BYN</span></span>
                        <span>Количество товаров: <span className={styles.finalPrice}>{basketCount}</span></span>
                        <Button 
                            addStyles={styles.button}
                            onClick={() => navigate('/order')}
                        >
                            Оформить заказ
                        </Button>
                    </div>
                    </div>
                : <EmptyBasket/>
            }
        </div>
    )
}

export default Basket;