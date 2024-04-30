import BoxArea from '@/components/box-area'
import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import {
    useCreateCommentLaptop,
    useListCommentLaptop,
} from '@/stores/comment/hook'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuthLogin } from '@/stores/auth/hook'
import Loader from '@/components/loader'
import { Button, Col, Form, Input, Modal, notification, Row } from 'antd'
import Image from 'next/image'
import CommentItem from '@/components/comment-item'
import { EActionStatus } from '@/stores/type'
import serviceComment from '@/services/comment'
import { AxiosError } from 'axios'
import { useForm } from 'antd/es/form/Form'

export interface ICommentCreate {
    content: string
}
const CommentList = () => {
    const params = useParams()
    const router = useRouter()
    const laptopId = Number(params.id)
    const { authState } = useAuthLogin()
    const { page, limit } = useAppSelector(
        (state: RootState) => state.commentLaptop,
    )
    const [form] = Form.useForm()
    const [writeComment, setWriteComment] = useState('')
    const [newComment, setNewComment] = useState(EActionStatus.Idle)
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useAppDispatch()
    const [{ commentState }, getListCommentLaptopAction] =
        useListCommentLaptop()
    const { createCommentAction } = useCreateCommentLaptop()
    useEffect(() => {
        if (laptopId) {
            getListCommentLaptopAction(laptopId)
        }
    }, [laptopId, newComment])

    if (!commentState) {
        return <Loader />
    }
    const onFinish = async (values: any) => {
        if (!authState.isAuthenticated) {
            setOpenModal(true)
        } else {
            setNewComment(EActionStatus.Pending)
            // console.log(values)
            try {
                const res = await serviceComment.createComment({
                    content: values.comment,
                    laptopId: laptopId,
                })
                if (res) {
                    notification.success({
                        message: 'Bình luận thành công',
                        description:
                            'Bạn đã bình luận cho máy tính này thành công.',
                    })
                    setNewComment(EActionStatus.Succeeded)
                    setWriteComment('')
                    form.resetFields()
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    notification.error({
                        message: 'Lỗi',
                        description: error?.response?.data?.info?.message,
                    })
                }
                setNewComment(EActionStatus.Failed)
                setWriteComment('')
                form.resetFields()
            }
        }
    }

    const handleOk = () => {
        router.push('/login')
        setOpenModal(false)
    }

    const handleCancel = () => {
        setOpenModal(false)
    }
    return (
        <>
            <BoxArea title={'BÌNH LUẬN VỀ SẢN PHẨM'}>
                <div className="mb-6 flex flex-col gap-6">
                    <Row gutter={[16, 24]}>
                        <Col lg={24} sm={12}>
                            <p>
                                Tổng số bình luận:{' '}
                                {commentState.commentList.length ?? 0}
                            </p>
                        </Col>
                    </Row>
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
                            <Form
                                form={form}
                                onFinish={onFinish}
                                layout="vertical"
                                className="flex flex-col justify-center"
                            >
                                <Form.Item
                                    name="comment"
                                    label={'Bạn có thể bình luận ở đây'}
                                    className="mb-0"
                                >
                                    <Input
                                        size="large"
                                        value={writeComment}
                                        onChange={(e) =>
                                            setWriteComment(e.target.value)
                                        }
                                        placeholder={'Viết bình luận'}
                                        className="border-2 border-b-black"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        className="mt-2 bg-primary text-white"
                                    >
                                        {'Bình luận'}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    <div className="">
                        {commentState.commentList?.map((comment, index) => (
                            <CommentItem
                                id={comment.id}
                                content={comment.content}
                                userId={comment.userId}
                                laptopId={comment.laptopId}
                                updateAt={comment.updateAt}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </BoxArea>
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
        </>
    )
}

export default CommentList
