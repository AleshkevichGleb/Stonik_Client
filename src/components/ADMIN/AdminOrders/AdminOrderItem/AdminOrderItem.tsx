import {ChangeEvent, FC, useState} from "react";
import {IOrder, OrderStatusTypes} from "../../../../types/types.ts";
import styles from "./AdminOrderItem.module.scss";
import {Link} from "react-router-dom";
import orderService from "../../../../services/orderService.ts";
import {toast} from "react-toastify";
interface AdminOrderItemProps {
    orders: IOrder[],
    setOrders: (orders: IOrder[]) => void,
    order: IOrder
}

const AdminOrderItem: FC<AdminOrderItemProps> = ({order, orders, setOrders}) => {
    const [status, setStatus] = useState<OrderStatusTypes>(order.status);

    const changeStatus = async(e: ChangeEvent<HTMLSelectElement>) => {
        const data = await orderService.changeOrderStatus(order.id, e.target.value as OrderStatusTypes)
        if(data.hasOwnProperty('order')) {
            setStatus(data.order.status)
            toast.success('Статус успешно обновлен')

            if(data.order.status === 'Доставлено') {
                const updatedOrders: IOrder[] = orders.filter(orderItem => orderItem.id !== order.id);
                setOrders(updatedOrders);
            }
        } else {
            toast.error('Ошибка, попробуйте позже')
        }
    }

    return (
        <div className={styles.order}>
            <Link to={`/products/${order.product.type}/${order.product.id}`} className={styles.order__imageBlock}>
                <span>{order.product.name}</span>
                <img width={200} height={200} src={order.product.images[0]} alt=""/>
            </Link>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
            <div className={styles.countBlock}>
                <span className={styles.countBlock__title}>Количество: </span>
                <span>{order.count}</span>
            </div>
            <div className={styles.countBlock}>
                <span className={styles.countBlock__title}>Цена: </span>
                <span>{order.count * order.product.price}BYN</span>
            </div>
            <select value={status} onChange={changeStatus} name="" id="">
                <option value='В обработке'>В обработке</option>
                <option value='В пути'>В пути</option>
                <option value='Доставлено'>Доставлено</option>
            </select>
            <div className={styles.order__info}>
                <div className={styles.order__infoItem}>
                    <span className={styles.order__infoTitle}>Имя: </span>
                    <span className={styles.order__infoText}>{order.info.name}</span>
                </div>
                <div className={styles.order__infoItem}>
                    <span className={styles.order__infoTitle}>Телефон: </span>
                    <span className={styles.order__infoText}>{order.info.phone}</span>
                </div>
                <div className={styles.order__infoItem}>
                    <span className={styles.order__infoTitle}>Почта: </span>
                    <span className={styles.order__infoText}>{order.info.email}</span>
                </div>
                <div className={styles.order__infoItem}>
                    <span className={styles.order__infoTitle}>Город: </span>
                    <span className={styles.order__infoText}>{order.info.city}</span>
                </div>
                <div className={styles.order__infoItem}>
                    <span className={styles.order__infoTitle}>Улица: </span>
                    <span className={styles.order__infoText}>{order.info.street}</span>
                </div>
                <div className={styles.order__infoItem}>
                    <span className={styles.order__infoTitle}>Дом: </span>
                    <span className={styles.order__infoText}>{order.info.house}</span>
                </div>
                <div className={styles.order__infoItem}>
                    <span className={styles.order__infoTitle}>Квартира: </span>
                    <span className={styles.order__infoText}>{order.info.flat}</span>
                </div>
                <div className={styles.order__infoItem}>
                    <span className={styles.order__infoTitle}>Тип оплаты: </span>
                    <span className={styles.order__infoText}>{order.info.payment.type}</span>
                </div>
                {/*{*/}
                {/*    order.info.payment.type === 'online' &&*/}
                {/*    <>*/}
                {/*        <div className={styles.order__infoItem}>*/}
                {/*            <span className={styles.order__infoTitle}>Номер: </span>*/}
                {/*            <span className={styles.order__infoText}>{order.info.payment.number}</span>*/}
                {/*        </div>*/}
                {/*        <div className={styles.order__infoItem}>*/}
                {/*            <span className={styles.order__infoTitle}>Носитель карты: </span>*/}
                {/*            <span className={styles.order__infoText}>{order.info.payment.name}</span>*/}
                {/*        </div>*/}
                {/*        <div className={styles.order__infoItem}>*/}
                {/*            <span className={styles.order__infoTitle}>Срок действия: </span>*/}
                {/*            <span className={styles.order__infoText}>{order.info.payment.expiry}</span>*/}
                {/*        </div>*/}
                {/*        <div className={styles.order__infoItem}>*/}
                {/*            <span className={styles.order__infoTitle}>CVC: </span>*/}
                {/*            <span className={styles.order__infoText}>{order.info.payment.cvc}</span>*/}
                {/*        </div>*/}
                {/*    </>*/}
                {/*}*/}
                {
                    order.info.payment.type === 'cash' &&
                    <>
                        <div className={styles.order__infoItem}>
                            <span className={styles.order__infoTitle}>Сдача с: </span>
                            <span className={styles.order__infoText}>{order.info.payment.surrender_of_money}</span>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default AdminOrderItem;