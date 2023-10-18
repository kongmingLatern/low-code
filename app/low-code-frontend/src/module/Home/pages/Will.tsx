import { FunctionComponent } from 'react'
import Card from '../components/Card'
import RowItem from '@/components/common/RowItem'
import { Input } from 'antd'
import { SearchProps } from 'antd/es/input'
import Flex from '@/components/common/Flex'

const { Search } = Input

interface WillProps {}

const Will: FunctionComponent<WillProps> = () => {
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
			<RowItem gutter={16} count={3}>
				<Card
					cardContent={<div>Project Name</div>}
					cover={
						<img
							alt="example"
							src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
						/>
					}
				/>
			</RowItem>
		</>
	)
}

export default Will
