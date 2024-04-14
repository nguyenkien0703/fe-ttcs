import {
    IGetAllLaptopQuery,
    ILaptopState,
    ListParamsFilter,
} from '@/stores/laptop/type'
import { EActionStatus, FetchError } from '@/stores/type'
import { CONSTANT_EMPTY_STRING } from '@/constants/common'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGetAllDataResponse, ILaptops } from '@/services/response.type'
import { AxiosError } from 'axios'
import serviceLaptop from '@/services/laptop'

const initialState: ILaptopState = {
    status: EActionStatus.Idle,
    laptopList: [],
    page: 1,
    limit: 12,
    totalLaptopItem: 0,
    errorCode: '',
    errorMessage: '',
    filter: {
        searchQuery: CONSTANT_EMPTY_STRING,
    },
}

export const getAllLaptops = createAsyncThunk<
    IGetAllDataResponse<ILaptops>,
    IGetAllLaptopQuery,
    {
        rejectValue: FetchError
    }
>('laptop/getAllLaptops', async (param, { rejectWithValue }) => {
    try {

        const data = await serviceLaptop.getAllLaptop(param)
        console.log('kien chinh ')
        console.log('data adter kien chinh------',data)
        const mapData = data.items.map((item)=> {
            return {
                id: item.id,
                name: item.name,
                brand: item.brand,image: item.image, price: item.price
            }
        }) as ILaptops[]
        console.log('mapData----',mapData)
        return {
            ...data,
            items: mapData
        } as IGetAllDataResponse<ILaptops>

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
                console.log('action.payload----',action.payload)
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
