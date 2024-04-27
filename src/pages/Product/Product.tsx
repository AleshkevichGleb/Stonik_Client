import {FC, useEffect, useState, MouseEvent} from 'react';
import {useParams} from "react-router-dom";
import {IProduct, IReview} from "../../types/types.ts";
import CheckMark from "../../common/CheckMark/CheckMark.tsx";
import styles from "./Product.module.scss";
import ProductFunctional from "./ProductFunctional/ProductFunctional.tsx";
import Slider from "../../components/Slider/Slider.tsx";
import Title from "../../common/Title/Title.tsx";
import BackLink from "../../common/BackLink/BackLink.tsx";
import reviewService from "../../services/reviewService.ts";
import Rating from '@mui/material/Rating';
import Button from "../../common/Button/Button.tsx";
import ReviewModal from "../../components/ReviewModal/ReviewModal.tsx";
import clearUser from "../../assets/images/clearUser.png";
import {AxiosError} from "axios";
import loadImage from "../../assets/images/loader-icon.svg";
import {instance} from "../../api/axios.ts";
import formatTimeDifference from "../../helpers/getTimeAgo.ts";
import {useAppSelector} from "../../hooks/useReducer.ts";
import {toast} from "react-toastify";

const Product: FC = () => {
    const {isAuth, user} = useAppSelector(state => state.user);
    const [product, setProduct] = useState<IProduct | null>(null)
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [mainImage, setMainImage] = useState<{src: string, alt: string}>({
        src: '',
        alt: ''
    });
    const [isActiveModal, setIsActiveModal] = useState<boolean>(false)
    const [reviews, setReviews] = useState<IReview[]>([]);

    const width = window.screen.width;
    const toShowSlides = width < 600 ? 4 : 5 ;
    const handleImage = (e:MouseEvent<HTMLImageElement>) => {
        const {src, alt} = e.currentTarget;
        setMainImage({src: src, alt: alt});
    }
    const getProduct = async() => {
        try {
            setIsLoading(true);
            const {data} = await instance.get<IProduct>(`/products/${id}`)
            setProduct(data);
            setMainImage({
                src: data.images[0],
                alt: data.name
            })

            const reviews = await reviewService.getReviews(data.id);
            setReviews(reviews?.data)

        } catch (e) {
            console.log(e)
            if(e instanceof AxiosError) {
                setError(e.response?.data.message)
            }

        } finally {
            setIsLoading(false);
        }

    }
    useEffect(() => {
        getProduct();
    }, [isActiveModal]);

    const sendReview = async () => {
        if(!isAuth) {
            toast('Необходимо войти в аккаунта');
            return
        }
        setIsActiveModal(true);
    }


    if(error) {
        return (
            <div className={styles.errorContainer}>
                <BackLink title={'Назад'}/>
                <h2 className={styles.errorText}>{error}</h2>
            </div>
        )
    }

    if(isLoading) {
        return (
            <div className={styles.loadContainer}>
                <img width={300} height={300} src={loadImage} alt=""/>
            </div>
        )
    }



    return (
        <div className={styles.product__container}>
            {
                isActiveModal && <ReviewModal isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} product={product}/>
            }
            <BackLink title='Назад'/>
            <div className={styles.hr}></div>
            <Title title_p1={product?.name}/>
            <div className={styles.hr}></div>
            <div className={styles.product}>
                <div className={styles.product__photos}>
                    <div>
                        <img className={styles.bigImage} src={mainImage.src} alt={mainImage.alt} />
                    </div>
                    <Slider addStyles={{dots: styles.addStyleDots, dot: styles.addStyleDot, toShow: toShowSlides, addSlider: styles.slider}}>
                        {
                            product &&
                            product?.images.map(image =>
                                    <img
                                        onClick={handleImage}
                                        className={styles.slider__image}
                                        key = {image}
                                        src={image}
                                        alt={product?.name}
                                    />
                            )
                        }
                    </Slider>
                </div>
                <ProductFunctional isAuth={isAuth}product = {product} productId={id} user={user}/>
            </div>
            <div className={styles.product__description}>
                <p className={styles.product__description__title}>Описание</p>
                <div className={styles.line}></div>
                <span className={styles.product__description__text}>{product?.description}</span>
            </div>
            <div className={styles.product__description}>
                <p className={styles.product__description__title}>Отзывы</p>
                <div className={styles.line}></div>
                {
                    reviews.length === 0
                    ?
                     <div className={styles.clearReviewContainer}>
                        <h4>Еще нет отзывов, будьте первым! </h4>
                         <Button onClick={sendReview} addStyles={styles.review__button}>
                             Оставить отзыв
                         </Button>
                     </div>
                    :<>
                        <Button onClick={sendReview} addStyles={styles.review__button}>
                            Оставить отзыв
                        </Button>
                        <div className = {styles.reviewContainer}>
                            {reviews.map(review =>
                                <div key = {review.id} className = {styles.review}>
                                    <div className={styles.reviewInfo}>
                                        {
                                            user.role === 'admin'&&
                                            <Button
                                                addStyles={styles.removeButton}
                                                onClick={async () => {
                                                    await reviewService.deleteReview(review.id, review.productId);
                                                    await getProduct();
                                                }}
                                            >
                                                Удалить
                                            </Button>
                                        }
                                        <div className={styles.review__user}>
                                            <img className = {styles.review__image} src={review.user.image ? review.user.image : clearUser} alt=""/>
                                            <div className={styles.review__userInfo}>
                                                <span>{review.user.name} {review.user.surname}</span>
                                                <Rating name="read-only" size="small"  value={Number(review.rating)} precision={0.5} readOnly />
                                            </div>
                                        </div>
                                        <span className={styles.review__message}>
                                            {review.message}
                                        </span>
                                    </div>
                                    <div className={styles.reviewDate}>
                                        <span>{formatTimeDifference(review.createdAt)}</span>
                                        {/*<span>{formatTimeDifference('2024-04-23T16:16:15.483Z')}</span>*/}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                }
            </div>

            <CheckMark/>
        </div>
    )
};

export default Product;