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

export interface IListLaptopResponse {
    id: number
    name: string
    price: number
    brand: string | null
    image: string | null
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
    image: string
}

export interface ICommentDetailResponse {
    id: number
    content: string
    userId: number
    laptopId: number
}

export interface ICommentLaptopResponse {
    id: number
    content: string
    userId: number
    laptopId: number
    updateAt: string
}

export interface IUseResponse {
    id: number
    name: string
    address: string
    phone: string
    roleId: number
}

export interface ICommentResponse {
    content: string
    userId: number
    laptopId: number
    id: number
}
