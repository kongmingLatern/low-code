import { Card, CardProps } from 'antd'
import { FunctionComponent } from 'react'

const CardComponent: FunctionComponent<
	CardProps & {
		cardContent: any
	}
> = props => {
	const { cardContent, children, ...rest } = props
	return <Card {...rest}>{children || cardContent}</Card>
}

export default CardComponent
