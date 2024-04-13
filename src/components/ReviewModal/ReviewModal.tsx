import {FC, useEffect, useState} from "react";
import styles from "./ReviewModal.module.scss";
import closeImage from "../../assets/images/cross.svg";
import {IProduct} from "../../types/types.ts";
import Button from "../../common/Button/Button.tsx";
import {Rating} from "@mui/material";
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
interface ReviewModalProps {
    isActiveModal: boolean
    setIsActiveModal: (isActiveModal: boolean) => void
    product: IProduct | null
}

const ReviewModal: FC<ReviewModalProps> = ({isActiveModal, setIsActiveModal, product}) => {

    const [review, setReview] = useState<string>('');

    useEffect(() => {
        if(isActiveModal) {
            window.addEventListener('keyup', closePopUp);
            document.body.style.overflowY = 'hidden';
        }
        return () => {
            window.removeEventListener('keyup', closePopUp);
            document.body.style.overflowY = 'auto';
        }
    }, []);

    const closePopUp = (e: KeyboardEvent) => {
        const keyPressed = e.key;

        if(keyPressed === 'Escape') {
            setIsActiveModal(false)
        }
    }

    return(
        <div className={styles.container}>
            <div className = {styles.block}>
                <button className = {styles.closeModal} onClick={() => setIsActiveModal(false)}>
                    <img src={closeImage} alt=""/>
                </button>
                <div className={styles.productInfo}>
                    <img width={100} height={100} src={product?.images[0]} alt=""/>
                    <div className={styles.productInfo__text}>
                        <span className={styles.product__title}>{product?.name}</span>
                        <span className={styles.product__desc}>{product?.description}</span>
                    </div>
                </div>
                <div>
                    <Rating
                        name="text-feedback"
                        // value={value}
                        readOnly
                        defaultValue={2}
                        getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={0.5}
                        // icon={<FavoriteIcon fontSize="inherit" />}
                        // emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    />
                </div>
                <div className={styles.textAreaBlock}>
                    <label className={styles.label} htmlFor="story">
                        <span className={styles.labelText}>Комментарий</span>
                        <span>До 1000 символов</span>
                    </label>
                    <textarea
                        maxLength={1000}
                        placeholder={'Поделитесь впечатлением'}
                        className={styles.textarea}
                        id="story"
                        rows={5}
                        cols={33}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    >
                    </textarea>
                </div>
                <Button addStyles={styles.button}>
                    Отправить
                </Button>
            </div>
        </div>
    )
}

export default ReviewModal;