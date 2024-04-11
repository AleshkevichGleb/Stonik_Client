import {instance} from "../api/axios.ts";

class OrderService {
    async getOrders() {
        try {
            const data = instance.get(`/order/user`)
            return data
        }catch (e) {
            console.log(e)
        }
    }
}

export default new OrderService();