import { FunctionComponent } from 'react'
import Card from '../components/Card'
import RowItem from '@/components/common/RowItem'

interface AllProps {}

const All: FunctionComponent<AllProps> = () => {
	return (
		<RowItem gutter={16} count={4}>
			<Card cardContent={<div>123</div>} />
		</RowItem>
	)
}

export default All
