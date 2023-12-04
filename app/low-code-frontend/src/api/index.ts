import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
	baseURL: 'http://localhost:3333',
	timeout: 300000,
})

instance.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (token) {
		config['headers'].set(
			'Authorization',
			`Bearer ${localStorage.getItem('token')}`
		)
	}
	return config
})

instance.interceptors.response.use(response => {
	console.log('response', response)
	if (
		response.data.code !== 200 &&
		response.data.code !== 201
	) {
		message.error(response.data.data || '服务器错误')
	}
	return response.data
})

export { instance as http }

export * from './methods'
export * from './urls'
