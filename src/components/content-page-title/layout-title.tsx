import { ReactNode } from 'react'

export interface IBaseTitle {
    pageName?: string
}

export interface ILayoutTitle {
    children: ReactNode
}

const LayoutTitle = ({ children }: ILayoutTitle) => {
    return (
        <div className="content-title -z10 sticky top-12 flex items-center justify-between bg-white px-6 py-4">
            {children}
        </div>
    )
}

export default LayoutTitle
