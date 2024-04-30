export interface ICreateOrderPayload {
    address: string
    name: string
    phone: string
    laptops: ILaptop[]
}
export interface ILaptop {
    laptopId: number
    quantity: number
}

export interface ICreateCommentPayload {
    laptopId: number
    content: string
}

export interface IUpdateCommentPayload {
    content: string
}







