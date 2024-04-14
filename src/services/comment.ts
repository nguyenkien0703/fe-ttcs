import { get, patch, post } from '@/services/fetcher'
import { ICommentLaptopResponse } from '@/services/response.type'
import { ICreateCommentPayload } from '@/services/request.type'

const serviceComment = {
    getAllCommentOfLaptop: async (laptopId: number) => {
        const response = await get<ICommentLaptopResponse>(
            `/comments/${laptopId}`,
        )
        return response.data
    },
    createComment: async (payload: ICreateCommentPayload) => {
        const response = await post<any>('/comments', payload)
        return response.data
    },
    updateComment: async (commentId: number) => {
        const response = await patch<any>
    },
}

export default serviceComment
