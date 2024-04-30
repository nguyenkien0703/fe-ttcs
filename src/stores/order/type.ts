import {EActionStatus, FetchError} from "@/stores/type";
import {ILaptop} from "@/services/request.type";


export interface ICreateOrderState extends FetchError {
    status: EActionStatus
    phone: string
    name: string
    address: string
    laptops: ILaptop[]
}