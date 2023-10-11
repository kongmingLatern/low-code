import React from 'react'
import {
	Button,
	Checkbox,
	Form,
	Input,
	Typography,
} from 'antd'
import { Icon } from '@iconify/react'

const { Title } = Typography

const App: React.FC = () => {
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values)
	}

	return (
		<Form
			name="normal_login"
			className="max-w-[500px] min-w-[400px] absolute-center left-[70%]"
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
			<Form.Item>
				<Form.Item
					name="remember"
					valuePropName="checked"
					noStyle
				>
					<Checkbox className="color-white">
						Remember me
					</Checkbox>
				</Form.Item>

				<a className="login-form-forgot" href="">
					Forgot password
				</a>
			</Form.Item>

			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					className="login-form-button"
				>
					Log in
				</Button>
				Or <a href="">register now!</a>
			</Form.Item>
		</Form>
	)
}

export default App
