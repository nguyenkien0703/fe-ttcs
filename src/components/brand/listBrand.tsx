import { Col, Row } from 'antd'

const ListBrand = () => {
    return (
        <div
            style={{
                margin: '1rem 0',
                backgroundColor: '#FFFFFF',
                border: 'solid 1px #DDDDDD',
            }}
        >
            <Row gutter={[16, 24]}>
                <Col lg={2} xs={1}></Col>
                <Col lg={20} xs={22} id="list-brand">
                    <h4
                        style={{
                            display: 'block',
                            textAlign: 'center',
                            marginTop: '0.5rem',
                        }}
                    >
                        Khách hàng đối tác
                    </h4>
                    <div className="flex items-center   justify-between">
                        <span className="item">
                            <a href="/">
                                <img
                                    src="https://phucanhcdn.com/media/brand/asus.png"
                                    alt="Asus"
                                />
                            </a>
                        </span>
                        <span className="item">
                            <a href="/">
                                <img
                                    src="https://phucanhcdn.com/media/brand/acer.png"
                                    alt="Asus"
                                />
                            </a>
                        </span>
                        <span className="item">
                            <a href="/">
                                <img
                                    src="https://phucanhcdn.com/media/brand/apple.png"
                                    alt="Asus"
                                />
                            </a>
                        </span>
                        <span className="item">
                            <a href="/">
                                <img
                                    src="https://phucanhcdn.com/media/brand/lenovo.png"
                                    alt="Asus"
                                />
                            </a>
                        </span>
                        <span className="item">
                            <a href="/">
                                <img
                                    src="https://phucanhcdn.com/media/brand/msi.png"
                                    alt="Asus"
                                />
                            </a>
                        </span>
                        <span className="item">
                            <a href="/">
                                <img
                                    src="https://phucanhcdn.com/media/brand/dell.png"
                                    alt="Asus"
                                />
                            </a>
                        </span>
                    </div>
                </Col>
                <Col lg={2} xs={1}></Col>
            </Row>
        </div>
    )
}

export default ListBrand
