import { useParams, useRouter } from 'next/navigation'
import { useLaptopDetail } from '@/stores/laptop/hook'
import { useAuthLogin } from '@/stores/auth/hook'
import { useEffect } from 'react'
import { EActionStatus } from '@/stores/type'
import Loader from '@/components/loader'
import DetailTitle from '@/components/content-page-title/detail-title'
import LaptopInfo from '@/views/laptop/laptop-detail/laptop-info'
import { Button } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import CommentList from '@/views/laptop/laptop-detail/comment-list'

const LaptopDetail = () => {
    const params = useParams()
    const router = useRouter()
    const laptopId = Number(params.id)
    const [{ laptop, status }, fetchLaptopDetail] = useLaptopDetail()
    const { authState } = useAuthLogin()
    useEffect(() => {
        if (laptopId) {
            fetchLaptopDetail(laptopId)
        }
    }, [laptopId, fetchLaptopDetail])

    if (!laptop || status === EActionStatus.Pending) {
        return <Loader />
    }

    return (
        <>
            <DetailTitle
                urlBack="/laptop"
                pageName={'Thông tin chi tiết sản phẩm'}
                addCard={
                    <Button
                        size="large"
                        style={{ backgroundColor: '#149B7E', color: 'white' }}
                        icon={<ShoppingCartOutlined />}
                        onClick={() => router.push('/orders')}
                    >
                        Thêm vào giỏ hàng
                    </Button>
                }
            />
            <div className="p-6">
                <LaptopInfo />
                <CommentList />
            </div>
        </>
    )
}

export default LaptopDetail
