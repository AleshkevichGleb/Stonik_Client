import {instance} from "../api/axios.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-toastify";

class ReviewService {
    async sendReview(rating: number, message: string, productId: number | string ) {
        try {
            const data = await instance.post('/reviews', {
                rating,
                message,
                productId,
            });

            return data
        } catch (e) {
            console.log(e);
            return e;
        }

    }

    async getReviews(productId: string | number) {
        try {
            const response: Promise<AxiosResponse> = instance.get(`/reviews/${productId}`)
            return response
        }catch (e) {
            console.log(e)
        }
    }

    async getAllReviews() {
        try {
            const {data} =await instance.get(`/reviews`)
            return data
        }catch (e) {
            console.log(e)
        }
    }


    async deleteReview(reviewId: string | number, productId: string | number)  {
        try {
            await instance.delete(`/reviews/${reviewId}?productId=${productId}`)
            toast.success('Отзыв успешно удален');
        } catch (e) {
            console.log(e)
        }
    }

    async updateReview(reviewId: string | number, reply: string,) {
        try {
            const data = await instance.patch(`/reviews/${reviewId}`, {
                reply,
            })
            console.log(data)
            toast.success('Отзыв успешно изменен')
        } catch (e) {
            console.log(e)
        }

    }
}

export default new ReviewService();