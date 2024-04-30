import { del, get, patch, post } from '@/services/fetcher'
import {
    ICommentDetailResponse,
    ICommentLaptopResponse,
    IGetAllDataResponse,
} from '@/services/response.type'
import {
    ICreateCommentPayload,
    IUpdateCommentPayload,
} from '@/services/request.type'

const serviceComment = {
    getAllCommentOfLaptop: async (
        laptopId: number,
    ): Promise<IGetAllDataResponse<ICommentLaptopResponse>> => {
        const response: { data: IGetAllDataResponse<ICommentLaptopResponse> } =
            await get(`/comments/laptops/${laptopId}`)
        return response.data
    },
    createComment: async (payload: ICreateCommentPayload) => {
        const response = await post<any>('/comments', payload)
        return response.data
    },
    getDetailComment: async (commentId: number) => {
        const response = await get<ICommentDetailResponse>(
            `/comments/${commentId}`,
        )
        return response.data
    },
    updateComment: async (
        commentId: number,
        payload: IUpdateCommentPayload,
    ) => {
        const response = await patch<any>(`/comments/${commentId}`, payload)
        return response.data
    },
    deleteComment: async (commentId: number) => {
        const response = await del<string>(`/comments/${commentId}`)
        return response.data
    },
}

export default serviceComment
