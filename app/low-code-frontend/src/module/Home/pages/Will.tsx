import {
	FunctionComponent,
	useContext,
	useState,
} from 'react'
import { Input, Typography } from 'antd'

import Box from '@/components/Box'
import Card from '../components/Card'
import { CardContext } from '@/layout/BaseHomeLayout'
import { CardProps } from './All'
import Flex from '@/components/common/Flex'
import RowItem from '@/components/common/RowItem'
import { SearchProps } from 'antd/es/input'
import StatusTag from '@/components/common/StatusTag'
import { formatYMDHHmmss } from '@/shared'
import { searchProjectByName } from '../shared'
import { useNavigate } from 'react-router-dom'

const { Search } = Input
const { Title, Text } = Typography

interface WillProps {}

const Will: FunctionComponent<WillProps> = () => {
	const { cardList } = useContext(CardContext)
	const navigate = useNavigate()
	const [list, setList] = useState(
		cardList.filter(i => i.project_status === '进行中')
	)
	const CardList = list.map((c: CardProps) => {
		return (
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
						<Title
							level={4}
							className="items-center flex justify-between"
						>
							{c.project_name}
							<StatusTag status={c.project_status}>
								{c.project_status}
							</StatusTag>
						</Title>
						<Flex
							className="text-14px font-semibold"
							justify="end"
						>
							<Box
								showIcon={false}
								content={`更新时间:${formatYMDHHmmss(
									new Date(c.update_time)
								)}`}
								fontSize={12}
							/>
						</Flex>
						<Text>{c.project_description}</Text>
					</>
				}
				onClick={() => {
					navigate(
						`/canvasConfig/manage?project_id=${c.project_id}`
					)
				}}
			/>
		)
	})

	const onSearch: SearchProps['onSearch'] = value =>
		searchProjectByName(value, cardList, setList)
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
			<RowItem gutter={16} list={CardList}></RowItem>
		</>
	)
}

export default Will
