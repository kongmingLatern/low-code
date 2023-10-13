import { http } from '.'

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
