import React from 'react'
import { Typography, Badge, Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'

const { Paragraph } = Typography

const items: DescriptionsProps['items'] = [
	{
		key: '1',
		label: '项目名称',
		children: 'XXX 管理系统',
	},
	{
		key: 'person',
		label: '项目管理员',
		children: 'ckh',
		span: 3,
	},
	{
		key: '2',
		label: '项目邀请码',
		children: <Paragraph copyable>513123</Paragraph>,
		span: 3,
	},
	{
		key: '7',
		label: '项目人员数',
		children: 13,
	},
	{
		key: '8',
		label: '画布数量',
		children: 13,
		span: 3,
	},
	{
		key: '4',
		label: '创建时间',
		children: '2023-10-24 18:00:00',
		span: 3,
	},
	{
		key: 'update_time',
		label: '最新更新时间',
		children: '2023-10-25 18:30:00',
		span: 3,
	},
	{
		key: '6',
		label: '项目状态',
		children: <Badge status="processing" text="进行中" />,
		span: 3,
	},
]

const App: React.FC = () => (
	<Descriptions
		className="p-1.5rem"
		title="项目信息"
		bordered
		items={items}
	/>
)

export default App
