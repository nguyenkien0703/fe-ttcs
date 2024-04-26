import { ISignUpState } from '@/stores/auth/type'
import { EActionStatus } from '@/stores/type'
import { createSlice } from '@reduxjs/toolkit'
import { signUp } from '@/stores/auth/thunk'

const initialState: ISignUpState = {
    status: EActionStatus.Idle,
    isRegistered: false,
    userData: null,
    errorCode: '',
    errorMessage: '',
}

const authRegisterSlice = createSlice({
    name: 'auth/register',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state, action) => {
                state.status = EActionStatus.Pending
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.isRegistered = true
                state.userData = action?.payload.userData ?? null
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isRegistered = false
                state.errorMessage = action?.payload?.errorMessage || ''
                state.status = EActionStatus.Failed
            })
    },
})

export default authRegisterSlice.reducer
