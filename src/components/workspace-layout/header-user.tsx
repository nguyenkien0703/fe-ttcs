import { useAuthLogin } from '@/stores/auth/hook'
import { Button, Layout } from 'antd'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import AccountInfo from '@/components/account-info'
import { useRouter } from 'next/navigation'
const HeaderUser = () => {
    const { authState } = useAuthLogin()
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <Layout.Header className="fixed z-10 h-12 w-full bg-primary px-4 py-0 text-white">
            <div className="flex h-full items-center justify-between">
                <Link href="/">
                    <img
                        src="https://fptshop.com.vn/uploads/originals//fpt-shop-tuyen-nhieu-vi-tri-lam-viec-tai-cac-shop-ha-noi-id27942.png"
                        alt="image_errors"
                        style={{ width: '180px', height: '50px' }}
                    />
                </Link>
                <div className="flex gap-7">
                    {mounted && authState.isAuthenticated && (
                        <AccountInfo
                            name="Stan Lee"
                            avatar="/images/default-avatar.png"
                        />
                    )}
                    {mounted && !authState.isAuthenticated && (
                        <Button
                            size="large"
                            style={{
                                backgroundColor: '#5B5B5B',

                                color: 'white',
                                borderRadius: '10px',
                            }}
                            onClick={() => {
                                router.push('/login')
                            }}
                        >
                            {'Đăng nhập'}
                        </Button>
                    )}
                </div>
            </div>
        </Layout.Header>
    )
}

export default HeaderUser
