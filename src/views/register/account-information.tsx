import { Col, Form, FormInstance, Input, Row } from 'antd'
import { IAccountSignUpForm } from '@/views/register/register-content'

interface IAccountInfoProp {
    form: FormInstance<IAccountSignUpForm>
}

const AccountInformation = ({ form }: IAccountInfoProp) => {
    return (
        <div className="bg-white p-6 px-6 py-4">
            <Row>
                <Col xs={24} lg={24}>
                    <Form.Item
                        name="email"
                        label={'email'}
                        rules={[
                            {
                                required: true,
                                message: 'Email là bắt buộc',
                            },
                        ]}
                        className=""
                        labelCol={{ span: 3 }}
                        // shouldUpdate={false}
                    >
                        <Input
                            size="large"
                            style={{ width: '80%' }}
                            placeholder={'Nhập email của bạn'}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={24}>
                    <Form.Item
                        name="name"
                        label={'name'}
                        rules={[
                            {
                                required: true,
                                message: 'Tên là bắt buộc',
                            },
                        ]}
                        labelCol={{ span: 3 }}
                    >
                        <Input size="large" style={{ width: '80%' }} />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={24}>
                    <Form.Item
                        name="address"
                        label={'address'}
                        rules={[
                            {
                                required: true,
                                message: 'Địa chỉ là bắt buộc',
                            },
                        ]}
                        labelCol={{ span: 3 }}
                    >
                        <Input size="large" style={{ width: '80%' }} />
                    </Form.Item>
                </Col>

                <Col xs={24} lg={24}>
                    <Form.Item
                        name="password"
                        label={'password'}
                        rules={[
                            {
                                required: true,
                                message: 'Tên là bắt buộc',
                            },
                        ]}
                        labelCol={{ span: 3 }}
                    >
                        <Input.Password size="large" style={{ width: '80%' }} />
                    </Form.Item>
                </Col>

                <Col xs={24} lg={24}>
                    <Form.Item
                        name="phone"
                        label={'phone'}
                        rules={[
                            {
                                required: true,
                                message: 'Sđt là bắt buộc',
                            },
                        ]}
                        labelCol={{ span: 3 }}
                    >
                        <Input size="large" style={{ width: '80%' }} />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}

export default AccountInformation
