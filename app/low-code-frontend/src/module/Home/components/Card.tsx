import { Card, CardProps } from 'antd'
import { FunctionComponent } from 'react'

const CardComponent: FunctionComponent<
	CardProps
> = props => {
	const {
		title = '卡片标题',
		content,
		children,
		bordered,
	} = props
	return (
		<Card title={title} bordered={bordered}>
			{children || content}
		</Card>
	)
}

export default CardComponent
