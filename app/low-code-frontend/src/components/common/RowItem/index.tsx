import { Col, Row } from 'antd'

import EmptyData from '../EmptyData'
import { FunctionComponent } from 'react'
import { Gutter } from 'antd/es/grid/row'

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
	gutter: Gutter | [Gutter, Gutter]
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

	return list!.length > 0 ? (
		<Row gutter={gutter} justify={justify} align={align}>
			{list?.map((i, index) => {
				return (
					<Col key={i + index} span={24 / count}>
						{i}
					</Col>
				)
			})}
		</Row>
	) : (
		<EmptyData />
	)
}

export default RowItem
