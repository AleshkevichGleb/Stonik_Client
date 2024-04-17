import styles from "./ReviewsProfile.module.scss";
import orderService from "../../services/orderService.ts";
import {AxiosError} from "axios";
import {useEffect, useState} from "react";
import {IOrder} from "../../types/types.ts";
import Loader from "../../assets/images/loader-icon.svg";
import {Link} from "react-router-dom";
import sliceText from "../../helpers/sliceText.ts";
import Button from "../../common/Button/Button.tsx";
import ReviewModal from "../ReviewModal/ReviewModal.tsx";


const ReviewsProfile = () => {
    const [history, setHistory] = useState<(IOrder & { hasReviewed: boolean})[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
    const getHistory = async(): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await orderService.getDeliveredOrders();
            if(response instanceof AxiosError) {
                console.log(response)
            }
            setHistory(response?.data);
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getHistory();
    }, [isActiveModal]);


    if(isLoading) {
        return (
            <div className={styles.loaderContaienr}>
                <img width = {250} src={Loader} alt=""/>
            </div>
        )
    }

    return(
        <div className={styles.container}>
            {history.length > 0 ? (
                <div className={styles.order__block}>
                    {
                        history.map((order) =>
                            <div className = {styles.order} key={order.id}>
                                {
                                    isActiveModal && <ReviewModal isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} product={order.product}/>
                                }
                                <div className={styles.order__top}>
                                    <Link to = {`/products/${order.product.type}/${order.product.id}`}>
                                        <img width={170} height={170} src={order.product.images[0]} alt=""/>
                                    </Link>
                                    <div className={styles.order__product}>
                                        <span>{order.product.price} руб.</span>
                                        <span>{order.product.name}</span>
                                        <span>{sliceText(order.product.description, 80)}</span>
                                        <span className={styles.delivered}>{order.status}</span>
                                    </div>
                                </div>
                                <div className={styles.order__down}>
                                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                                    {order.hasReviewed &&
                                        <span>Вы уже оставляли отзыв на этот товар</span>
                                    }
                                    <Button addStyles={styles.button} onClick={() => setIsActiveModal(true)}>
                                        Оставить отзыв
                                    </Button>
                                </div>
                            </div>
                        )
                    }
                </div>
            ) : (
                <div className={styles.loaderContaienr}>
                    <h2>Ваша истоирия пуста</h2>
                </div>
            )}
        </div>
    )
}

export default ReviewsProfile;