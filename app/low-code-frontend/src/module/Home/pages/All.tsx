import { FunctionComponent } from 'react'
import Card from '../components/Card'
import RowItem from '@/components/common/RowItem'
import { Input } from 'antd'
import { SearchProps } from 'antd/es/input'
import Flex from '@/components/Flex'

const { Search } = Input

interface AllProps {}

const All: FunctionComponent<AllProps> = () => {
	const onSearch: SearchProps['onSearch'] = (
		value,
		_e,
		info
	) => console.log(info?.source, value)
	return (
		<>
			<Flex justify="end">
				<Search
					className="w-250px"
					placeholder="input search text"
					onSearch={onSearch}
					enterButton
				/>
			</Flex>
			<RowItem gutter={16} count={4}>
				<Card cardContent={<div>123</div>} />
			</RowItem>
		</>
	)
}

export default All
