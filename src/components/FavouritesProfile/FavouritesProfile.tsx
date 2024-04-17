import styles from "./FavouritesProfile.module.scss";
import {instance} from "../../api/axios.ts";
import {useEffect, useState} from "react";
import {IFavourite} from "../../types/types.ts";
import starImage from "../../assets/images/star.svg";
import ToCartButtons from "../../common/ToCartButtons/ToCartButtons.tsx";
import {Link} from "react-router-dom";
// import ProductItem from "../ProductItem/ProductItem.tsx";
const FavouritesProfile = () => {
    const [favourites, setFavourites] = useState<IFavourite[]>([])
    const getFavourites = async (): Promise<void> => {
        try {
            const {data} = await instance.get('favourite/user');
            console.log(data)
            setFavourites(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFavourites().then()
    }, []);

    return(
        <div className={styles.container}>
            {favourites.length > 0
                ? <div className={styles.favouriteBlock}>
                    {
                        favourites.map(favourite =>
                            <div className={styles.favourite}>
                                <Link to = {`/products/${favourite.product.type}/${favourite.product.id}`} className={styles.imageBlock}>
                                    <img className={styles.image} src={favourite.product.images[0]} alt=""/>
                                </Link>
                                <div className={styles.favourite__info}>
                                    <div>
                                        <span></span>
                                    </div>
                                    <span>{favourite.product.type}</span>
                                    <span>{favourite.product.name}</span>
                                    <div className={styles.rating}>
                                        <img src={starImage} alt=""/>
                                        <span>{favourite.product.rating ? favourite.product.rating : 'Нет отзывов'}</span>
                                    </div>
                                    <ToCartButtons
                                        product={favourite.product}
                                        addStyles={{count: styles.count, button: styles.button, container: styles.buttonsContainer, bigButton: styles.bigButton}}
                                    />
                                </div>
                            </div>
                            // <ProductItem product={favourite.product}/>
                        )
                    }
                </div>
                : <h2>AAAAAAAAAAAAAAA</h2>
            }
        </div>
    )
}

export default FavouritesProfile;