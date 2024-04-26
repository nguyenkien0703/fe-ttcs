import {
    IGetAllLaptopQuery,
    ILaptopDetail,
    ILaptopState,
    ListParamsFilter,
} from '@/stores/laptop/type'
import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { useCallback } from 'react'
import { getAllLaptops, setFilter } from '@/stores/laptop/listSlice'
import { EActionStatus } from '@/stores/type'
import { getLaptopDetail } from '@/stores/laptop/detailSlice'

type ListLaptop = {
    laptopState: ILaptopState
    getListLaptopAction: (data: IGetAllLaptopQuery) => void
    setFilterAction: (data: ListParamsFilter) => void
}

export const useListLaptop = (): ListLaptop => {
    const dispatch = useAppDispatch()
    const laptopState = useAppSelector((state: RootState) => state.laptopList)

    const getListLaptopAction = useCallback(
        (data: IGetAllLaptopQuery) => {
            dispatch(getAllLaptops(data))
        },
        [dispatch],
    )

    const setFilterAction = useCallback(
        (data: ListParamsFilter) => {
            dispatch(setFilter(data))
        },
        [dispatch],
    )

    return {
        laptopState,
        getListLaptopAction,
        setFilterAction,
    }
}

export const useLaptopDetail = (): [
    {
        laptop: ILaptopDetail | undefined
        status: EActionStatus
    },
    (laptopId: number) => void,
] => {
    const dispatch = useAppDispatch()
    const { status, laptop } = useAppSelector(
        (state: RootState) => state.laptopDetail,
    )

    const fetchLaptopDetail = useCallback(
        (laptopId: number) => {
            dispatch(getLaptopDetail(laptopId))
        },
        [dispatch],
    )
    return [
        {
            laptop,
            status,
        },
        fetchLaptopDetail,
    ]
}
