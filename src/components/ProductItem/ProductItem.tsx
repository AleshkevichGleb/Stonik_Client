import {FC, useEffect, useState} from "react";
import styles from "./ProductItem.module.scss";
import {IProduct} from "../../types/types.ts";
import {Link} from "react-router-dom";
import Button from "../../common/Button/Button.tsx";
import ToCartButtons from "../../common/ToCartButtons/ToCartButtons.tsx";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {instance} from "../../api/axios.ts";
interface ProductItemProps {
    product: IProduct,
}

const ProductItem: FC<ProductItemProps> = ({product}) => {

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
        checkFavourite();
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
            <ToCartButtons
                addStyles={{bigButton: styles.button, button: styles.smallButton, count: styles.cartCount}}
                product={product}
            />
        </div>
    )
}

export default ProductItem;