import styles from "./AdminReviews.module.scss";
import reviewService from "../../../services/reviewService.ts";
import {useEffect, useState} from "react";
import {IReviewsData} from "../../../types/types.ts";
import clearUser from "../../../assets/images/clearUser.png";
import Rating from "@mui/material/Rating";
import formatTimeDifference from "../../../helpers/getTimeAgo.ts";
import Button from "../../../common/Button/Button.tsx";

import {Link} from "react-router-dom";
const AdminReviews = () => {
    const [reviews, setReviews] = useState<IReviewsData[]>([])
    const getReviews = async() => {
        try {
            const reviews = await reviewService.getAllReviews();
            setReviews(reviews)
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        getReviews();
    }, []);
    
    return(
        <div className={styles.container}>
            {
                reviews.length
                ? <div className={styles.reviewsContainer}>
                        {reviews.map((review) =>
                            <div key={review.id} className={styles.reviewItem}>
                                <Button
                                    addStyles={styles.deleteButton}
                                    onClick={async() => {
                                         await reviewService.deleteReview(review.id, review.productId);
                                         await getReviews()
                                    }}
                                >
                                    Удалить
                                </Button>
                                <div className={styles.review__data}>
                                    <div className={styles.review__product}>
                                        <Link to = {`/products/${review.product.type}/${review.product.id}`}>
                                            <img className={styles.review__productImage} src={review.product.images[0]} alt=""/>
                                        </Link>
                                        <span>{review.product.name}</span>
                                    </div>
                                    <div className={styles.reviewInfo}>
                                        <div className={styles.review__user}>
                                            <img className={styles.review__image}
                                                 src={review.user.image ? review.user.image : clearUser} alt=""/>
                                            <div className={styles.review__userInfo}>
                                                <span>{review.user.name} {review.user.surname}</span>
                                                <Rating name="read-only" size="small" value={Number(review.rating)}
                                                        precision={0.5} readOnly/>
                                            </div>
                                        </div>
                                        <span className={styles.review__message}>
                                            {review.message}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.reviewDate}>
                                    <span>{formatTimeDifference(review.createdAt)}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    : <h2 className={styles.clearReviewsTitle}>Пока нет отзывов</h2>
            }
        </div>
    )
}

export default AdminReviews;