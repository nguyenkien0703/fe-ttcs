import {
    IGetAllLaptopQuery,
    ILaptopList,
    ILaptopState,
    ListParamsFilter,
} from '@/stores/laptop/type'
import { EActionStatus, FetchError } from '@/stores/type'
import { CONSTANT_EMPTY_STRING } from '@/constants/common'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGetAllDataResponse } from '@/services/response.type'
import { AxiosError } from 'axios'
import serviceLaptop from '@/services/laptop'

const initialState: ILaptopState = {
    status: EActionStatus.Idle,
    laptopList: [],
    page: 1,
    limit: 16,
    totalLaptopItem: 0,
    errorCode: '',
    errorMessage: '',
    filter: {
        searchQuery: CONSTANT_EMPTY_STRING,
    },
}

export const getAllLaptops = createAsyncThunk<
    IGetAllDataResponse<ILaptopList>,
    IGetAllLaptopQuery,
    {
        rejectValue: FetchError
    }
>('laptop/getAllLaptops', async (param, { rejectWithValue }) => {
    try {
        const data = await serviceLaptop.getAllLaptop(param)

        const mappedData = data.items.map((item, index) => {
            return {
                id: item.id,
                price: item.price,
                brand: item.brand,
                name: item.name,
                image: item.image,
            }
        }) as unknown as ILaptopList[]
        return {
            ...data,
            items: mappedData,
        } as unknown as IGetAllDataResponse<ILaptopList>
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err?.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info?.message,
            errorCode: responseData?.code,
        })
    }
})

const laptopListSlice = createSlice({
    name: 'laptopListSlice',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<ListParamsFilter>) {
            state.filter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllLaptops.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getAllLaptops.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.laptopList = action.payload?.items ?? []
                state.totalLaptopItem = action?.payload?.meta?.totalItems ?? 0
            })
            .addCase(getAllLaptops.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.errorCode = action?.payload?.errorCode ?? ''
                state.errorMessage = action?.payload?.errorMessage ?? ''
            })
    },
})

export const { setFilter } = laptopListSlice.actions
export default laptopListSlice.reducer
