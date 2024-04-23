import plusImage from "../../assets/images/plus.svg";
import minusImage from "../../assets/images/minus.svg";
import {FC, MouseEvent, useEffect, useState} from "react";
import Button from "../Button/Button";
import styles from "./ToCartButtons.module.scss";
import {IProduct} from "../../types/types.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/useReducer.ts";
import {deleteProduct, IBasketProduct} from "../../store/slices/basket.slice.ts";
import {addProduct} from "../../store/slices/basket.slice.ts";
import BasketService from "../../services/basketService.ts";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

interface ICahngeCountData  {
    existingProduct: any,
}
interface ToCartButtonsProps {
    product: IProduct | null,
    addStyles: any,
    flag?: boolean
}

const ToCartButtons: FC<ToCartButtonsProps> = ({product, addStyles, flag}) => {
    const { products} = useAppSelector(state => state.basket);
    const {isAuth} = useAppSelector(state => state.user);
    const [basketProduct, setBasketProduct] = useState<IBasketProduct | null>(null)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(product) {
            const productData = products.find(prod => +prod.product.id === +product?.id)
            if(productData) setBasketProduct(productData);
        }
    }, [product]);
    const increasePrice = async(e: MouseEvent<HTMLButtonElement>) => {
        if(!isAuth) {
            toast('Необходимо войти в аккаунта');
            return
        }
        const {id} = e.currentTarget;
        const data = await BasketService.changeCount(id, 1);

        if(data instanceof AxiosError) {
            return toast.error(data.response?.data.message)
        }


        if(product) dispatch(addProduct(product))
        setBasketProduct({product: {...product}, count: data.existingProduct.count} as IBasketProduct)
    }


    const decreasePrice = async (e: MouseEvent<HTMLButtonElement>) => {
        const {id} = e.currentTarget;
        const data:ICahngeCountData= await BasketService.changeCount(id, -1);

        if(data instanceof AxiosError) {
            return toast.error(data.response?.data.message)

        }
        if(product) dispatch(deleteProduct(product))

        if(data.existingProduct) setBasketProduct({...basketProduct, count: data.existingProduct.count} as IBasketProduct)
        else setBasketProduct({...basketProduct, count: 0} as IBasketProduct)

    }

    return (
        (basketProduct && basketProduct?.count > 0)
        ?   <div className={`${styles.buttonsContainer} ${addStyles.container}`}>
                <span className={addStyles.count}>{basketProduct.count}</span>
                <Button 
                    id = {product?.id.toString()}
                    onClick={decreasePrice} 
                    addStyles={addStyles.button}
                >
                    <img src={minusImage} alt="minus"/>
                </Button>
                {flag
                ?   <span className={`${styles.cartPrice} ${addStyles.price}`}>{(basketProduct.count)}</span>
                :   <span className={`${styles.cartPrice} ${addStyles.price}`}>{(+basketProduct?.product?.price * +basketProduct.count).toLocaleString()} BYN</span>
                }
                <Button 
                    id = {product?.id.toString()}
                    onClick={increasePrice} 
                    addStyles={addStyles.button}
                >
                    <img src={plusImage} alt="" />
                </Button>
            </div>
        :   <Button 
                onClick={increasePrice} 
                id = {product?.id.toString()}
                addStyles={`${addStyles.bigButton} ${styles.button}` }
            >
                В корзину
            </Button>
    )
}


export default ToCartButtons;
