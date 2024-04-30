import {
    ICommentRequest,
    ICommentState,
    ICreateCommentState,
    IUpdateCommentState,
} from '@/stores/comment/type'
import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { useCallback } from 'react'
import {
    getAllComments,
    setIdOpenModalUpdateOrDeleteComment,
    setOpenModalDeleteComment,
    setOpenModalUpdateComment,
} from '@/stores/comment/listSlice'
import { createComment } from '@/stores/comment/thunk'

interface CommentCreateType {
    createCommentAction: (commentData: ICommentRequest) => void
}

export const useListCommentLaptop = (): [
    { commentState: ICommentState },
    (laptopId: number) => void,
    setOpenModalUpdateCommentAction: (
        isOpenModalUpdateComment: boolean,
    ) => void,
    setIdOpenModaDeleteCommentAction: (
        isOpenModalDeleteComment: boolean,
    ) => void,
    setIdOpenModalUpdateOrDeleteCommentAction: (id: number) => void,
] => {
    const dispatch = useAppDispatch()
    const commentState = useAppSelector(
        (state: RootState) => state.commentLaptop,
    )

    const getListCommentLaptopAction = useCallback(
        (laptopId: number) => {
            dispatch(getAllComments(laptopId))
        },
        [dispatch],
    )

    const setOpenModalUpdateCommentAction = useCallback(
        (isOpenModalUpdateComment: boolean) => {
            dispatch(setOpenModalUpdateComment({ isOpenModalUpdateComment }))
        },
        [dispatch],
    )

    const setOpenModalDeleteCommentAction = useCallback(
        (isOpenModalDeleteComment: boolean) => {
            dispatch(setOpenModalDeleteComment({ isOpenModalDeleteComment }))
        },
        [dispatch],
    )

    const setIdOpenModalUpdateOrDeleteCommentAction = useCallback(
        (id: number) => {
            dispatch(setIdOpenModalUpdateOrDeleteComment({ id }))
        },
        [dispatch],
    )

    return [
        {
            commentState,
        },
        getListCommentLaptopAction,
        setOpenModalUpdateCommentAction,
        setOpenModalDeleteCommentAction,
        setIdOpenModalUpdateOrDeleteCommentAction,
    ]
}

export const useCreateCommentLaptop = (): CommentCreateType => {
    const dispatch = useAppDispatch()
    const createCommentAction = useCallback(
        (commentData: ICommentRequest) => {
            dispatch(createComment(commentData))
        },
        [dispatch],
    )
    return {
        createCommentAction,
    }
}
