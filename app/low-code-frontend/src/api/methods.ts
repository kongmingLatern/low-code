import { http } from '.'
import { message } from 'antd'

export interface ReturnType {
	code: number
	data: Record<string, any>
	message: string
}

export async function get<T>(
	path: string,
	params?: Record<string, any>
): Promise<T> {
	return await http.get(path, {
		params: { ...params },
	})
}

export async function post<T>(
	path: string,
	body?: Record<string, any>
): Promise<T> {
	return await http.post(path, body)
}

export async function put<T>(
	path: string,
	body?: Record<string, any>
): Promise<T> {
	return await http.put(path, body)
}

export const deleteAPI = async <T>(
	url,
	params
): Promise<T> => {
	console.log(url, params)

	return await http.delete(url, {
		params,
	})
}

export const handlePostRequest = async (
	apiEndpoint: string,
	values: any,
	successMessage: string,
	callback: (res: any) => void = () => {}
): Promise<ReturnType> => {
	try {
		const res = await post<ReturnType>(apiEndpoint, values)
		if (res.code === 201) {
			message.success(successMessage)
			callback(res)
		}
		return res
	} catch (e: any) {
		message.error(e.response?.data?.data)
		return Promise.reject(e.response?.data?.data)
	}
}

export const handleDeleteRequest = async (
	url: string,
	values: any,
	successMessage: string = '删除成功'
) => {
	try {
		const res = await deleteAPI<ReturnType>(url, values)
		if (res.code === 200) {
			message.success(successMessage)
		}
		return res
	} catch (e: any) {
		message.error(e.response?.data?.data)
		return Promise.reject(e.response?.data?.data)
	}
}
export const handlePutRequest = async (
	apiEndpoint: string,
	values: any,
	successMessage: string = '更新成功',
	callback: (res: any) => void = () => {}
): Promise<ReturnType> => {
	try {
		const res = await put<ReturnType>(apiEndpoint, values)
		if (res.code === 200) {
			message.success(successMessage)
			callback(res)
		}
		return res
	} catch (e: any) {
		message.error(e.response?.data?.data)
		return Promise.reject(e.response?.data?.data)
	}
}
