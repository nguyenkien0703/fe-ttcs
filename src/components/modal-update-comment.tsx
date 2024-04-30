import { useListCommentLaptop } from '@/stores/comment/hook'
import { useEffect, useState } from 'react'
import { EActionStatus } from '@/stores/type'
import { useForm } from 'antd/es/form/Form'
import { AxiosError } from 'axios'
import { Button, Form, Input, Modal, notification } from 'antd'
import serviceComment from '@/services/comment'

export interface ICommentUpdateForm {
    content: string
}

const ModalUpdateComment = () => {
    const [
        { commentState },
        getListCommentLaptopAction,
        setOpenModalUpdateCommentAction,
        setOpenModalDeleteCommentAction,
        setIdOpenModalUpdateOrDeleteCommentAction,
    ] = useListCommentLaptop()

    const [initStatus, setInitStatus] = useState<EActionStatus>(
        EActionStatus.Idle,
    )
    const [form] = useForm<ICommentUpdateForm>()
    const [initComment, setInitComment] = useState<ICommentUpdateForm>()
    const commentId = Number(commentState.id)

    useEffect(() => {
        const fetchData = async () => {
            setInitStatus(EActionStatus.Pending)
            try {
                const res = await serviceComment.getDetailComment(commentId)
                if (res) {
                    setInitComment({
                        content: res.content,
                    })
                }
                setInitStatus(EActionStatus.Succeeded)
            } catch (error) {
                if (error instanceof AxiosError) {
                    notification.error({
                        message: 'Lỗi',
                        description: error.response?.data.info.message,
                    })
                }

                setInitStatus(EActionStatus.Failed)
            }
        }
        if (commentId) {
            fetchData()
        }
    }, [commentId])
    useEffect(() => {
        form.setFieldsValue({
            content: initComment?.content,
        })
    }, [initComment])

    // if (!initComment || initStatus === EActionStatus.Pending) {
    //     return <Loader />
    // }

    const handleOk = () => {}
    const handleCancel = () => {
        form.resetFields()
        setOpenModalUpdateCommentAction(false)
        setIdOpenModalUpdateOrDeleteCommentAction(0)
        setInitComment(undefined)
    }

    const onFinish = async (values: ICommentUpdateForm) => {
        try {
            const res = await serviceComment.updateComment(commentId, {
                content: values.content ?? '',
            })
            if (res) {
                notification.success({
                    message: 'Thành công',
                    description: 'Cập nhật bình luận thành công',
                })
                form.resetFields()
                setOpenModalUpdateCommentAction(false)
                setIdOpenModalUpdateOrDeleteCommentAction(0)
                setInitComment(undefined)
                getListCommentLaptopAction(res.laptopId)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: 'Lỗi',
                    description: error.response?.data.info.message,
                })
            }
        }
    }

    return (
        <Modal
            title={'Cập nhật bình luận của bạn'}
            open={commentState.openModalUpdateComment}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            maskClosable={false}
            centered
        >
            <div className="mb-6">
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={{ ...initComment }}
                    onFinish={onFinish}
                >
                    <Form.Item name="content" label={'Nội dung bình luận'}>
                        <Input size="large" placeholder={'Bình luận.....'} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ span: 24 }}
                        className="mt-10 flex justify-center"
                    >
                        <Button
                            size="large"
                            className="bg-#5151E5 rounded text-center text-sm font-semibold shadow-sm transition duration-200 hover:border-white hover:bg-[#e9eaeb] hover:text-black"
                            style={{ marginRight: '30px' }}
                            onClick={handleCancel}
                        >
                            Hủy
                        </Button>
                        <Button
                            size="large"
                            htmlType="submit"
                            className="bg-#5151E5 rounded bg-primary text-center text-sm font-semibold text-white text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                        >
                            Đăng
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default ModalUpdateComment
