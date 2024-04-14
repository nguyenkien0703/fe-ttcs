export interface ISignUp {
    email: string
    password: string
    phone: string
    name: string
    address: string
}

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
