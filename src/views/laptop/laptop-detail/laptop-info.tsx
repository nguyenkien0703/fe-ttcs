import { useLaptopDetail } from '@/stores/laptop/hook'
import {
    IRowLaptopInfo,
    RowLaptopInfo,
} from '@/views/laptop/laptop-detail/laptop-rowinfo'
import Image from 'next/image'
import { Col, Row } from 'antd'

const LaptopInfo = () => {
    const [{ laptop }] = useLaptopDetail()

    const dataLaptopDetailLeft: IRowLaptopInfo[] = [
        {
            label: 'IMAGE',
            content: laptop?.image && (
                <div className="">
                    <Image
                        src={laptop.image}
                        alt={'image'}
                        width={150}
                        height={200}
                    />
                </div>
            ),
            lg: 3,
        },
        {
            label: 'MATERIAL',
            content: <p>{laptop?.material || ''}</p>,
            lg: 3,
        },
        {
            label: 'BRAND',
            content: <p>{laptop?.brand || ''}</p>,
            lg: 3,
        },
        {
            label: 'QUANTITY',
            content: <p>{laptop?.quantity || ''}</p>,
            lg: 3,
        },
        {
            label: 'PIN',
            content: <p>{laptop?.pin}</p>,
            lg: 3,
        },
        {
            label: 'PRICE',
            content: <p>{laptop?.price}</p>,
            lg: 3,
        },
    ]

    const dataLaptopDetailRight: IRowLaptopInfo[] = [
        {
            label: 'NAME',
            content: <p>{laptop?.name || ''}</p>,
            lg: 6,
        },
        {
            label: 'CPU',
            content: <p>{laptop?.cpu}</p>,
            lg: 6,
        },
        {
            label: 'RAM',
            content: <p>{laptop?.ram}</p>,
            lg: 6,
        },
        {
            label: 'SCREEN',
            content: <p>{laptop?.screen}</p>,
            lg: 6,
        },
        {
            label: 'COLOR',
            content: <p>{laptop?.color}</p>,
            lg: 6,
        },
        {
            label: 'OS',
            content: <p>{laptop?.os}</p>,
            lg: 6,
        },
        {
            label: 'STORAGE',
            content: <p>{laptop?.storage}</p>,
            lg: 6,
        },
        {
            label: 'GRAPHICCARD',
            content: <p>{laptop?.graphicCard}</p>,
            lg: 6,
        },
        {
            label: 'DESCRIPTION',
            content: <p>{laptop?.description}</p>,
            lg: 6,
        },
    ]

    return (
        <div className="bg-white p-6 px-6 py-4">
            <Row gutter={[0, 0]} className="min-w-[1184px]">
                <Col xs={24} lg={12}>
                    {dataLaptopDetailLeft.map((item, index) => {
                        return (
                            <Col xs={24} key={index}>
                                <RowLaptopInfo
                                    label={item.label}
                                    content={item.content}
                                    xs={item?.xs}
                                    lg={item?.lg}
                                />
                            </Col>
                        )
                    })}
                </Col>
                <Col xs={24} lg={12}>
                    {dataLaptopDetailRight.map((item, index) => {
                        return (
                            <Col xs={24} key={index}>
                                <RowLaptopInfo
                                    label={item.label}
                                    content={item.content}
                                    xs={item?.xs}
                                    lg={item?.lg}
                                />
                            </Col>
                        )
                    })}
                </Col>
            </Row>
        </div>
    )
}

export default LaptopInfo
