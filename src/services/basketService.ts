import {instance} from "../api/axios.ts";
import {IBasketData} from "../types/types.ts";

class BasketService {
    async getAll(){}

    async changeCount(id: string | number, count: number) {
        try {
            const response = await instance.post('/basket', {
                product: {
                    id,
                    count
                }
            })

            return response.data;
        } catch (e) {
            return e;
        }
    }
    async getForUser() {
        try {
            const {data} = await instance.get<IBasketData[]>('/basket/user');
            return data;
        } catch (e) {
            console.log(e)
            throw new Error('Ошибка получения профиля');
        }
    }

    async sendOrder() {
        const response  = await instance.delete('/basket')
        return response;
    }

}

export default new BasketService();