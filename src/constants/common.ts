import {
    ClusterOutlined,
    DashboardOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons'

export interface ISidebarItem {
    icon: any
    label: string
    key: string
    role?: string
}

export const SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        icon: DashboardOutlined,
        label: 'DASHBOARD',
        key: '/dashboard',
        role: 'admin',
    },
    {
        icon: SettingOutlined,
        label: 'SETTING_ROLES',
        key: '/setting-role',
        role: 'admin',
    },
    {
        icon: ClusterOutlined,
        label: 'BOARD_MEETINGS',
        key: '/board-meeting',
        role: 'admin',
    },
    {
        icon: VideoCameraOutlined,
        label: 'SHAREHOLDERS_MEETINGS',
        key: '/meeting',
        role: 'admin',
    },
    {
        icon: UserOutlined,
        label: 'ACCOUNTS',
        key: '/account',
        role: 'admin',
    },
    {
        icon: TeamOutlined,
        label: 'SHAREHOLDERS',
        key: '/shareholder',
        role: 'admin',
    },
]

export const SIDEBAR_OPEN_WIDTH: number = 208
export const SIDEBAR_CLOSE_WIDTH: number = 80
export const CONSTANT_EMPTY_STRING: string = ''
