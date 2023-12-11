import { message } from 'antd'

export const exitLogin = navigate => {
	localStorage.clear()
	message.success('已退出')
	navigate('/login')
}
