import { Button, Col, Form, Input, Row, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthLogin } from '@/stores/auth/hook'
import BoxArea from '@/components/box-area'
import { useEffect } from 'react'
import { EActionStatus } from '@/stores/type'
import { useNotification } from '@/hooks/use-nofitication'

const { Text } = Typography
const LoginContent = () => {
    const { authState, loginAction, logoutAction, resetStatusAction } =
        useAuthLogin()

    const { openNotification, contextHolder } = useNotification()
    const router = useRouter()
    const onFinish = (values: any) => {
        loginAction({ email: values.email, password: values.password })
    }

    useEffect(() => {
        ;(async () => {
            if (authState.status === EActionStatus.Succeeded) {
                await openNotification({
                    message: 'Bạn đã đăng nhập thành công',
                    placement: 'topRight',
                    type: 'success',
                })
                resetStatusAction()
                await new Promise((resolve) => setTimeout(resolve, 1000))
                await router.push('/laptop')
            }
            if (authState.status === EActionStatus.Failed) {
                openNotification({
                    message: 'Đăng nhập thất bại',
                    placement: 'topRight',
                    type: 'error',
                })
            }
        })()
    }, [authState.status])

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <BoxArea>
            {contextHolder}
            <Row gutter={[16, 24]} className="flex justify-between">
                <Col xs={24} lg={12} className="flex flex-col">
                    <Text>{'Thông tin khách hàng đăng nhập hệ thống'}</Text>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            className="font-semibold"
                            name="email"
                            label={'Email'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Email là bắt buộc',
                                },
                                {
                                    pattern: new RegExp(
                                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    ),
                                    message: 'Vui lòng nhập email hợp lệ',
                                },
                            ]}
                        >
                            <Input size="large" className="font-normal" />
                        </Form.Item>
                        <Form.Item
                            className="font-semibold"
                            name="password"
                            label={'Password'}
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Vui lòng nhập mật khẩu hợp lệ',
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                className="font-normal"
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: '10px' }}>
                            <Link
                                className="font-semibold text-blue-600"
                                href="/forgot-password"
                            >
                                {'Forgot password?'}
                            </Link>
                        </Form.Item>

                        <Form.Item style={{ marginBottom: '10px' }}>
                            <Button
                                size="large"
                                style={{
                                    backgroundColor: '#149B7E',
                                    color: 'white',
                                }}
                                htmlType="submit"
                                className=""
                            >
                                {'Đăng nhập'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col
                    lg={12}
                    xs={24}
                    className="flex flex-col items-start justify-center"
                >
                    <div>
                        <Text>{'Bạn chưa là thành viên?'}</Text>
                    </div>
                    <div className="my-3">
                        <Text className="text-black ">
                            {
                                'Đăng ký là thành viên để hưởng nhiều lợi ích và đặt mua hàng dễ hơn.'
                            }
                        </Text>
                    </div>
                    <div>
                        <Link
                            className="font-semibold text-blue-600"
                            href="/register"
                        >
                            {'Đăng ký tài khoản'}
                        </Link>
                    </div>
                </Col>
            </Row>
        </BoxArea>
    )
}

export default LoginContent
