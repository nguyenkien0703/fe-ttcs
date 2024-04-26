import { NotificationPlacement } from 'antd/es/notification/interface'
import { NoticeType } from 'antd/es/message/interface'
import { notification } from 'antd'

export interface INotification {
    message: string
    placement: NotificationPlacement
    type: NoticeType
    description?: string
}

export const useNotification = () => {
    const [api, contextHolder] = notification.useNotification()
    const openNotification = ({
        message,
        placement,
        type,
        description,
    }: INotification) => {
        const notificationData = {
            message,
            placement,
            description,
            duration: 2,
        }
        switch (type) {
            case 'info':
                api.info(notificationData)
                break
            case 'success':
                api.success(notificationData)
                break
            case 'warning':
                api.warning(notificationData)
                break
            default:
                api.error(notificationData)
        }
    }
    return {
        openNotification,
        contextHolder,
    }
}
