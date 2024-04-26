import { Input, Typography } from 'antd'
import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useAuthLogin } from '@/stores/auth/hook'
import Link from 'next/link'
import AccountInfo from '@/components/account-info'

const { Title } = Typography
interface IListTitle extends IBaseTitle {
    addButton?: ReactNode
    editButton?: ReactNode
    onChangeInput?: ((value: string) => void) | undefined
}
const ListTitle = ({
    pageName,
    addButton,
    editButton,
    onChangeInput,
}: IListTitle) => {
    const { authState } = useAuthLogin()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChangeInput) {
            onChangeInput(event.target.value)
        }
    }

    return (
        <LayoutTitle>
            {pageName && (
                <Title level={4} className="mb-0 font-medium">
                    {pageName}
                </Title>
            )}

            <div className="items flex items-center gap-2">
                <Input
                    className="w-[200px]"
                    size="large"
                    addonAfter={<SearchOutlined />}
                    placeholder={'Nhập tên laptop'}
                    onChange={handleInputChange}
                />
                {addButton}
                {editButton}
            </div>
        </LayoutTitle>
    )
}

export default ListTitle
