import { Modal, Typography } from 'antd'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { ArrowLeftOutlined } from '@ant-design/icons'

const { Text, Title } = Typography

interface ICreateTitle extends IBaseTitle {
    saveButton: ReactNode
}

const CreateTitle = ({ pageName, saveButton }: ICreateTitle) => {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOk = () => {
        router.back()
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <LayoutTitle>
                <div className="flex items-center gap-2">
                    <ArrowLeftOutlined
                        onClick={() => {
                            setIsModalOpen(true)
                        }}
                    />
                    <Title level={4} className="mb-0 font-medium">
                        {pageName}
                    </Title>
                </div>
                <div className="flex items-center gap-2">{saveButton}</div>
            </LayoutTitle>

            <Modal
                title={'TITLE_CONFIRM_BACK'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={'BTN_CONFIRM'}
                cancelText={'BTN_CANCLE'}
            >
                <p>{'CONTENT_CONFIRM_BACK'}</p>
            </Modal>
        </>
    )
}

export default CreateTitle
