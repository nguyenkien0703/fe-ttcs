import exp from 'constants'
import { EActionStatus } from '@/stores/type'

export interface IAccount {
    id: number
    username: string
    email: string
    role: string
}

export interface ILoginRequest {
    email: string
    password: string
}

export interface ILoginResponse {
    accessToken: string
    refreshToken: string
    userData: IAccount
}

export interface ISignUpResponse {
    userData: IAccount
}
export interface IAuthState {
    status: EActionStatus
    isAuthenticated: boolean | null
    userData: IAccount | null
    errorMessage: string
    errorCode: string
}
export interface ILoginRequest {
    email: string
    password: string
}
