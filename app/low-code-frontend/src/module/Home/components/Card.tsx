import { Card, CardProps } from 'antd'
import { FunctionComponent } from 'react'

const CardComponent: FunctionComponent<
	CardProps & {
		cardContent: any
	}
> = props => {
	const {
		title = '卡片标题',
		cardContent,
		children,
		bordered,
		...rest
	} = props
	return (
		<Card title={title} bordered={bordered} {...rest}>
			{children || cardContent}
		</Card>
	)
}

export default CardComponent
