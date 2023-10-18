import { FunctionComponent } from 'react'
import Card from '../components/Card'
import RowItem from '@/components/common/RowItem'
import { Input } from 'antd'
import { SearchProps } from 'antd/es/input'
import Flex from '@/components/common/Flex'

const { Search } = Input

interface AllProps {}

const All: FunctionComponent<AllProps> = () => {
	const card = (
		<Card
			hoverable
			title="拉123拉"
			cover={
				<img
					alt="example"
					src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
				/>
			}
			cardContent={<div>123</div>}
		/>
	)

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
					placeholder="请输入要查询的项目名称"
					onSearch={onSearch}
					enterButton
				/>
			</Flex>
			<RowItem
				gutter={[24, 16]}
				list={new Array(14).fill(card)}
				justify="center"
			></RowItem>
		</>
	)
}

export default All
