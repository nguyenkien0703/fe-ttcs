import exp from 'constants'
import { EActionStatus } from '@/stores/type'

export interface IAccount {
    id: number
    name: string
    email: string
    role: string
}
export interface IAccountSignUpResponse {
    name: string
    email: string
    address: string
    phone: string
    roleId: number
    id: number
}

export interface ISignUpRequest {
    email: string
    name: string
    address: string
    password: string
    phone: string
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
    userData: IAccountSignUpResponse
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

export interface ISignUpState {
    status: EActionStatus
    isRegistered: boolean | null
    userData: IAccountSignUpResponse | null
    errorMessage: string
    errorCode: string
}
