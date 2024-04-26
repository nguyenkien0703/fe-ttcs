import { Typography } from 'antd'
import { useAuthLogin } from '@/stores/auth/hook'
import { useRouter } from 'next/navigation'
import HeaderUser from '@/components/workspace-layout/header-user'
import FooterUser from '@/components/workspace-layout/footer-user'
import LoginContent from '@/views/login/login-content'
import ListBrand from '@/components/brand/listBrand'

const { Text } = Typography

const Login = () => {
    return (
        <div className="flex max-h-full flex-col justify-between  gap-y-16">
            <HeaderUser />
            <ListBrand />
            <LoginContent />
            <FooterUser />
        </div>
    )
}

export default Login
