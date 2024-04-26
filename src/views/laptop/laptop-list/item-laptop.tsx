import { Button, Typography } from 'antd'
import { ILaptopItem } from '@/views/laptop/laptop-list/type'
import { useAuthLogin } from '@/stores/auth/hook'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
const { Text } = Typography

const ItemLaptop = ({ id, name, price, brand, image }: ILaptopItem) => {
    const router = useRouter()
    const { authState } = useAuthLogin()

    const handleClickViewDetail = () => {
        router.push(`/laptop/detail/${id}`)
    }
    const handleAddToCart = () => {
        if (authState) {
            router.push('/orders')
        } else {
        }
    }

    return (
        <div className="mt-1 flex max-h-[450px] max-w-[400px] flex-col overflow-hidden rounded-md border border-gray-200 p-4 hover:overflow-auto">
            <div className="flex flex-col ">
                <Image src={image} alt={'image'} width={150} height={150} />

                <Text strong>{name}</Text>
                {/*<Text type="secondary">{brand}</Text>*/}
                <Text type="danger">{price}</Text>
            </div>
            <div className="mt-2 flex items-center justify-center ">
                <Button
                    size="large"
                    className="mt-2"
                    onClick={handleClickViewDetail}
                    style={{
                        color: '#149B7E',
                    }}
                >
                    Xem chi tiết
                </Button>
                <Button
                    size="large"
                    onClick={handleAddToCart}
                    style={{ backgroundColor: '#149B7E', color: 'white' }}
                >
                    Thêm vào giỏ hàng
                </Button>
            </div>
        </div>
    )
}

export default ItemLaptop
