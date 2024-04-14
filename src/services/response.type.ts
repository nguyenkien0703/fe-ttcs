export interface IMeta {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
}

export interface ApiResponse<T = {}> {
    code: string | number
    data: T
    metadata: {
        timestamp: Date
        query: unknown
    }
}

export interface IGetAllDataResponse<T> {
    items: T[]
    meta: IMeta
}
export interface ILaptopListResponse {
    items: ILaptops[]
    meta: IMeta
}

export interface ILaptops {
    id: number
    name: string
    price: number
    brand?: string
    image?: string
}

export interface ILaptopDetailResponse {
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
}

export interface ICommentLaptopResponse {
    id: number
    content: string
    userId: number
    laptopId: number
}
