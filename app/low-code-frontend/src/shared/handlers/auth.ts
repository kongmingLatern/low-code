import { handlePostRequest, urls } from '@/api'

export const loginHandler = async values => {
	return await handlePostRequest(
		urls.auth.login,
		values,
		'登陆成功',
		res => {
			localStorage.setItem('token', res.data.token)
			localStorage.setItem('uid', res.data.uid)
			localStorage.setItem('nickname', res.data.nickname)
			return res.data.isAdmin
		},
		res => {
			throw new Error(res.data)
		}
	)
}

export const registerHandle = async values => {
	return await handlePostRequest(
		urls.auth.register,
		values,
		'注册成功'
	)
}
