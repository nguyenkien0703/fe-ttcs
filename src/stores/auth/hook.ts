import { IAuthState, ILoginRequest } from '@/stores/auth/type'
import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { useCallback } from 'react'
import { login } from '@/stores/auth/thunk'
import { resetStatus, signOut } from '@/stores/auth/slice'

type AuthLoginType = {
    authState: IAuthState

    loginAction: (loginData: ILoginRequest) => void
    logoutAction: () => void
    resetStatusAction: () => void
}

export const useAuthLogin = (): AuthLoginType => {
    const dispatch = useAppDispatch()
    const authState = useAppSelector((state: RootState) => state.auth)
    const loginAction = useCallback(
        (loginData: ILoginRequest) => {
            dispatch(login(loginData))
        },
        [dispatch],
    )

    const logoutAction = useCallback(() => {
        dispatch(signOut())
    }, [dispatch])
    const resetStatusAction = useCallback(() => {
        dispatch(resetStatus())
    }, [dispatch])

    return {
        authState,
        loginAction,
        logoutAction,
        resetStatusAction,
    }
}
