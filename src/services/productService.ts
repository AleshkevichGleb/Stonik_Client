import {IProduct, ProductType} from "../types/types.ts";
import {instance} from "../api/axios.ts";

class productService {
    async getProducts(limit?: number, page?:number, types?: ProductType[]) {
        const validTypes = types?.join(',')
        console.log(validTypes)
        const {data} =  await instance.get<{count: number, rows: IProduct[], allProducts: IProduct[]}>
            (`/products?limit=${limit || 9999}&page=${page || 1}&types=${validTypes || ''}`)
        console.log(data)
        return data
    }

    async getOne(id: string | number){
        try {
            const response = await instance.get<IProduct>(`/products/${id}`)
            return response.data
        } catch (e) {
            console.log(e)
            return e
        }
    }
}

export default new productService();