import {
    IGetAllLaptopQuery,
    ILaptopState,
    ListParamsFilter,
} from '@/stores/laptop/type'
import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { useCallback } from 'react'
import { getAllLaptops, setFilter } from '@/stores/laptop/listSlice'

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
            console.log(22222222)
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
