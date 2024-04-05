import {IProduct} from "../types/types.ts";
import {instance} from "../api/axios.ts";

class productService {
    async getProducts(limit?: number, page?:number, types?: string) {
        const {data} =  await instance.get<{count: number, rows: IProduct[] }>
            (`/products?limit=${limit || 9999}&page=${page || 1}&type=${types || ''}`)
        return data
    }

    async getOne(id: string | number){
        try {
            const {data} = await instance.get<IProduct>(`/products/${id}`)
            return data
        } catch (e) {
            console.log(e)
        }
    }
}

export default new productService();