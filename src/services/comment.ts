import { get, patch, post } from '@/services/fetcher'
import {
    ICommentLaptopResponse,
    IGetAllDataResponse,
} from '@/services/response.type'
import { ICreateCommentPayload } from '@/services/request.type'

const serviceComment = {
    getAllCommentOfLaptop: async (
        laptopId: number,
    ): Promise<IGetAllDataResponse<ICommentLaptopResponse>> => {
        const response: { data: IGetAllDataResponse<ICommentLaptopResponse> } =
            await get(`/comments/${laptopId}`)
        return response.data
    },
    createComment: async (payload: ICreateCommentPayload) => {
        console.log('payload line 14---', payload)
        const response = await post<any>('/comments', payload)
        console.log('response.data line 1666-----', response.data)
        return response.data
    },
    updateComment: async (commentId: number) => {
        const response = await patch<any>
    },
}

export default serviceComment
