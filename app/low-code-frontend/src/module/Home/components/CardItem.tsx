import { Flex, Tag, Typography } from 'antd'

import Box from '@/module/Index/components/Box'
import Card from './Card'
import Cover from '@/assets/cover.jpeg'
import StatusTag from '@/components/common/StatusTag'
import { formatYMDHHmmss } from '@/shared'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

export const CardItem = props => {
	const { c } = props
	const navigate = useNavigate()
	const status = c.createBy === localStorage.getItem('uid')
	return (
		<Card
			hoverable
			cover={
				<div className="relative overflow-hidden">
					<img
						alt="example"
						src={Cover}
						width={'100%'}
						height={'20%'}
					/>
					<Tag
						className="absolute right-0 top-0 z-10"
						color={status ? 'blue' : 'purple'}
						style={{
							marginInlineEnd: 0,
						}}
					>
						{status ? '创建者' : '参与者'}
					</Tag>
				</div>
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
}
