import {FC, useState} from "react";
import Button from "../../common/Button/Button.tsx";
import reviewService from "../../services/reviewService.ts";
import clearUser from "../../assets/images/clearUser.png";
import Rating from "@mui/material/Rating";
import formatTimeDifference from "../../helpers/getTimeAgo.ts";
import styles from "./ProductReviewItem.module.scss";
import {IRegistrationUser, IReview} from "../../types/types.ts";
import {toast} from "react-toastify";

interface ProductReviewItemProps {
    user: IRegistrationUser,
    review: IReview,
    getReviews: (productId: string | number) => void,
}

const ProductReviewItem: FC<ProductReviewItemProps> = ({user, review, getReviews}) => {
    const [isEditReview, setIsEditReview] = useState(false);
    const [reply, setReply] = useState('');

    return (
        <div key={review.id} className={styles.review}>
            <div className={styles.reviewInfo}>
                {
                    user.role === 'admin' &&
                    <Button
                        addStyles={styles.removeButton}
                        onClick={async () => {
                            await reviewService.deleteReview(review.id, review.productId);
                            getReviews(review.productId);
                        }}
                    >
                        Удалить
                    </Button>
                }
                {
                    (user.role === 'admin' && !review.reply.length) &&
                    <Button
                        addStyles={styles.replyButton}
                        onClick={() => setIsEditReview(!isEditReview)}
                    >
                        Ответить
                    </Button>
                }

                <div className={styles.review__user}>
                    <img className={styles.review__image}
                         src={review.user.image ? review.user.image : clearUser} alt=""/>
                    <div className={styles.review__userInfo}>
                        <span>{review.user.name} {review.user.surname}</span>
                        <Rating name="read-only" size="small" value={Number(review.rating)} precision={0.5} readOnly/>
                    </div>
                </div>
                <span className={styles.review__message}>
                    {review.message}
                </span>
                {review.reply.length > 0 &&
                    <div className={styles.review__replyBlock}>
                        <span className={styles.review__replyBlockTitle}>
                            Ответ от бренда:
                        </span>
                        <span>
                            {review.reply}
                        </span>
                    </div>
                }
                {isEditReview &&
                    <div className={styles.review__editBLock}>
                        <textarea value={reply} onChange={e => setReply(e.target.value)} maxLength={1000} className={styles.review__editBLockTextArea}/>
                        <Button addStyles={styles.review__editBLockButton} onClick={async() => {
                            if(reply.length < 10) return toast.error('Слишком маленький ответ')
                            await reviewService.updateReview(review.id, reply);
                            getReviews(review.productId);
                            setIsEditReview(false)
                        }}>
                            Отправить
                        </Button>
                    </div>
                }
            </div>
            <div className={styles.reviewDate}>
                <span>{formatTimeDifference(review.createdAt)}</span>
                {/*<span>{formatTimeDifference('2024-04-23T16:16:15.483Z')}</span>*/}
            </div>
        </div>
    )
}

export default ProductReviewItem;