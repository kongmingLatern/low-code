import { Badge, Descriptions, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { formatYMDHHmmss, handlers } from '@/shared'

import type { DescriptionsProps } from 'antd'
import { useSearchParams } from 'react-router-dom'

const { Paragraph } = Typography

interface InfoType {
	canvas_num: number
	createBy: string
	createUserName: string
	create_time: Date
	project_code: string
	project_description: string
	project_id: string
	project_name: string
	project_status: string
	refMap: Record<string, any>
	update_time: Date
	user_num: number
}

const getStatusText = (status: string) => {
	switch (status) {
		case '已完成':
			return 'success'
		case '进行中':
			return 'processing'
		case '未开始':
			return 'warning'
		default:
			return 'default'
	}
}

const items: (
	info: InfoType
) => DescriptionsProps['items'] = (info: InfoType) => {
	if (info) {
		return [
			{
				key: '1',
				label: '项目名称',
				children: info.project_name,
			},
			{
				key: 'person',
				label: '项目管理员',
				children: info.createUserName,
				span: 3,
			},
			{
				key: '2',
				label: '项目邀请码',
				children: (
					<Paragraph copyable>
						{info.project_code}
					</Paragraph>
				),
				span: 3,
			},
			{
				key: '7',
				label: '项目人员数',
				children: info.user_num,
			},
			{
				key: '8',
				label: '画布数量',
				children: info.canvas_num,
				span: 3,
			},
			{
				key: '4',
				label: '创建时间',
				children: formatYMDHHmmss(
					new Date(info.create_time)
				),
				span: 3,
			},
			{
				key: 'update_time',
				label: '最新更新时间',
				children: formatYMDHHmmss(
					new Date(info.update_time)
				),
				span: 3,
			},
			{
				key: '6',
				label: '项目状态',
				children: (
					<Badge
						status={getStatusText(info.project_status)}
						text={info.project_status}
					/>
				),
				span: 3,
			},
		]
	}
}

const App: React.FC = () => {
	const [info, setInfo] = useState<Partial<InfoType>>()
	const [searchParams] = useSearchParams()

	useEffect(() => {
		async function getData() {
			const res = await handlers.getProjectById(
				searchParams.get('project_id')
			)
			setInfo(res.data)
		}
		getData()
	}, [searchParams])

	useEffect(() => {
		console.log(info)
	}, [info])

	return (
		<Descriptions
			className="p-1.5rem"
			title="项目信息"
			bordered
			items={items(info as InfoType)}
		/>
	)
}

export default App
