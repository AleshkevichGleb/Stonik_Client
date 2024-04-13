import {FC, useEffect, useState, MouseEvent} from 'react';
import {useParams} from "react-router-dom";
import {IProduct, IReview} from "../../types/types.ts";
import productService from "../../services/productService.ts";
import CheckMark from "../../common/CheckMark/CheckMark.tsx";
import styles from "./Product.module.scss";
import ProductFunctional from "./ProductFunctional/ProductFunctional.tsx";
import Slider from "../../components/Slider/Slider.tsx";
import Title from "../../common/Title/Title.tsx";
import BackLink from "../../common/BackLink/BackLink.tsx";
import reviewService from "../../services/reviewService.ts";
const Product: FC = () => {
    const [product, setProduct] = useState<IProduct | null>(null)
    const {id} = useParams();
    const [mainImage, setMainImage] = useState<{src: string, alt: string}>({
        src: '',
        alt: ''
    });
    const [reviews, setReviews] = useState<IReview[]>([]);

    const width = window.screen.width;
    const toShowSlides = width < 600 ? 4 : 5 ;
    const handleImage = (e:MouseEvent<HTMLImageElement>) => {
        const {src, alt} = e.currentTarget;
        setMainImage({src: src, alt: alt});
    }
    const getProduct = async() => {
        const data = await productService.getOne(id as string);
        if(data) {
            setProduct(data);
            setMainImage({
                src: data.images[0],
                alt: data.name
            })

            const reviews = await reviewService.getReviews(data.id);
            setReviews(reviews?.data)
        }

    }
    useEffect(() => {
        getProduct();
    }, []);

    return (
        <div className={styles.product__container}>
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
                <ProductFunctional product = {product}/>
            </div>
            <div className={styles.product__description}>
                <p className={styles.product__description__title}>Описание</p>
                <div className={styles.line}></div>
                <span className={styles.product__description__text}>{product?.description}</span>
            </div>

            {
                reviews.length > 0 &&
                <div>
                    <div className={styles.product__description}>
                        <p className={styles.product__description__title}>Отзывы</p>
                        <div className={styles.line}></div>
                        <div>
                            {reviews.map(review =>
                                <div>
                                    <div>
                                        <div>
                                            <img width={50} height={50} src={review.user.image} alt=""/>
                                            <div>
                                                <span>{review.user.name} {review.user.surname}</span>
                                                <span>{review.rating}</span>
                                            </div>
                                        </div>
                                        <span>
                                            {review.message}
                                        </span>
                                    </div>
                                    <div>
                                        <span>{review.createdAt}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }

            <CheckMark/>
        </div>
    )
};

export default Product;