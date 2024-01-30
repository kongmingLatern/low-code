import {
	Button,
	Form,
	Input,
	Modal,
	ModalProps,
	Select,
	Space,
	Typography,
} from 'antd'
import { ROLE, formatJsonToObject } from '@/shared'
import React, { useState } from 'react'

import { BaseButtonProps } from 'antd/es/button/button'
import { Icon } from '@iconify/react/dist/iconify.js'
import TextArea from 'antd/es/input/TextArea'

export interface ModalButtonType {
	// NOTE: 用于权限区分
	role?: ROLE
	type?: BaseButtonProps['type']
	text?: string
	title?: string
	form?: boolean
	formItem?: Array<Record<string, any>>
	showJson?: boolean
	initialValues?: Record<string, any>
	content?: React.ReactNode
	children?: React.ReactNode
	onOk?: (...args) => void
	onCancel?: (...args) => void
}


const App: React.FC<
	ModalButtonType & ModalProps
> = props => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [formRef] = Form.useForm();

	const {
		role = ROLE.PROJECT_MANAGER,
		type = 'primary',
		text,
		content,
		children,
		title,
		form = false,
		formItem,
		showJson = false,
		initialValues = {},
		onOk,
		onCancel,
		...rest
	} = props


	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = res => {
		onOk && onOk(res)
		setIsModalOpen(false)
	}

	const handleCancel = res => {
		onCancel && onCancel(res)
		setIsModalOpen(false)
	}

	const handleTypeInput = (
		type = 'input',
		options = {}
	) => {
		switch (type) {
			case 'input':
				return <Input {...options} />
			case 'textarea':
				return <TextArea {...options} />
			case 'select':
				return <Select {...options} />
			default:
				return <Input {...options} />
		}
	}

	return role === ROLE.PROJECT_MANAGER ? (<>
		<Button type={type} onClick={showModal}>
			{children || text}
		</Button>
		<Modal
			title={title}
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
			{...rest}
		>
			{form && formItem && (
				<Form
					form={formRef}
					className="mt-1.5rem"
					name="basic"
					onFinish={handleOk}
					onFinishFailed={handleCancel}
					autoComplete="off"
					initialValues={initialValues}
				>
					{formItem.map((i, index) => {

						if (i.type === 'dynamic') {
							return (
								<Form.List name={i.props.name || 'props'} key={index}>
									{(fields, { add, remove }) => (
										<>
											{fields.map(({ key, name, ...restField }) => (
												<Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
													<Form.Item
														{...restField}
														label={i.props.name}
														name={[name, i.inject?.targetKey[0] || 'key']}
														rules={[{ required: true, message: '值不能为空' }]}
													>
														<Input placeholder={`请输入${i.inject?.targetKey[0] || 'key'}值`} />
													</Form.Item>
													<Form.Item
														{...restField}
														name={[name, i.inject?.targetKey[1] || 'value']}
														rules={[{ required: true, message: '值不能为空' }]}
													>
														<Input placeholder={`请输入key对应的value值`} />
													</Form.Item>
													<Icon icon="ic:baseline-minus" onClick={() => remove(name)} />
												</Space>
											))}
											<Form.Item>
												<Button type="dashed" onClick={() => add()} block icon={<Icon icon="ic:baseline-plus" />}>
													新增{i.props.name}属性
												</Button>
											</Form.Item>
										</>
									)}
								</Form.List>
							)
						}

						return (
							(
								<Form.Item {...i.props} key={index}>
									{handleTypeInput(i.type, i?.inject)}
								</Form.Item>
							)
						)
					})}
					{
						showJson && <Form.Item noStyle shouldUpdate>
							{() => (
								<Typography.Text>
									预览:<pre>{JSON.stringify(formatJsonToObject(formRef.getFieldsValue()), null, 2)}</pre>
								</Typography.Text>
							)}
						</Form.Item>
					}

					<Form.Item className="text-right">
						<Button type="primary" htmlType="submit">
							提交
						</Button>
					</Form.Item>
				</Form>
			)}
			{!form && content}
		</Modal>
	</>
	) : null

}

export default App
