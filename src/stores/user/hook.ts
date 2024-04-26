import { EActionStatus } from '@/stores/type'
import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { IUserDetail } from '@/stores/user/type'
import { useCallback } from 'react'
import { getDetailUser } from '@/stores/user/detailSlice'

export const useUserDetail = (): [
    {
        user: IUserDetail | undefined
        status: EActionStatus
    },
    (userId: number) => void,
] => {
    const dispatch = useAppDispatch()
    const { user, status } = useAppSelector(
        (state: RootState) => state.userDetail,
    )

    const getDetailUserAction = useCallback(
        (userId: number) => {
            dispatch(getDetailUser(userId))
        },
        [dispatch],
    )

    return [
        {
            user,
            status,
        },
        getDetailUserAction,
    ]
}
