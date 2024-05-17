import styles from "./FavouritesProfile.module.scss";
import {instance} from "../../api/axios.ts";
import {useEffect, useState} from "react";
import {IFavourite} from "../../types/types.ts";
import starImage from "../../assets/images/star.svg";
import ToCartButtons from "../../common/ToCartButtons/ToCartButtons.tsx";
import {Link, useNavigate} from "react-router-dom";
import Button from "../../common/Button/Button.tsx";
const FavouritesProfile = () => {
    const [favourites, setFavourites] = useState<IFavourite[]>([])
    const navigate = useNavigate();
    const getFavourites = async (): Promise<void> => {
        try {
            const {data} = await instance.get('favourite/user');
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
                            <div key={favourite.id} className={styles.favourite}>
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
                : <div className={styles.catalogButtonContainer}>
                    <h2>Вы не добавили ни одного товара</h2>
                    <Button onClick={() => navigate('/products')} addStyles={styles.catalogButton}>
                        Перейти к каталогу
                    </Button>
                </div>
            }
        </div>
    )
}

export default FavouritesProfile;