import {instance} from "../api/axios.ts";
import {OrderStatusTypes} from "../types/types.ts";

class OrderService {

    async changeOrderStatus(orderId: string | number, status: OrderStatusTypes) {
        try {
            const {data} = await instance.patch(`/order/${orderId}`, {
                status
            })

            return data
        } catch (e) {
            console.log(e)
        }
    }

    async getAllOrders() {
        try {
            const data = instance.get(`/order/notdelivered`)
            return data
        }catch (e) {
            console.log(e)
        }
    }
    async getOrders() {
        try {
            const data = instance.get(`/order/user`)
            return data
        }catch (e) {
            console.log(e)
        }
    }

    async getDeliveredOrders() {
        try {
            const data = instance.get(`/order/user/delivered`)
            return data
        }catch (e) {
            console.log(e)
        }
    }
}

export default new OrderService();