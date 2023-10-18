import { Row, Col } from 'antd'
import { Gutter } from 'antd/es/grid/row'
import { FunctionComponent } from 'react'

interface RowItemProps {
	gutter: Gutter
	count: number
	children: React.ReactNode
}

const RowItem: FunctionComponent<
	Partial<RowItemProps>
> = props => {
	const { gutter, count = 1, children } = props
	return (
		<Row gutter={gutter}>
			{new Array(count).fill(0).map((_, index) => (
				<Col key={index} span={24 / count}>
					{children}
				</Col>
			))}
		</Row>
	)
}

export default RowItem
