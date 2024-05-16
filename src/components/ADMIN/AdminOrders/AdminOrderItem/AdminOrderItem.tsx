import {FC, useState} from "react";
import {IOrder, OrderStatusTypes} from "../../../../types/types.ts";
import styles from "./AdminOrderItem.module.scss";
import {Link} from "react-router-dom";
interface AdminOrderItemProps {
    order: IOrder
}

const AdminOrderItem: FC<AdminOrderItemProps> = ({order}) => {
    const [status, setStatus] = useState<OrderStatusTypes>(order.status);


    return (
        <div className={styles.order}>
            <Link to = {`/products/${order.product.type}/${order.product.id}`} className={styles.order__imageBlock}>
                <span>{order.product.name}</span>
                <img width={200} height={200} src={order.product.images[0]} alt=""/>
            </Link>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
            <span>{order.count}</span>
            <select value={status} onChange={(e) => setStatus(e.target.value as OrderStatusTypes)} name="" id="">
                <option value='В обработке'>В обработке</option>
                <option value='В пути'>В пути</option>
                <option value='Доставлено'>Доставлено</option>
            </select>
            <pre>{JSON.stringify(order.info)}</pre>
        </div>
    )
}

export default AdminOrderItem;