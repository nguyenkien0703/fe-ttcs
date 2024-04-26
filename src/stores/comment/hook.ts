import {
    ICommentRequest,
    ICommentState,
    ICreateCommentState,
} from '@/stores/comment/type'
import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { useCallback } from 'react'
import { getAllComments } from '@/stores/comment/listSlice'
import { createComment } from '@/stores/comment/thunk'

interface CommentCreateType {
    createCommentAction: (commentData: ICommentRequest) => void
}

export const useListCommentLaptop = (): [
    { commentState: ICommentState },
    (laptopId: number) => void,
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

    return [
        {
            commentState,
        },
        getListCommentLaptopAction,
    ]
}

export const useCreateCommentLaptop = (): CommentCreateType => {
    const dispatch = useAppDispatch()
    const createCommentAction = useCallback(
        (commentData: ICommentRequest) => {
            console.log('commentData ben hook---', commentData)
            dispatch(createComment(commentData))
        },
        [dispatch],
    )
    return {
        createCommentAction,
    }
}
