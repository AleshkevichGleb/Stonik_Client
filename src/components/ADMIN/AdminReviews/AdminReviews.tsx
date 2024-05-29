import styles from "./AdminReviews.module.scss";
import reviewService from "../../../services/reviewService.ts";
import {useEffect, useState} from "react";
import {IReviewsData} from "../../../types/types.ts";
import AdminReviewItem from "./AdminReviewItem/AdminReviewItem.tsx";
import loaderImage from "../../../assets/images/loader-icon.svg";

const AdminReviews = () => {
    const [reviews, setReviews] = useState<IReviewsData[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const getReviews = async() => {
        try {
            setIsLoading(true)
            const reviews = await reviewService.getAllReviews();
            setReviews(reviews)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getReviews();
    }, []);

    if(isLoading) {
        return (
            <div className={styles.loaderContainer}>
                <img width={200} height={200} src={loaderImage} alt=""/>
            </div>
        )
    }
    return (
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