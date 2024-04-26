import { Button, Col, Input, Row } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

const FooterUser = () => {
    return (
        <div
            className=""
            style={{ backgroundColor: '#E0E0E0', paddingBottom: '1rem' }}
        >
            <Row
                style={{ paddingTop: '1rem' }}
                className="flex justify-center gap-5"
            >
                <Col sm={8}>
                    <h5>Truy cập nhanh</h5>
                    <ul style={{ listStyleType: 'none', padding: '0px' }}>
                        <li>Trang chủ</li>
                        <li>Giỏ hàng</li>
                        <li>Liên hệ</li>
                    </ul>
                </Col>

                <Col sm={8}>
                    <h5>Địa chỉ cửa hàng</h5>
                    <strong>NAP Showroom Center</strong>
                    <p>Yên Vỹ - Hòa Tiến - Yên Phong - Bắc Ninh</p>
                    <strong>Điện thoại: 0337479966</strong>
                </Col>
                <Col>
                    <h5>Nhận thông tin</h5>
                    <p>Đăng ký để nhận thông tin mới nhất từ cửa hàng</p>
                    <div className="flex gap-1">
                        <Input
                            className="w-[300px]"
                            size="large"
                            placeholder="nguyenkien@gmail.com"
                        />
                        <Button size="large">Submit</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default FooterUser
