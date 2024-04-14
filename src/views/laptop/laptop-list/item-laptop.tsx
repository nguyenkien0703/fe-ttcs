import {Button, Typography} from 'antd'
import {ILaptopItem} from '@/views/laptop/laptop-list/type'
import {useRouter} from 'next/router'
import {useAuthLogin} from "@/stores/auth/hook";

const { Text } = Typography

const ItemLaptop = ({ id, name, price, brand, image }: ILaptopItem) => {
    const router = useRouter()
    const {authState} = useAuthLogin()

    const handleClickViewDetail = () => {
        router.push(`/laptop/detail/${id}`)
    }
    const handleAddToCart = () => {
        if(authState) {

            router.push('/orders')
        }else {

        }
    }

    return (
        <div className="mt-2 flex max-h-52 max-w-sm flex-col gap-2 rounded-md border border-gray-200 p-4">
            {/*<div>*/}
            {/*    <Image src={image} alt={image} width={150} height={150}  />*/}
            {/*</div>*/}
            <div>
                <Text strong>{name}</Text>
                <Text type="secondary">{brand}</Text>
                <Text type="danger">{price}</Text>
            </div>
            <div className="flex justify-between">
                <Button
                    type="primary"
                    className="mr-2"
                    onClick={handleClickViewDetail}
                >
                    Xem chi tiết
                </Button>
                <Button onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
            </div>
        </div>
    )
}

export default ItemLaptop
