import { Button, Form, Input, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { Icon } from '@iconify/react'
import React from 'react'
import { handlers } from '@/shared'
import { sendOnline } from '@packages/server'

const { Title } = Typography

const App: React.FC = () => {
	const nagivate = useNavigate()
	const onFinish = async (values: any) => {
		await handlers
			.login(values)
			.then((isAdmin) => {
				sendOnline(localStorage.getItem('uid'))
				if (isAdmin) {
					nagivate('/admin')
					return
				}
				nagivate('/home')
			})
	}

	return (
		<Form
			name="normal_login"
			className="max-w-[500px] min-w-[400px] absolute-center box-content bg-#290e5b"
			style={{
				borderRadius: '20px',
				padding: '50px 50px 10px',
			}}
			initialValues={{ remember: true }}
			onFinish={onFinish}
		>
			<Title
				level={3}
				className="text-center"
				style={{ color: 'white' }}
			>
				多智协创平台
			</Title>
			<Form.Item
				name="username"
				rules={[
					{
						required: true,
						message: '请输入用户名',
					},
				]}
			>
				<Input
					prefix={<Icon icon="mdi:user" />}
					placeholder="用户名"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: '请输入密码',
					},
				]}
			>
				<Input
					prefix={<Icon icon="mdi:password" />}
					type="password"
					placeholder="密码"
				/>
			</Form.Item>

			<Form.Item className="color-white">
				没有帐号? 去 <Link to={'/register'}>注册</Link>
			</Form.Item>
			<Form.Item className="text-right">
				<Button
					type="primary"
					htmlType="submit"
					className="login-form-button"
				>
					登陆
				</Button>{' '}
			</Form.Item>
		</Form>
	)
}

export default App
