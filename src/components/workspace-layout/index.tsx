'use client'
import { ReactNode, useEffect, useState } from 'react'
import { useAuthLogin } from '@/stores/auth/hook'
import { Layout } from 'antd'
import HeaderUser from '@/components/workspace-layout/header-user'
import Sidebar from '@/components/workspace-layout/sidebar'

export interface IWorkspaceLayout {
    children: ReactNode
}

const WorkspaceLayout = (props: IWorkspaceLayout) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
    const { authState } = useAuthLogin()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <Layout className="min-h-screen">
            <HeaderUser />
            <Layout className="">
                {mounted && authState.isAuthenticated && (
                    <Sidebar
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                    />
                )}
            </Layout>
        </Layout>
    )
}
export default WorkspaceLayout
