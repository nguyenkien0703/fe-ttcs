import { EActionStatus, FetchError } from '@/stores/type'
import exp from 'constants'

export interface ICommentState extends FetchError, IGetAllCommentQuery {
    commentList: ICommentList[]
    status: EActionStatus
    id?: number
    openModalUpdateComment?: boolean
    openModalDeleteComment?: boolean
}

export interface IGetAllCommentQuery {
    page: number
    limit: number
}
export interface ICommentList {
    id: number
    content: string
    userId: number
    laptopId: number
    updateAt: string
}

export interface ICommentRequest {
    laptopId: number
    content: string
}
export interface ICommentResponse {
    content: string
    userId: number
    laptopId: number
    id: number
}

export interface ICreateCommentState extends FetchError {
    status: EActionStatus
    commentData: ICommentResponse | null
}

export interface IUpdateCommentState extends FetchError {
    id?: number
    status: EActionStatus
    openModalUpdateComment?: boolean
    openModalDeleteComment?: boolean
    // commentData: ICommentResponse | null
}
