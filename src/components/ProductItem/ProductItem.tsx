import {FC, useEffect, useState} from "react";
import styles from "./ProductItem.module.scss";
import {IProduct} from "../../types/types.ts";
import {Link} from "react-router-dom";
import Button from "../../common/Button/Button.tsx";
import ToCartButtons from "../../common/ToCartButtons/ToCartButtons.tsx";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {instance} from "../../api/axios.ts";
import {useAppSelector} from "../../hooks/useReducer.ts";
import {toast} from "react-toastify";
import productService from "../../services/productService.ts";
import {AxiosError} from "axios";
interface ProductItemProps {
    product: IProduct,
    setIsChooseFilter: (setIsChooseFilter: boolean) => void,
    isChooseFilter: boolean
}

const ProductItem: FC<ProductItemProps> = ({product, setIsChooseFilter, isChooseFilter}) => {
    const {isAuth, user} = useAppSelector(state => state.user);
    const [isOnFavourite, setIsOnFavourite] = useState<boolean>(false);

    const checkFavourite = async() => {
        try {
            const {data} = await instance.post('/favourite/check', {
                productId: product.id
            })

            setIsOnFavourite(data.isFavourite)
        } catch (error) {
            console.log(error)
        }
    }

    const addFavourite = async () => {
        if(!isAuth) {
            toast('Необходимо войти в аккаунта');
            return
        }
        try {
            await instance.post('/favourite', {
                productId: product.id
            })
            setIsOnFavourite(!isOnFavourite)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if(isAuth)checkFavourite();
    }, []);

    return (
        <div className={styles.product} key={product.id}>
            <div className={product.isSale ? styles.product__imageBlock : styles.product__imageBlockNotSale}>
                <img
                    src={product.images[0]}
                    alt={'product'}
                    className={styles.product__image}
                />
            </div>
            <div className={styles.product__type}>
                {product.type}
                {
                    isOnFavourite
                        ? <FavoriteIcon onClick={addFavourite} fontSize={'small'} color={'warning'}/>
                        :  <FavoriteBorderIcon onClick={addFavourite} fontSize={'small'}/>
                }
            </div>
            <h2 className={styles.product__title}>{product.name}</h2>
            <div className={styles.product__priceContainer}>

                <span className={styles.product__price}>
                    {product.price.toLocaleString()} BYN
                </span>
                {
                    product.isSale &&
                    <span className={styles.product__beforePrice}>
                        {(Number(product.price) + Number(product.salePrice)).toLocaleString()} BYN
                    </span>
                }
            </div>
            <Link to={`/products/${product.type}/${product.id}`}>
                <Button addStyles={styles.button}>Подробнее</Button>
            </Link>
            {
                user.role === 'admin'
                ? <Button addStyles={styles.deleteButton}  onClick={async() => {
                        const data = await productService.delete(product.id)
                        if(data instanceof AxiosError) {
                            return  toast.error(data.response?.data.message || data.response?.data.error);
                        }

                        toast.success(data.message);
                        setIsChooseFilter(!isChooseFilter);
                    }}>
                        Удалить
                    </Button>
                :   <ToCartButtons
                        addStyles={{bigButton: styles.button, button: styles.smallButton, count: styles.cartCount}}
                        product={product}
                    />
            }
        </div>
    )
}

export default ProductItem;