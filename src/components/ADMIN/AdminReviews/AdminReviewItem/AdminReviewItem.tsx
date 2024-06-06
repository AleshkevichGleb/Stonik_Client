import {FC, useState} from "react";
import styles from "./AdminReviewItem.module.scss";
import Button from "../../../../common/Button/Button.tsx";
import reviewService from "../../../../services/reviewService.ts";
import {Link} from "react-router-dom";
import clearUser from "../../../../assets/images/clearUser.png";
import Rating from "@mui/material/Rating";
import {toast} from "react-toastify";
import formatTimeDifference from "../../../../helpers/getTimeAgo.ts";
import {IReviewsData} from "../../../../types/types.ts";
import replaceLocalHost from "../../../../helpers/replaceLocalHost.ts";
interface AdminReviewItemProps {
    review: IReviewsData,
    getReviews: () => void,
}

const AdminReviewItem: FC<AdminReviewItemProps> = ({review, getReviews}) => {
    const [isEditReview, setIsEditReview] = useState(false);
    const [reply, setReply] = useState('');

    return (
        <div key={review.id} className={styles.reviewItem}>
            <Button
                addStyles={styles.deleteButton}
                onClick={async () => {
                    await reviewService.deleteReview(review.id, review.productId);
                    await getReviews()
                }}
            >
                Удалить
            </Button>
            {
                (!review.reply.length) &&
                <Button
                    addStyles={styles.replyButton}
                    onClick={() => setIsEditReview(!isEditReview)}
                >
                    Ответить
                </Button>
            }
            <div className={styles.review__data}>
                <div className={styles.review__product}>
                    <Link to={`/products/${review.product.type}/${review.product.id}`}>
                        <img className={styles.review__productImage} src={replaceLocalHost(review.product.images[0])} alt=""/>
                    </Link>
                    <span  className={styles.review__productTitle}>{review.product.name}</span>
                </div>
                <div className={styles.reviewInfo}>
                    <div className={styles.review__user}>
                        <img className={styles.review__image}
                             src={review.user.image ? replaceLocalHost(review.user.image) : clearUser} alt=""/>
                        <div className={styles.review__userInfo}>
                            <span>{review.user.name} {review.user.surname}</span>
                            <Rating name="read-only" size="small" value={Number(review.rating)}
                                    precision={0.5} readOnly/>
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
                            <textarea value={reply} onChange={e => setReply(e.target.value)} maxLength={1000}
                                      className={styles.review__editBLockTextArea}/>
                            <Button addStyles={styles.review__editBLockButton} onClick={async () => {
                                if (reply.length < 10) return toast.error('Слишком маленький ответ')
                                await reviewService.updateReview(review.id, reply);
                                await getReviews();
                                setIsEditReview(false)
                            }}>
                                Отправить
                            </Button>
                        </div>
                    }
                </div>
            </div>
            <div className={styles.reviewDate}>
                <span>{formatTimeDifference(review.createdAt)}</span>
            </div>
        </div>
    )
}

export default AdminReviewItem;