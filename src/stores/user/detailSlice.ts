import { IUserDetail, IUserState } from '@/stores/user/type'
import { EActionStatus, FetchError } from '@/stores/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import serviceUser from '@/services/user'

const initialState: IUserState = {
    status: EActionStatus.Idle,
    user: undefined,
    error: undefined,
}

export const getDetailUser = createAsyncThunk<
    IUserDetail,
    number,
    { rejectValue: FetchError }
>('user/getDetailUser', async (userId: number, { rejectWithValue }) => {
    try {
        const userDetail = await serviceUser.getDetailUser(userId)
        return {
            id: userDetail.id,
            name: userDetail.name,
            phone: userDetail.phone,
            address: userDetail.address,
            roleId: userDetail.roleId,
        } as unknown as IUserDetail
    } catch (error) {
        const err = error as AxiosError
        const response: any = err?.response?.data
        return rejectWithValue({
            errorMessage: response?.info?.message,
            errorCode: response?.code,
        })
    }
})

const userDetailSlice = createSlice({
    name: 'userDetailSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDetailUser.pending, (state, action) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getDetailUser.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.user = action?.payload
            })
            .addCase(getDetailUser.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.error = action?.payload
            })
    },
})

export default userDetailSlice.reducer
