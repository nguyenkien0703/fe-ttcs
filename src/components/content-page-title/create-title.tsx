import { Modal, Typography } from 'antd'
import { ReactNode, useState } from 'react'
import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

const { Text, Title } = Typography

interface ICreateTitle extends IBaseTitle {
    saveButton: ReactNode
}

const CreateTitle = ({ pageName, saveButton }: ICreateTitle) => {
    const router = useRouter()

    return (
        <>
            <LayoutTitle>
                <div className="flex items-center gap-2">
                    <ArrowLeftOutlined
                        onClick={() => {
                            router.back()
                        }}
                    />
                    <Title level={4} className="mb-0 font-medium">
                        {pageName}
                    </Title>
                </div>
                <div className="flex items-center gap-2">{saveButton}</div>
            </LayoutTitle>
        </>
    )
}

export default CreateTitle
