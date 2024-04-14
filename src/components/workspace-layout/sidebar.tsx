import { useAuthLogin } from '@/stores/auth/hook'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { MenuProps, Menu, Layout, Button } from 'antd'
import {
    SIDEBAR_CLOSE_WIDTH,
    SIDEBAR_ITEMS,
    SIDEBAR_OPEN_WIDTH,
} from '@/constants/common'
import { checkRole } from '@/utils/auth'
import { createElement, useCallback } from 'react'
import { capitalizeFirstLetter } from '@/utils/format-string'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

interface ISidebar {
    isCollapsed: boolean
    setIsCollapsed: (value: boolean) => void
}
type MenuItem = Required<MenuProps>['items'][number]
const Sidebar = ({ isCollapsed, setIsCollapsed }: ISidebar) => {
    const { authState } = useAuthLogin()
    const pathname = usePathname()

    const router = useRouter()
    const redirect = ({ key }: { key: string }) => {
        router.push(key)
    }

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    const menuItems: MenuItem[] = SIDEBAR_ITEMS.map((sidebarItem) => {
        const { label, key, icon, role } = sidebarItem
        if (role && checkRole(authState?.userData?.role, role)) {
            return {
                key,
                icon: createElement(icon),
                label: capitalizeFirstLetter(label),
            }
        }
        return null
    })

    const getSelectedKey = useCallback(() => {
        let selectedKey: string = ''
        for (const sidebarItem of SIDEBAR_ITEMS) {
            if (pathname.includes(sidebarItem.key)) {
                selectedKey = sidebarItem.key
                break
            }
        }
        return selectedKey
    }, [pathname])

    const sidebarWith = isCollapsed ? SIDEBAR_CLOSE_WIDTH : SIDEBAR_OPEN_WIDTH

    return (
        <Layout.Sider
            width={sidebarWith}
            collapsible
            trigger={null}
            collapsed={isCollapsed}
            className="fixed h-full overflow-auto bg-white"
        >
            <Menu
                className="h-full"
                onClick={redirect}
                mode={'inline'}
                selectedKeys={[getSelectedKey()]}
                items={menuItems}
            />
            <div
                className={`fixed bottom-0 left-0 z-20 flex h-10 items-center border-t px-6`}
                style={{ width: `${sidebarWith}px` }}
            >
                <Button
                    type="text"
                    icon={
                        isCollapsed ? (
                            <MenuUnfoldOutlined />
                        ) : (
                            <MenuFoldOutlined />
                        )
                    }
                    onClick={toggleSidebar}
                />
            </div>
        </Layout.Sider>
    )
}

export default Sidebar
