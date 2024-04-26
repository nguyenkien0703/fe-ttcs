import {
    IAccount,
    ILoginRequest,
    ILoginResponse,
    ISignUpRequest,
    ISignUpResponse,
} from '@/stores/auth/type'
import { Cookies } from 'react-cookie'

import { get, post } from './fetcher'
import { IUseResponse } from '@/services/response.type'

const cookies = new Cookies()

const USER_INFO_STORAGE_KEY = 'usr_if'
const USER_TOKEN_STORAGE_KEY = 'usr_tk'
const USER_REFRESH_TOKEN_STORAGE_KEY = 'usr_refresh_token'

const serviceUser = {
    storeInfo: (user: IAccount | null) => {
        if (user) {
            cookies.set(USER_INFO_STORAGE_KEY, JSON.stringify(user), {
                path: '/',
            })
            return
        }
        cookies.remove(USER_INFO_STORAGE_KEY, { path: '/' })
    },
    storeAccessToken: (token: string | null) => {
        if (token) {
            cookies.set(USER_TOKEN_STORAGE_KEY, JSON.stringify(token), {
                path: '/',
            })
            return
        }
        cookies.remove(USER_TOKEN_STORAGE_KEY, { path: '/' })
    },
    storeRefreshToken: (token: string | null) => {
        if (token) {
            cookies.set(USER_REFRESH_TOKEN_STORAGE_KEY, JSON.stringify(token), {
                path: '/',
            })
            return
        }
        cookies.remove(USER_REFRESH_TOKEN_STORAGE_KEY, { path: '/' })
    },
    getInfoStorage: (): IAccount | null => {
        const userInfo = cookies.get(USER_INFO_STORAGE_KEY)
        return userInfo ? userInfo : null
    },
    getAccessTokenStorage: (): string | null => {
        const tokenString = cookies.get(USER_TOKEN_STORAGE_KEY)
        return tokenString ? tokenString : null
    },
    getRefreshToken: async () => {
        const refreshToken = cookies.get(USER_REFRESH_TOKEN_STORAGE_KEY)
        const response = await post<{ accessToken: string }>(
            '/auths/refresh-token',
            { refreshToken: refreshToken },
        )
        const accessToken = response.data
        if (accessToken) {
            cookies.set(USER_TOKEN_STORAGE_KEY, JSON.stringify(accessToken), {
                path: '/',
            })
        }
        return accessToken
    },
    login: async (payload: ILoginRequest): Promise<ILoginResponse> => {
        const response: { data: ILoginResponse } = await post(
            '/auths/login',
            payload,
        )
        return response.data
    },
    signUp: async (payload: ISignUpRequest): Promise<ISignUpResponse> => {
        const response: { data: ISignUpResponse } = await post(
            '/auths/sign-up',
            payload,
        )

        return response.data
    },
    getDetailUser: async (userId: number) => {
        const response = await get<IUseResponse>(`users/${userId}`)
        return response.data
    },
}
export default serviceUser
