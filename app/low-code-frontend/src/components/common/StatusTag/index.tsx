import { Tag } from 'antd'

interface StatusProps {
	// NOTE: 已完成 进行中 未开始
	status: string
	children: React.ReactNode
}

export default function StatusTag(props: StatusProps) {
	const { status, children } = props
	function getColor() {
		switch (status) {
			case '已完成':
				return 'green'
			case '进行中':
				return 'processing'
			case '未开始':
				return 'purple'
		}
	}
	const color = getColor()
	return <Tag color={color}>{children}</Tag>
}
