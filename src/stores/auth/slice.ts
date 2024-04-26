import { IAuthState, ILoginResponse } from '@/stores/auth/type'
import { EActionStatus } from '@/stores/type'
import serviceUser from '@/services/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login } from '@/stores/auth/thunk'

const initialState: IAuthState = {
    status: EActionStatus.Idle,
    userData: serviceUser.getInfoStorage(),
    isAuthenticated: !!serviceUser.getInfoStorage(),
    errorMessage: '',
    errorCode: '',
}
const authSlice = createSlice({
    name: 'auth/login',
    initialState,
    reducers: {
        signOut: (state: IAuthState) => {
            ;(state.status = EActionStatus.Idle),
                (state.isAuthenticated = null),
                (state.userData = null),
                (state.errorMessage = ''),
                (state.errorCode = ''),
                serviceUser.storeInfo(null)
        },
        resetStatus: (state: IAuthState) => {
            state.status = EActionStatus.Idle
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state: IAuthState) => {
                state.status = EActionStatus.Pending
            })
            .addCase(
                login.fulfilled,
                (state: IAuthState, action: PayloadAction<ILoginResponse>) => {
                    state.status = EActionStatus.Succeeded
                    state.userData = action.payload.userData
                    state.isAuthenticated = true
                },
            )
            .addCase(login.rejected, (state: IAuthState, action) => {
                state.errorMessage = action.payload?.errorMessage || ''
                state.status = EActionStatus.Failed
            })
    },
})

export const { signOut, resetStatus } = authSlice.actions

export default authSlice.reducer
