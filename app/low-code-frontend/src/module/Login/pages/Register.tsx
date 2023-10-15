import React from 'react'
import {
	Button,
	Checkbox,
	Form,
	Input,
	Select,
	Typography,
} from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const { Option } = Select

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 5 },
	},
}

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 20,
			offset: 4,
		},
	},
}

const { Title } = Typography

const App: React.FC = () => {
	const [form] = Form.useForm()
	const navigate = useNavigate()

	const onFinish = (values: any) => {
		console.log('Received values of form: ', values)
	}

	return (
		<Form
			className="max-w-[500px] min-w-[400px] absolute-center box-content bg-#290e5b"
			style={{
				borderRadius: '20px',
				padding: '50px 50px 10px',
			}}
			{...formItemLayout}
			form={form}
			name="register"
			onFinish={onFinish}
			initialValues={{
				prefix: '86',
			}}
			scrollToFirstError
		>
			<Title
				level={3}
				className="text-center"
				style={{ color: 'white', marginBottom: '1.5rem' }}
			>
				多智协创平台
			</Title>

			<Form.Item
				name="nickname"
				label={<span className="color-white">昵称</span>}
				// tooltip="如何称呼你"
				rules={[
					{
						required: true,
						message: '请输入你的昵称',
						whitespace: true,
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="email"
				label={<span className="color-white">邮箱</span>}
				rules={[
					{
						type: 'email',
						message: '不可用邮箱',
					},
					{
						required: true,
						message: '请输入你的邮箱',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="password"
				label={<span className="color-white">密码</span>}
				rules={[
					{
						required: true,
						message: '请输入你的密码',
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="confirm"
				label={
					<span className="color-white">确认密码</span>
				}
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: '请输入确认密码',
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (
								!value ||
								getFieldValue('password') === value
							) {
								return Promise.resolve()
							}
							return Promise.reject(
								new Error(
									'The new password that you entered do not match!'
								)
							)
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="gender"
				label={<span className="color-white">性别</span>}
				rules={[
					{
						required: true,
						message: '请选择性别',
					},
				]}
			>
				<Select placeholder="请选择你的性别">
					<Option value="male">男</Option>
					<Option value="female">女</Option>
				</Select>
			</Form.Item>

			<Form.Item
				name="agreement"
				valuePropName="checked"
				rules={[
					{
						validator: (_, value) =>
							value
								? Promise.resolve()
								: Promise.reject(
										new Error('请您阅读同意书并勾选')
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  ),
					},
				]}
				{...tailFormItemLayout}
			>
				<Checkbox className="color-white">
					我已阅读 <Link to="/read">同意书</Link>
				</Checkbox>
			</Form.Item>
			<Form.Item
				className="text-right"
				{...tailFormItemLayout}
			>
				<Button
					type="primary"
					htmlType="submit"
					onClick={() => navigate('/login')}
				>
					注册
				</Button>
			</Form.Item>
		</Form>
	)
}

export default App
