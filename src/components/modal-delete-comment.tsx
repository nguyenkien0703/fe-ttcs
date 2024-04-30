import { useListCommentLaptop } from '@/stores/comment/hook'
import { useState } from 'react'
import { EActionStatus } from '@/stores/type'
import { Modal, notification } from 'antd'
import serviceComment from '@/services/comment'
import { AxiosError } from 'axios'

const ModalDeleteComment = ({ laptopId }: { laptopId: number }) => {
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
    const commentId = Number(commentState.id)

    const handleOk = async (commentId: number) => {
        setInitStatus(EActionStatus.Pending)
        try {
            const res = await serviceComment.deleteComment(commentId)
            if (res) {
                notification.success({
                    message: 'Thành công',
                    description: 'Xóa bình luận thành công',
                })
            }
            setOpenModalDeleteCommentAction(false)
            setIdOpenModalUpdateOrDeleteCommentAction(0)
            setInitStatus(EActionStatus.Succeeded)
            getListCommentLaptopAction(laptopId)
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
    const handleCancel = () => {
        setOpenModalDeleteCommentAction(false)
    }
    return (
        <Modal
            title={'Xóa bình luận'}
            open={commentState.openModalDeleteComment}
            onOk={() => handleOk(commentId)}
            onCancel={handleCancel}
            // footer={null}
            okText={'Xóa'}
            cancelText={'Hủy'}
            maskClosable={false}
            centered
            okButtonProps={{
                style: {
                    backgroundColor: 'green',
                    color: 'white',
                    borderColor: 'green',
                },
            }}
            cancelButtonProps={{
                style: {
                    backgroundColor: 'red',
                    color: 'white',
                    borderColor: 'red',
                },
            }}
        >
            <p>Xác nhận xóa bình luận</p>
        </Modal>
    )
}

export default ModalDeleteComment
