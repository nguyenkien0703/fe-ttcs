import { get } from './fetcher'
import {
    IGetAllDataResponse,
    ILaptopDetailResponse,
    IListLaptopResponse,
} from './response.type'
import { IGetAllLaptopQuery } from '@/stores/laptop/type'

const serviceLaptop = {
    getAllLaptop: async ({
        page,
        limit,
        filter,
    }: IGetAllLaptopQuery): Promise<
        IGetAllDataResponse<IListLaptopResponse>
    > => {
        const payload = {
            page,
            limit,
            ...filter,
        }

        const response: { data: IGetAllDataResponse<IListLaptopResponse> } =
            await get('/laptops', payload)
        return response.data
    },
    getDetailLaptop: async (laptopId: number) => {
        const response = await get<ILaptopDetailResponse>(
            `/laptops/${laptopId}`,
        )
        return response.data
    },
}

export default serviceLaptop
