import { EActionStatus, FetchError } from '@/stores/type'

export interface IUserDetail {
    id: number
    name: string
    address: string
    phone: string
    roleId: number
}

export interface IUserState {
    status: EActionStatus
    user?: IUserDetail
    error?: FetchError
}
