import { Typography } from 'antd'
import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftOutlined } from '@ant-design/icons'

const { Title } = Typography

interface IDetailTitle extends IBaseTitle {
    urlBack: string
    editButton?: ReactNode
    extraButton?: ReactNode
    addCard?: ReactNode
}

const DetailTitle = ({
    urlBack,
    pageName,
    editButton,
    extraButton,
    addCard,
}: IDetailTitle) => {
    const router = useRouter()

    return (
        <LayoutTitle>
            <div className="z-10 flex items-center gap-2">
                <ArrowLeftOutlined
                    onClick={() => {
                        router.push(urlBack)
                    }}
                />
                <Title level={4} className="mb-0 font-medium">
                    {pageName}
                </Title>
            </div>
            <div className="flex items-center gap-2">
                {editButton}
                {extraButton}
                {addCard}
            </div>
        </LayoutTitle>
    )
}

export default DetailTitle
