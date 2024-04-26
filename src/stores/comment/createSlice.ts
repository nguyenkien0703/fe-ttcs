import { ICreateCommentState } from '@/stores/comment/type'
import { EActionStatus } from '@/stores/type'
import { createSlice } from '@reduxjs/toolkit'
import { createComment } from '@/stores/comment/thunk'

const initialState: ICreateCommentState = {
    errorCode: '',
    errorMessage: '',
    status: EActionStatus.Idle,
    commentData: null,
}

const createCommentSlice = createSlice({
    name: 'comment/create',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createComment.pending, (state, action) => {
                state.status = EActionStatus.Pending
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.commentData = action?.payload || null
            })
            .addCase(createComment.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.errorMessage = action?.payload?.errorMessage ?? ''
            })
    },
})

export default createCommentSlice.reducer
