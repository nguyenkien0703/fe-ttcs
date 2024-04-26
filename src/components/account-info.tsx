import { Dropdown, MenuProps, Typography } from 'antd'
import { useAuthLogin } from '@/stores/auth/hook'
import Link from 'next/link'
import Image from 'next/image'
import { DownOutlined } from '@ant-design/icons'
const { Text } = Typography

const AccountInfo = ({ avatar }: { name: string; avatar: string }) => {
    const { authState, logoutAction } = useAuthLogin()

    const handleLogout = async () => {
        logoutAction()
    }

    const items: MenuProps['items'] = [
        // {
        //     key: '0',
        //     label: (
        //         <Link
        //             className="py-[5px] text-sm leading-[22px]"
        //             rel="noopener noreferrer"
        //             href="/dashboard"
        //         >
        //             DASHBOARD
        //         </Link>
        //     ),
        // },
        // {
        //     key: '1',
        //     label: (
        //         <Link
        //             className="py-[5px] text-sm  leading-[22px]"
        //             rel="noopener noreferrer"
        //             href="/profile"
        //         >
        //             MY_PROFILE
        //         </Link>
        //     ),
        // },
        {
            key: '2',
            label: (
                <Link
                    className="py-[5px] text-sm  leading-[22px]"
                    rel="noopener noreferrer"
                    href="/card"
                >
                    Card
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <div
                    className="py-[5px] text-sm leading-[22px]"
                    onClick={async () => {
                        handleLogout()
                        await new Promise((resolve) => setTimeout(resolve, 500))
                    }}
                >
                    Logout
                </div>
            ),
        },
    ]

    return (
        <Dropdown
            arrow={true}
            menu={{ items }}
            placement="bottomLeft"
            overlayStyle={{ borderRadius: '2px' }}
            className="cursor-pointer"
        >
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <Image
                        src={avatar}
                        alt={'avatar'}
                        width={24}
                        height={24}
                        className="h-8 w-8 rounded-full"
                    />
                    <Text className="text-sm leading-[22px] text-white">
                        {authState.userData?.name ?? 'Unknow'}
                    </Text>
                </div>
                <DownOutlined className="h-[10px] w-[10px] text-white" />
            </div>
        </Dropdown>
    )
}

export default AccountInfo
