import { Row, Col } from 'antd'
import { Gutter } from 'antd/es/grid/row'
import { FunctionComponent } from 'react'

declare const RowAligns: readonly [
	'top',
	'middle',
	'bottom',
	'stretch'
]
declare const RowJustify: readonly [
	'start',
	'end',
	'center',
	'space-around',
	'space-between',
	'space-evenly'
]

interface RowItemProps {
	gutter: number | number[]
	count: number
	list: any[]
	children: React.ReactNode
	align?: (typeof RowAligns)[number]
	justify?: (typeof RowJustify)[number]
}

const RowItem: FunctionComponent<
	Partial<RowItemProps>
> = props => {
	const {
		gutter,
		list,
		count = list?.length || 4,
		justify = 'start',
		align = 'middle',
	} = props
	return (
		<Row gutter={gutter} justify={justify} align={align}>
			{list?.map(i => {
				return (
					<Col key={i.key} span={24 / count}>
						{i}
					</Col>
				)
			})}
		</Row>
	)
}

export default RowItem
