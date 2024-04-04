import{ FC } from "react";
import styles from "./ProductItem.module.scss";
import {IProduct} from "../../types/types.ts";
import {Link} from "react-router-dom";
import Button from "../../common/Button/Button.tsx";
import ToCartButtons from "../../common/ToCartButtons/ToCartButtons.tsx";
interface ProductItemProps {
    product: IProduct,
}

const ProductItem: FC<ProductItemProps> = ({product}) => {

    return (
        <div className={styles.product} key={product.id}>
            <div className={product.isSale ? styles.product__imageBlock : styles.product__imageBlockNotSale}>
                <img
                    src={product.images[0]}
                    alt={'product'}
                    className={styles.product__image}
                />
            </div>
            <span className={styles.product__type}>{product.type}</span>
            <h2 className={styles.product__title}>{product.name}</h2>
            <div className={styles.product__priceContainer}>

                <span className={styles.product__price}>
                    {product.price.toLocaleString()} ₽
                </span>
                {
                    product.isSale &&
                    <span className={styles.product__beforePrice}>
                        {(Number(product.price) + Number(product.salePrice)).toLocaleString()} ₽
                    </span>
                }
            </div>
            <Link to={`/products/${product.id}`}>
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