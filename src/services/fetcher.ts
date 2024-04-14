import { instance } from './axios'
import { ApiResponse } from './response.type'

type Obj = { [key: string]: any }

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
