import {FC, useEffect, useState} from "react";
import {IProduct} from "../../../types/types.ts";
import styles from "./ProductFunctional.module.scss";
import checkMarkImage from "../../../assets/images/checkMark.svg"
import ToCartButtons from "../../../common/ToCartButtons/ToCartButtons.tsx";
import arrowImage from "../../../assets/images/arrow.svg"
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {instance} from "../../../api/axios.ts";

interface ProductFunctionalProps {
    product: IProduct | null,
    productId: string | undefined,
}

const ProductFunctional: FC<ProductFunctionalProps> = ({product, productId}) => {
    const [isOnFavourite, setIsOnFavourite] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(true);

    const checkFavourite = async() => {
        try {
            const {data} = await instance.post('/favourite/check', {
                productId
            })

            setIsOnFavourite(data.isFavourite)
        } catch (error) {
            console.log(error)
        }
    }

    const addFavourite = async () => {
        try {
             await instance.post('/favourite', {
                productId
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
        <div className={styles.product__functional}>
                {product?.amount as number > 0
                    ? <div className={styles.checkMark}>
                        <img src={checkMarkImage} alt="check mark"/>
                        <span className={styles.inStock}>В наличии</span>
                        {
                            isOnFavourite
                                ? <FavoriteIcon onClick={addFavourite} fontSize={'small'} color={'warning'}/>
                                :  <FavoriteBorderIcon onClick={addFavourite} fontSize={'small'}/>
                        }
                    </div>
                    :
                    <div className={styles.product__functional__amountBlock}>
                        <span className={styles.notInStock}>Нету в наличии</span>
                        {
                            isOnFavourite
                                ? <FavoriteIcon onClick={addFavourite} fontSize={'small'} color={'warning'}/>
                                :  <FavoriteBorderIcon onClick={addFavourite} fontSize={'small'}/>
                        }
                    </div>
                }
            <div>
                <Rating name="read-only" size = 'large' value={Number(product?.rating)} precision={0.5} readOnly />
            </div>
            {product?.isSale
                ? <div className={styles.priceBlock}>
                    <span className={styles.priceBlock__price}>{(Number(product.price)).toLocaleString()} BYN</span>
                    <span
                        className={styles.priceBlock__beforePrice}>{(Number(product.price) + Number(product.salePrice)).toLocaleString()} BYN
                    </span>
                    <span
                        className={styles.priceBlock__procent}>{((product.salePrice / Number(product.price + product.salePrice)) * 100).toFixed(2)} %
                    </span>
                </div>
                : <div className={styles.priceBlock}>
                    <span className={styles.priceBlock__price}>{(product?.price as number)} BYN</span>
                </div>
            }
            <span className={styles.product__NDS}>Цена указана с учетом НДС</span>
            <ToCartButtons
                addStyles={{button: styles.smallButton, count: styles.cartCount}}
                product={product}
            />
            <div className={styles.product__accordion}>
                <div className={styles.product__accordionTitleBLock} onClick={() => setIsActive(!isActive)}>
                    <span className={styles.product__accordion__title}>Характеристики</span>
                    <img className={isActive
                        ? `${styles.accordion__change} ${styles.accordion__change_active}`
                        : `${styles.accordion__change}`} src={arrowImage} alt="arrow"/>
                </div>

                <div className={isActive
                    ? `${styles.product__accordion__item} ${styles.product__accordion__item_active}`
                    : `${styles.product__accordion__item}`}
                >
                    {
                        product?.info.map((item, index) =>
                            <div
                                key={item.title}
                                className={index % 2 !== 0 ? styles.product__accordionBlock : styles.product__accordionBlock_2}
                            >
                                <span className={styles.product__accordionTitle}>{item.title}</span>
                                <span className={styles.product__accordionText}>{item.text}</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductFunctional;