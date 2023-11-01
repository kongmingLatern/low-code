import React, { useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { BaseButtonProps } from 'antd/es/button/button'

interface ModalButtonType {
	type?: BaseButtonProps['type']
	text?: string
	title?: string
	form?: boolean
	formItem?: Array<Record<string, any>>
	content?: React.ReactNode
	children?: React.ReactNode
	onOk?: (...args) => void
	onCancel?: (...args) => void
}

const App: React.FC<ModalButtonType> = props => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const {
		type = 'primary',
		text,
		content,
		children,
		title,
		form = false,
		formItem,
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

	const handleTypeInput = (type = 'input') => {
		switch (type) {
			case 'input':
				return <Input />
			default:
				return <Input />
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
				{form && (
					<Form
						className="mt-1.5rem"
						name="basic"
						onFinish={handleOk}
						onFinishFailed={handleCancel}
						autoComplete="off"
					>
						{formItem &&
							formItem.map(i => (
								<Form.Item {...i.props} key={i}>
									{handleTypeInput(i.type)}
								</Form.Item>
							))}

						<Form.Item className="text-right">
							<Button type="primary" htmlType="submit">
								提交
							</Button>
						</Form.Item>
					</Form>
				)}
				{content}
			</Modal>
		</>
	)
}

export default App
