import styles from "./AdminReviews.module.scss";
import reviewService from "../../../services/reviewService.ts";
import {useEffect, useState} from "react";
import {IReviewsData} from "../../../types/types.ts";
import AdminReviewItem from "./AdminReviewItem/AdminReviewItem.tsx";

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
                            <AdminReviewItem
                                key = {review.id}
                                review={review}
                                getReviews={getReviews}
                            />
                        )}
                    </div>
                    : <h2 className={styles.clearReviewsTitle}>Пока нет отзывов</h2>
            }
        </div>
    )
}

export default AdminReviews;