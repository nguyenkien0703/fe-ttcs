import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { ILaptopItem } from '@/views/laptop/laptop-list/type'
import BoxArea from '@/components/box-area'
import { Pagination } from 'antd'
import { getAllLaptops } from '@/stores/laptop/listSlice'
import ItemLaptop from '@/views/laptop/laptop-list/item-laptop'

interface ListLaptopProps {
    data: ILaptopItem[]
}
const ListLaptop = ({ data }: ListLaptopProps) => {
    console.log('data line 12------',data)
    const { page, limit, totalLaptopItem, filter } = useAppSelector(
        (state: RootState) => state.laptopList,
    )
    const dispatch = useAppDispatch()

    const handlePageChange = (pageChanege: number) => {
        dispatch(
            getAllLaptops({
                page: pageChanege,
                limit,
                filter: { ...filter },
            }),
        )
    }

    return (
        <div className="list-laptop">
            <BoxArea title={'Trang chủ'}>
                {data && data.length > 0 && (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {data.map((item, index) => (
                                <ItemLaptop key={index} {...item} />
                            ))}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Pagination
                                pageSize={limit}
                                defaultCurrent={page}
                                total={totalLaptopItem}
                                onChange={handlePageChange}
                            />
                        </div>
                    </>
                )}
            </BoxArea>
        </div>
    )
}

export default ListLaptop
