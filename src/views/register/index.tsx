import HeaderUser from '@/components/workspace-layout/header-user'
import FooterUser from '@/components/workspace-layout/footer-user'
import RegisterContent from '@/views/register/register-content'
import ListBrand from '@/components/brand/listBrand'

const Register = () => {
    return (
        <div className="flex max-h-full flex-col justify-between  gap-y-16">
            <HeaderUser />
            <ListBrand />
            <RegisterContent />
            <FooterUser />
        </div>
    )
}

export default Register
