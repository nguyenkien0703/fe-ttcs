import { ICommentList, ICommentState } from '@/stores/comment/type'
import { EActionStatus, FetchError } from '@/stores/type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGetAllDataResponse } from '@/services/response.type'
import { AxiosError } from 'axios'
import serviceComment from '@/services/comment'
import moment from 'moment'

const initialState: ICommentState = {
    status: EActionStatus.Idle,
    commentList: [],
    errorCode: '',
    errorMessage: '',
    page: 1,
    limit: 100,
    id: 0,
    openModalUpdateComment: false,
    openModalDeleteComment: false,
}

export const getAllComments = createAsyncThunk<
    IGetAllDataResponse<ICommentList>,
    number,
    { rejectValue: FetchError }
>('comment/getAllCommentLaptop', async (laptopId, { rejectWithValue }) => {
    try {
        const comments = await serviceComment.getAllCommentOfLaptop(laptopId)
        const mappedData = comments.items.map((item, index) => {
            return {
                id: item.id,
                laptopId: item.laptopId,
                userId: item.userId,
                content: item.content,
                updateAt: moment(item.updateAt).format('YYYY/MM/DD HH:mm:ss'),
            } as unknown as ICommentList[]
        })
        return {
            ...comments,
            items: mappedData,
        } as unknown as IGetAllDataResponse<ICommentList>
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err?.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info?.message,
            errorCode: responseData?.code,
        })
    }
})

const commentLaptopSlice = createSlice({
    name: 'commentLaptopSlice',
    initialState,
    reducers: {
        setOpenModalUpdateComment(
            state,
            action: PayloadAction<{ isOpenModalUpdateComment: boolean }>,
        ) {
            state.openModalUpdateComment =
                action?.payload.isOpenModalUpdateComment
        },
        setOpenModalDeleteComment(
            state,
            action: PayloadAction<{ isOpenModalDeleteComment: boolean }>,
        ) {
            state.openModalDeleteComment =
                action?.payload?.isOpenModalDeleteComment
        },
        setIdOpenModalUpdateOrDeleteComment(
            state,
            action: PayloadAction<{ id: number }>,
        ) {
            state.id = action?.payload.id
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllComments.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.commentList = action.payload?.items ?? []
            })
            .addCase(getAllComments.rejected, (state, action) => {
                state.errorCode = action?.payload?.errorCode ?? ''
                state.errorMessage = action?.payload?.errorMessage ?? ''
                state.status = EActionStatus.Failed
            })
    },
})

export const {
    setOpenModalUpdateComment,
    setOpenModalDeleteComment,
    setIdOpenModalUpdateOrDeleteComment,
} = commentLaptopSlice.actions
export default commentLaptopSlice.reducer
