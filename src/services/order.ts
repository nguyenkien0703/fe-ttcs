import { ICreateOrderPayload } from './request.type'
import { post } from '@/services/fetcher'

const serviceOrder = {
    createOrder: async (payload: ICreateOrderPayload) => {
        const response = await post<any>('/orders', payload)
        return response.data
    },
}

export default serviceOrder
