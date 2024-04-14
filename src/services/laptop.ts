import {get} from './fetcher'
import {IGetAllDataResponse, ILaptopDetailResponse, ILaptops,} from './response.type'
import {IGetAllLaptopQuery} from '@/stores/laptop/type'

const serviceLaptop = {
    getAllLaptop: async ({
        page,
        limit,
        filter,
    }: IGetAllLaptopQuery): Promise<IGetAllDataResponse<ILaptops>> => {
        const payload = {
            page,
            limit,
            ...filter,
        }

        const response: {data: IGetAllDataResponse<ILaptops>} = await get('/laptops', payload)
        console.log('response.data-----',response.data)
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
