import styles from "./AdminOrders.module.scss";
import orderService from "../../../services/orderService.ts";
import {useEffect, useState} from "react";
import {IOrder} from "../../../types/types.ts";
import loaderImage from "../../../assets/images/loader-icon.svg";
import AdminOrderItem from "./AdminOrderItem/AdminOrderItem.tsx";
const AdminOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getOrders = async() => {
        const response = await orderService.getAllOrders();
        setOrders(response?.data)
        console.log(response?.data[0].info)
    }

    useEffect(() => {
        setIsLoading(true);
        getOrders();
        setIsLoading(false)
    }, []);


    return(
        <div className={styles.container}>
            {
                isLoading
                ? <div className={styles.loaderContainer}>
                        <img width={200} height={200} src={loaderImage} alt=""/>
                    </div>
                : <div>
                        {
                            orders.length > 0
                            ?
                            <div className={styles.ordersBlock}>
                                {
                                    orders.map(order =>
                                        <AdminOrderItem
                                            key={order.id}
                                            orders={orders}
                                            setOrders={setOrders}
                                            order={order}
                                        />
                                    )
                                }
                            </div>
                            :
                            <div className={styles.loaderContainer}>
                                <h2>Нет активных заказов</h2>
                            </div>
                        }
                    </div>
            }
        </div>
    )
}

export default AdminOrders;