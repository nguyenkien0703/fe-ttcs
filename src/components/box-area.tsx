import { ReactNode } from 'react'
import { Typography } from 'antd'

interface IBoxArea {
    title?: string
    children: ReactNode
}
const { Title } = Typography

const BoxArea = ({ title, children, ...rest }: IBoxArea) => {
    return (
        <div {...rest} className="bg-white">
            <div className="px-6 py-4">
                <Title level={5} className="mb-0 font-medium">
                    {title}
                </Title>
            </div>
            <div className="p-6">{children}</div>
        </div>
    )
}
export default BoxArea
