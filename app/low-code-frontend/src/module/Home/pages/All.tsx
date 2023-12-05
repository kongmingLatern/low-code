import { Button, Input, Space, Typography } from 'antd'
import { FunctionComponent, useContext } from 'react'

import Box from '@/module/Index/components/Box'
import Card from '../components/Card'
import { CardContext } from '@/layout/BaseHomeLayout'
import Flex from '@/components/common/Flex'
import RowItem from '@/components/common/RowItem'
import { SearchProps } from 'antd/es/input'
import StatusTag from '@/components/common/StatusTag'
import { formatYMDHHmmss } from '@/shared'
import { useNavigate } from 'react-router-dom'

const { Search } = Input

interface AllProps {}
const { Title, Text } = Typography

interface CardProps {
	project_name: string
	createBy: string
	create_time: Date
	project_code: string
	project_description: string
	project_id: string
	project_status: string
	refMap: Record<string, any>
	update_time: Date
}

const All: FunctionComponent<AllProps> = () => {
	const navigate = useNavigate()
	const context = useContext(CardContext)
	console.log('context', context)

	const CardList = context.map((c: CardProps) => {
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

	const onSearch: SearchProps['onSearch'] = (
		value,
		_e,
		info
	) => console.log(info?.source, value)
	return (
		<>
			<Flex justify="end">
				<Space>
					<Search
						className="w-250px"
						placeholder="请输入要查询的项目名称"
						onSearch={onSearch}
						enterButton
					/>
					<Button type="primary">新建项目</Button>
				</Space>
			</Flex>
			<RowItem
				gutter={[24, 16]}
				list={CardList}
				justify="center"
			></RowItem>
		</>
	)
}

export default All
