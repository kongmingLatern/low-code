import axios from 'axios'

const instance = axios.create({
	baseURL: '/',
	timeout: 300000,
})

instance.interceptors.request.use(config => config)

instance.interceptors.response.use(response => {
	return response.data
})


export { instance as http }

export * from './methods'
