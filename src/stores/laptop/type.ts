import { EActionStatus, FetchError } from '@/stores/type'
import exp from 'constants'
import { ILaptops } from '@/services/response.type'

export interface ILaptopState extends IGetAllLaptopQuery, FetchError {
    status: EActionStatus
    laptopList: ILaptops[]
    totalLaptopItem: number
}

export interface IGetAllLaptopQuery {
    page: number
    limit: number
    filter?: ListParamsFilter
}

export interface ListParamsFilter {
    searchQuery?: string
}
