import {FC, useEffect, useState} from "react";
import {IProduct, IRegistrationUser} from "../../../types/types.ts";
import styles from "./ProductFunctional.module.scss";
import checkMarkImage from "../../../assets/images/checkMark.svg"
import ToCartButtons from "../../../common/ToCartButtons/ToCartButtons.tsx";
import arrowImage from "../../../assets/images/arrow.svg"
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {instance} from "../../../api/axios.ts";
import {toast} from "react-toastify";
import Button from "../../../common/Button/Button.tsx";
import productService from "../../../services/productService.ts";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from "@mui/material/Paper";

interface ProductFunctionalProps {
    product: IProduct | null,
    productId: string | undefined,
    isAuth: boolean,
    user: IRegistrationUser,
}

const ProductFunctional: FC<ProductFunctionalProps> = ({product, productId, isAuth, user}) => {
    const [isOnFavourite, setIsOnFavourite] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(true);
    const navigate = useNavigate();
    const [productAmount, setProductAmount] = useState<string>(String(product?.amount));
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
            if(!isAuth) {
                toast('Необходимо войти в аккаунта');
                return
            }
             await instance.post('/favourite', {
                productId
            })
            setIsOnFavourite(!isOnFavourite)
        } catch (error) {
            console.log(error)
        }
    }

    const updateAmount = async() => {
        try {
            await instance.patch(`/products/${product?.id}`, {
                amount: productAmount,
            })
            toast.success('Успешно обновлено')
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        checkFavourite();
    }, []);
    return (
        <div className={styles.product__functional}>
                {product?.amount as number > 0
                    ? <div className={styles.checkMark}>
                        {
                            user.role === 'admin'
                            ?
                                <Paper
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Количество на складе"
                                        inputProps={{ 'aria-label': 'search amount',maxLength: 5 }}
                                        value = {productAmount}
                                        onChange = {(e) => {
                                            if (/\D/.test(e.target.value)) {
                                                return;
                                            }
                                            setProductAmount(e.target.value)
                                        }}
                                    />
                                    <IconButton onClick = {updateAmount} type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            : <>

                                <img src={checkMarkImage} alt="check mark"/>
                                <span className={styles.inStock}>В наличии</span>
                                {
                                    isOnFavourite
                                        ? <FavoriteIcon onClick={addFavourite} fontSize={'small'} color={'warning'}/>
                                        :  <FavoriteBorderIcon onClick={addFavourite} fontSize={'small'}/>
                                }
                                </>
                        }

                    </div>
                    :
                    <div className={styles.product__functional__amountBlock}>
                        {
                            user.role === 'admin'
                            ?
                                <Paper
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Количество на складе"
                                        inputProps={{ 'aria-label': 'search amount',maxLength: 5 }}
                                        value = {productAmount}
                                        onChange = {(e) => {
                                            if (/\D/.test(e.target.value)) {
                                                return;
                                            }
                                            setProductAmount(e.target.value)
                                        }}
                                    />
                                    <IconButton onClick = {updateAmount} type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            : <>
                                <span className={styles.notInStock}>Нету в наличии</span>
                                {
                                    isOnFavourite
                                        ? <FavoriteIcon onClick={addFavourite} fontSize={'small'} color={'warning'}/>
                                        :  <FavoriteBorderIcon onClick={addFavourite} fontSize={'small'}/>
                                }
                            </>
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
            {
                user.role === 'admin'
                ?  <Button addStyles={styles.deleteButton} onClick={async() => {
                        const data = await productService.delete(product?.id as string)
                        if(data instanceof AxiosError) {
                            return  toast.error(data.response?.data.message || data.response?.data.error);
                        }

                        toast.success(data.message);
                        navigate('/products');
                    }}>
                        Удалить
                    </Button>
                :  <ToCartButtons
                        addStyles={{button: styles.smallButton, count: styles.cartCount}}
                        product={product}
                    />
            }
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