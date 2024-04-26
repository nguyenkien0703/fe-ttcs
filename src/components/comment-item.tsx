import { useEffect } from 'react'
import { useUserDetail } from '@/stores/user/hook'
import { Col, Row, Typography } from 'antd'
import Image from 'next/image'
import { EditTwoTone, EyeTwoTone } from '@ant-design/icons'

const { Text } = Typography
interface ICommentItem {
    id: number
    content: string
    userId: number
    laptopId: number
    updateAt: string
}

const CommentItem = ({
    id,
    content,
    userId,
    laptopId,
    updateAt,
}: ICommentItem) => {
    const [{ user, status }, getDetailUserAction] = useUserDetail()

    useEffect(() => {
        if (userId) {
            getDetailUserAction(userId)
        }
    }, [userId])

    return (
        <div className="mb-1 flex flex-col">
            <Row gutter={[16, 24]}>
                <Col sm={1} lg={1} xs={1}>
                    <Image
                        src={
                            'https://www.phucanh.vn/template/2019/images/noavatar.jpg'
                        }
                        alt={'image'}
                        width={150}
                        height={150}
                    />
                </Col>
                <Col lg={23} xs={23}>
                    <div
                        className="flex h-full flex-col justify-between rounded-md border"
                        style={{ backgroundColor: '#D9D9D9' }}
                    >
                        <div className="flex justify-between">
                            <div className="flex">
                                <Text className="mr-1 font-bold text-black text-blue-700">
                                    {' '}
                                    {user?.name}
                                </Text>
                                <div>{content}</div>
                            </div>
                            <div className="mx-auto mr-1 flex">
                                <EditTwoTone
                                    style={{ fontSize: '18px' }}
                                    twoToneColor="#5151e5"
                                    onClick={() => {
                                        // router.push(`/account/update/${record.id}`)
                                    }}
                                />
                                <EyeTwoTone
                                    style={{ fontSize: '18px' }}
                                    twoToneColor="#5151e5"
                                    onClick={() => {
                                        // router.push(`/account/detail/${record.id}`)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="">{updateAt}</div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default CommentItem
