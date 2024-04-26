import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IDetailLaptopState, ILaptopDetail } from '@/stores/laptop/type'
import { EActionStatus, FetchError } from '@/stores/type'
import { AxiosError } from 'axios'
import serviceLaptop from '@/services/laptop'

const initialState: IDetailLaptopState = {
    status: EActionStatus.Idle,
    laptop: undefined,
    error: undefined,
}

export const getLaptopDetail = createAsyncThunk<
    ILaptopDetail,
    number,
    { rejectValue: FetchError }
>('laptop/getLaptopDetail', async (laptopId, { rejectWithValue }) => {
    try {
        const laptopDetail = await serviceLaptop.getDetailLaptop(laptopId)
        return {
            id: laptopDetail.id,
            name: laptopDetail.name,
            cpu: laptopDetail.cpu,
            ram: laptopDetail.ram,
            screen: laptopDetail.screen,
            color: laptopDetail.color,
            os: laptopDetail.os,
            storage: laptopDetail.storage,
            graphicCard: laptopDetail.graphicCard,
            description: laptopDetail.description,
            pin: laptopDetail.pin,
            price: laptopDetail.price,
            material: laptopDetail.material,
            brand: laptopDetail.brand,
            quantity: laptopDetail.quantity,
            image: laptopDetail.image,
        } as unknown as ILaptopDetail
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err?.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info?.message,
            errorCode: responseData?.code,
        })
    }
})

const laptopDetailSlice = createSlice({
    name: 'laptopDetailSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLaptopDetail.pending, (state, action) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getLaptopDetail.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.laptop = action.payload
            })
            .addCase(getLaptopDetail.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.error = action.payload
            })
    },
})

export default laptopDetailSlice.reducer
