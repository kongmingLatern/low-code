import BaseContentLayout, {
	CfgProps,
} from '@/layout/BaseContentLayout'
import {
	UserReturnType,
	formatYMDHHmmss,
	handlers,
} from '@/shared'
import { useEffect, useState } from 'react'

import StatusTag from '@/components/common/StatusTag'

export default function Project() {
	const [data, setData] = useState<UserReturnType[]>([])

	const config: CfgProps = {
		searchCfg: {
			placeholder: '请输入要查询的项目名',
			onSearch: value => {
				console.log('----onSearch', value)
			},
		},
		dataCfg: {
			primaryKey: 'project_id',
			columns: [
				{
					title: '项目ID',
					dataIndex: 'project_id',
					key: 'project_id',
					align: 'center',
				},
				{
					title: '项目名称',
					dataIndex: 'project_name',
					key: 'project_name',
					align: 'center',
				},
				{
					title: '项目描述',
					dataIndex: 'project_description',
					key: 'project_description',
					align: 'center',
				},
				{
					title: '项目邀请码',
					dataIndex: 'project_code',
					key: 'project_code',
					align: 'center',
				},
				{
					title: '项目状态',
					dataIndex: 'project_status',
					key: 'project_status',
					align: 'center',
					render: (_, { project_status }) => (
						<StatusTag status={project_status}>
							{project_status}
						</StatusTag>
					),
				},
				{
					title: '创建时间',
					dataIndex: 'create_time',
					key: 'create_time',
					align: 'center',
					render: (_, { create_time }) =>
						formatYMDHHmmss(new Date(create_time)),
				},
				{
					title: '更新时间',
					dataIndex: 'update_time',
					key: 'update_time',
					align: 'center',
					render: (_, { update_time }) =>
						formatYMDHHmmss(new Date(update_time)),
				},
			],
			dataSource: data,
		},
	}

	useEffect(() => {
		async function getData() {
			const res = await handlers.getAllProject()
			setData(res.data as any)
		}
		getData()
	}, [])

	return (
		<BaseContentLayout config={config}></BaseContentLayout>
	)
}
