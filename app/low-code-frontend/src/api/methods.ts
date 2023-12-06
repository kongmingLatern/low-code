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

export const handlePostRequest = async (
	apiEndpoint: string,
	values: any,
	successMessage: string
): Promise<ReturnType> => {
	try {
		const res = await post<ReturnType>(apiEndpoint, values)
		if (res.code === 201) {
			message.success(successMessage)
		}
		return res
	} catch (e: any) {
		message.error(e.response?.data?.data)
		return Promise.reject(e.response?.data?.data)
	}
}
