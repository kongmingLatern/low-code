import { Button, Popconfirm } from 'antd'

import { ROLE } from '@/shared'
import React from 'react'

export interface DeleteButtonProps {
	role?: ROLE
	title: string
	description: string
	children: any
	text: any
	okText: string
	cancelText: string
	onConfirm: (...args) => void
	onCancel: (...args) => void
}

const App: React.FC<Partial<DeleteButtonProps>> = props => {
	const {
		role = ROLE.PROJECT_MANAGER,
		title = '提示',
		description = '确定要删除吗',
		text = '删除',
		children,
		okText = '确认',
		cancelText = '取消',
		onConfirm,
		onCancel,
	} = props
	return role === ROLE.PROJECT_MANAGER ? (
		<Popconfirm
			title={title}
			description={description}
			okText={okText}
			cancelText={cancelText}
			onConfirm={onConfirm}
			onCancel={onCancel}
		>
			<Button danger>{children || text}</Button>
		</Popconfirm>
	) : null
}

export default App
