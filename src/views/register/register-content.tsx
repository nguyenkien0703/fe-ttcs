import { useForm } from 'antd/es/form/Form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { EActionStatus } from '@/stores/type'
import { Form, notification } from 'antd'
import CreateTitle from '@/components/content-page-title/create-title'
import SaveCreateAccountButton from '@/views/register/save-button'
import AccountInformation from '@/views/register/account-information'
import serviceUser from '@/services/user'
import { AxiosError } from 'axios'

export interface IAccountSignUpForm {
    email: string
    name: string
    address: string
    password: string
    phone: string
}

const RegisterContent = () => {
    const [form] = useForm<IAccountSignUpForm>()
    const router = useRouter()
    const [status, setStatus] = useState(EActionStatus.Idle)

    const onFinish = async (values: IAccountSignUpForm) => {
        try {
            const res = await serviceUser.signUp({
                email: values.email,
                password: values.password,
                address: values.address,
                phone: values.phone,
                name: values.name,
            })
            if (res) {
                notification.success({
                    message: 'Tạo thành công',
                    description: 'Đăng ký tài khoản thành công',
                })
                router.push('/login')
                form.resetFields()
                setStatus(EActionStatus.Succeeded)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: 'Lỗi',
                    description:
                        'Đăng ký tài khoản thất bại. Email đã bị trùng.',
                })
            }
            setStatus(EActionStatus.Failed)
        }
    }

    return (
        <Form onFinish={onFinish} form={form} layout="horizontal">
            <CreateTitle
                pageName={'Đăng ký tài khoản'}
                saveButton={
                    <SaveCreateAccountButton
                        form={form}
                        isLoading={status === EActionStatus.Pending}
                    />
                }
            />
            <div className="p-6">
                <AccountInformation form={form} />
            </div>
        </Form>
    )
}

export default RegisterContent
