import { handlePostRequest, post, urls } from '@/api'

import { message } from 'antd'

interface LoginType {
	code: number
	data: Record<string, any>
	message: string
}

export const loginHandler = async values => {
	return await post<LoginType>(urls.auth.login, values)
		.then((res: LoginType) => {
			if (res.code === 201) {
				localStorage.setItem('token', res.data.token)
				localStorage.setItem('uid', res.data.uid)
				localStorage.setItem('nickname', res.data.nickname)
				message.success('登陆成功')
				return res
			}
			return Promise.reject('登陆失败')
		})
		.catch(e => {
			message.error(e.response.data.data)
			return Promise.reject(e.response.data.data)
		})
}

export const registerHandle = async values => {
	return await handlePostRequest(
		urls.auth.register,
		values,
		'注册成功'
	)
}
