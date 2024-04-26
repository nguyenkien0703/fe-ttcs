import { IWorkspaceLayout } from '@/components/workspace-layout/index'
import { Layout } from 'antd'

interface IContent extends IWorkspaceLayout {
    // isCollapsed: boolean
}

const Content = ({ children }: IContent) => {
    // const sidebarWidth = isCollapsed ? SIDEBAR_CLOSE_WIDTH : SIDEBAR_OPEN_WIDTH
    return (
        <Layout.Content
        // style={{
        //     // marginLeft: `${sidebarWidth}px`,
        //     transition: `margin-left .15s`,
        // }}
        >
            {children}
        </Layout.Content>
    )
}
export default Content
