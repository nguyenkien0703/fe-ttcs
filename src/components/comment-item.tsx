import React, { useEffect, useState } from 'react'
import { useUserDetail } from '@/stores/user/hook'
import { Button, Col, Modal, Row, Typography } from 'antd'
import Image from 'next/image'
import { DeleteFilled, EditTwoTone } from '@ant-design/icons'
import serviceUser from '@/services/user'
import { IUseResponse } from '@/services/response.type'
import { useListCommentLaptop } from '@/stores/comment/hook'
import { useAuthLogin } from '@/stores/auth/hook'
import { useRouter } from 'next/navigation'
import ModalUpdateComment from '@/components/modal-update-comment'
import ModalDeleteComment from '@/components/modal-delete-comment'

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
    const [, getDetailUserAction] = useUserDetail()
    const [user, setUser] = useState<IUseResponse>()
    const [
        { commentState },
        getListCommentLaptopAction,
        setOpenModalUpdateCommentAction,
        setOpenModalDeleteCommentAction,
        setIdOpenModalUpdateOrDeleteCommentAction,
    ] = useListCommentLaptop()

    const [openModal, setOpenModal] = useState(false)
    const { authState } = useAuthLogin()
    const router = useRouter()
    const handleOk = () => {
        router.push('/login')
        setOpenModal(false)
    }

    const handleCancel = () => {
        setOpenModal(false)
    }

    useEffect(() => {
        if (userId) {
            ;(async () => {
                const userDetail = await serviceUser.getDetailUser(userId)
                if (userDetail) {
                    setUser(userDetail)
                }
            })()
        }
    }, [userId, getDetailUserAction])

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
                                        if (!authState.isAuthenticated) {
                                            setOpenModal(true)
                                        } else {
                                            setOpenModalUpdateCommentAction(
                                                true,
                                            )
                                            setIdOpenModalUpdateOrDeleteCommentAction(
                                                id,
                                            )
                                        }
                                    }}
                                />

                                <DeleteFilled
                                    style={{
                                        fontSize: '18px',
                                        color: 'red',
                                        marginLeft: '5px',
                                    }}
                                    twoToneColor="#5151e5"
                                    onClick={() => {
                                        if (!authState.isAuthenticated) {
                                            setOpenModal(true)
                                        } else {
                                            setOpenModalDeleteCommentAction(
                                                true,
                                            )
                                            setIdOpenModalUpdateOrDeleteCommentAction(
                                                id,
                                            )
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="">{updateAt}</div>
                    </div>
                </Col>
            </Row>
            <Modal
                title={'Bạn vui lòng đăng nhập.'}
                open={openModal}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleCancel}
                        className="bg-amber-700 text-white opacity-75 hover:opacity-100"
                    >
                        Hủy
                    </Button>,
                    <Button
                        key="link"
                        href="/login"
                        onClick={handleOk}
                        className="bg-blue-800 text-white opacity-75 hover:opacity-100"
                    >
                        Đồng ý
                    </Button>,
                ]}
            >
                <p>{'Bạn có muốn đăng nhập?'}</p>
            </Modal>

            <ModalUpdateComment />
            <ModalDeleteComment laptopId={laptopId} />
        </div>
    )
}

export default CommentItem
