import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICommentRequest, ICommentResponse } from '@/stores/comment/type'
import { FetchError } from '@/stores/type'
import { AxiosError } from 'axios'
import serviceComment from '@/services/comment'

export const createComment = createAsyncThunk<
    ICommentResponse,
    ICommentRequest,
    { rejectValue: FetchError }
>('comment/createComment', async (commentData, { rejectWithValue }) => {
    try {
        const commentResponse = await serviceComment.createComment({
            content: commentData.content,
            laptopId: commentData.laptopId,
        })
        return commentResponse
    } catch (error) {
        const err = error as AxiosError
        const response: any = err?.response?.data
        return rejectWithValue({
            errorMessage: response?.info?.message,
            errorCode: response?.code,
        })
    }
})
