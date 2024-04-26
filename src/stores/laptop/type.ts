import { EActionStatus, FetchError } from '@/stores/type'

export interface ILaptopState extends IGetAllLaptopQuery, FetchError {
    status: EActionStatus
    laptopList: ILaptopList[]
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

export interface ILaptopList {
    id: number
    name: string
    price: number
    brand: string | null
    image: string
}

export interface ILaptopDetail {
    id: number
    name: string
    cpu: string
    ram: string
    screen: string
    color: string
    os: string
    storage: string
    graphicCard: string
    description: string
    pin: string
    price: number
    material: string
    brand: string
    quantity: number
    image: string
}

export interface IDetailLaptopState {
    status: EActionStatus
    laptop?: ILaptopDetail
    error?: FetchError
}
