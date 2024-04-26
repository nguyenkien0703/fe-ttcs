import { useAuthLogin } from '@/stores/auth/hook'
import { useListLaptop } from '@/stores/laptop/hook'
import { useEffect } from 'react'
import ListTitle from '@/components/content-page-title/list-title'
import ListLaptop from '@/views/laptop/laptop-list/list-laptop'
import ListBrand from '@/components/brand/listBrand'
import Carousel from '@/components/carousel/carousel'

const LaptopList = () => {
    const { authState } = useAuthLogin()
    const { laptopState, getListLaptopAction, setFilterAction } =
        useListLaptop()

    useEffect(() => {
        getListLaptopAction({
            page: laptopState.page,
            limit: laptopState.limit,
            filter: { ...laptopState.filter },
        })
        // eslint-disable-next-line
    }, [laptopState.filter])

    const handleChangeInput = (value: string) => {
        setFilterAction({ ...laptopState.filter, searchQuery: value })
    }

    return (
        <div>
            <ListTitle
                pageName={'Danh sách laptop'}
                onChangeInput={handleChangeInput}
            />

            <div className="flex flex-col p-6">
                {/*<Carousel/>*/}
                <ListBrand />
                <ListLaptop />
            </div>
        </div>
    )
}

export default LaptopList
