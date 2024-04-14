import {useAuthLogin} from '@/stores/auth/hook'
import {useListLaptop} from '@/stores/laptop/hook'
import {useEffect} from 'react'
import ListTitle from '@/components/content-page-title/list-title'
import ListLaptop from '@/views/laptop/laptop-list/list-laptop'

const LaptopList = () => {
    const { authState } = useAuthLogin()
    const { laptopState, getListLaptopAction, setFilterAction } =
        useListLaptop()



    useEffect(() => {
        console.log(111111111111)
        getListLaptopAction({
            page: laptopState.page,
            limit: laptopState.limit,
            filter: { ...laptopState.filter },
        })
        // eslint-disable-next-line
    }, [laptopState.filter])
    console.log('laptopState line 21-----',laptopState.laptopList)

    const handleChangeInput = (value: string) => {
        setFilterAction({ ...laptopState.filter, searchQuery: value })
    }
    return (
        <div>
            <ListTitle onChangeInput={handleChangeInput} />

            <div className="mt-12 p-6">
                <ListLaptop data={laptopState.laptopList} />
            </div>
        </div>
    )
}

export default LaptopList
