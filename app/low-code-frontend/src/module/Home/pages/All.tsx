import { FunctionComponent } from 'react'
import Card from '../components/Card'
import RowItem from '@/components/common/RowItem'
import { Input, Typography } from 'antd'
import { SearchProps } from 'antd/es/input'
import Flex from '@/components/common/Flex'
import Box from '@/module/Index/components/Box'
import { useNavigate } from 'react-router-dom'

const { Search } = Input

interface AllProps {}
const { Title, Text } = Typography

const All: FunctionComponent<AllProps> = () => {
	const navigate = useNavigate()
	const card = (
		<Card
			hoverable
			cover={
				<img
					alt="example"
					src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
				/>
			}
			cardContent={
				<>
					<Title level={4}>Card Title</Title>
					<Flex
						className="text-14px font-semibold"
						justify="end"
					>
						<Box
							showIcon={false}
							content={'2023-10-23'}
							fontSize={12}
						/>
					</Flex>
					<Text>text</Text>
				</>
			}
			onClick={() => {
				navigate('/canvasConfig')
			}}
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
