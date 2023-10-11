import React from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

const { Title } = Typography

const App: React.FC = () => {
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values)
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
						message: 'Please input your Username!',
					},
				]}
			>
				<Input
					prefix={<Icon icon="mdi:user" />}
					placeholder="Username"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: 'Please input your Password!',
					},
				]}
			>
				<Input
					prefix={<Icon icon="mdi:password" />}
					type="password"
					placeholder="Password"
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
