import { instance } from './axios'
import { ApiResponse } from './response.type'
import serviceUser from '@/services/user'

type Obj = { [key: string]: any }

instance.interceptors.response.use((response) => {
    const { status, data } = response
    if (status === 200 || status === 201) {
        return data
    }
    return Promise.reject(data)
})

instance.interceptors.request.use(
    (config) => {
        const accessToken = serviceUser.getAccessTokenStorage()
        if (
            !!accessToken &&
            config.headers &&
            !config.headers['Authorization']
        ) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

function get<T, R = ApiResponse<T>>(route: string, params?: Obj): Promise<R> {
    return instance.get(route, { params })
}

function post<T, R = ApiResponse<T>>(route: string, payload?: Obj): Promise<R> {
    return instance.post(route, payload)
}

function put<T, R = ApiResponse<T>>(route: string, payload?: Obj): Promise<R> {
    return instance.put(route, payload)
}

function patch<T, R = ApiResponse<T>>(
    route: string,
    payload?: Obj,
): Promise<R> {
    return instance.patch(route, payload)
}

function del<T, R = ApiResponse<T>>(route: string): Promise<R> {
    return instance.delete(route)
}
export { del, get, patch, post, put }
