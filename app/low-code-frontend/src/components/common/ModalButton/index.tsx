import {
	Button,
	Form,
	Input,
	Modal,
	ModalProps,
	Select,
} from 'antd'
import React, { useState } from 'react'

import { BaseButtonProps } from 'antd/es/button/button'

interface ModalButtonType {
	type?: BaseButtonProps['type']
	text?: string
	title?: string
	form?: boolean
	formItem?: Array<Record<string, any>>
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

	const {
		type = 'primary',
		text,
		content,
		children,
		title,
		form = false,
		formItem,
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
			case 'select':
				return <Select {...options} />
			default:
				return <Input {...options} />
		}
	}

	return (
		<>
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
						className="mt-1.5rem"
						name="basic"
						onFinish={handleOk}
						onFinishFailed={handleCancel}
						autoComplete="off"
						initialValues={initialValues}
					>
						{formItem.map((i, index) => (
							<Form.Item {...i.props} key={index}>
								{handleTypeInput(i.type, i?.inject)}
							</Form.Item>
						))}

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
	)
}

export default App
