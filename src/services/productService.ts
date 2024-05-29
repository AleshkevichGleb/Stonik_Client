import {IProduct, ProductType} from "../types/types.ts";
import {instance} from "../api/axios.ts";
import {AxiosResponse} from "axios";

class productService {
    async getProducts(
        limit?: number,
        page?:number,
        types?: ProductType[],
        search?: string,
        isSale?:boolean,
        startPrice: string = '',
        lastPrice:string = '',
        sortBy:string = 'default',
    ) {
        const validTypes = types?.join(',')

        const url = `/products?limit=${limit || 9999}&page=${page || 1}&types=${validTypes || ''}&search=${search}&startPrice=${startPrice}&lastPrice=${lastPrice || ''}${isSale ? '&isSale=true' : ''}&sortBy=${sortBy}`
        const {data} =  await instance.get<{count: number, rows: IProduct[]}>(url);

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

    async delete(id: string | number) {
        try {
            const response:AxiosResponse = await instance.delete(`/products/${id}`);
            return response.data;
        } catch (e) {
            console.log(e)
            return e
        }
    }

}

export default new productService();