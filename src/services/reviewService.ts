import {instance} from "../api/axios.ts";

class ReviewService {
    async sendReview(rating: number, message: string, productId: number | string ) {
        try {
            const data = await instance.post('/review', {
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
            const data = instance.get(`/review/${productId}`)
            return data
        }catch (e) {
            console.log(e)
        }
    }
}

export default new ReviewService();