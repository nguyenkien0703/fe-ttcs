import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { ILaptopItem } from '@/views/laptop/laptop-list/type'
import BoxArea from '@/components/box-area'
import { Pagination } from 'antd'
import { getAllLaptops } from '@/stores/laptop/listSlice'
import ItemLaptop from '@/views/laptop/laptop-list/item-laptop'
import { useListLaptop } from '@/stores/laptop/hook'
import ListBrand from '@/components/brand/listBrand'
import Carousel from '@/components/carousel/carousel'

const ListLaptop = () => {
    const { page, limit, totalLaptopItem, filter } = useAppSelector(
        (state: RootState) => state.laptopList,
    )
    const dispatch = useAppDispatch()
    const { laptopState, getListLaptopAction, setFilterAction } =
        useListLaptop()

    const handlePageChange = (pageChange: number) => {
        getListLaptopAction({
            page: pageChange,
            limit,
            filter: { ...filter },
        })
    }

    return (
        <BoxArea>
            {laptopState.laptopList && laptopState.laptopList.length > 0 && (
                <>
                    <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {laptopState.laptopList.map((item, index) => (
                            <ItemLaptop
                                key={index}
                                id={item.id}
                                name={item.name}
                                brand={item.brand}
                                price={item.price}
                                image={item.image}
                            />
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
    )
}

export default ListLaptop
