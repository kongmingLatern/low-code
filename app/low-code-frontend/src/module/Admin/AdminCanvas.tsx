import BaseContentLayout, {
	CfgProps,
} from '@/layout/BaseContentLayout'
import { UserReturnType, handlers } from '@/shared'
import { useEffect, useState } from 'react'

import StatusTag from '@/components/common/StatusTag'

export default function AdminCanvas() {
	const [data, setData] = useState<UserReturnType[]>([])

	const config: CfgProps = {
		searchCfg: {
			placeholder: '请输入要查询的画布',
			onSearch: value => {
				console.log('----onSearch', value)
			},
		},
		dataCfg: {
			primaryKey: 'uid',
			columns: [
				{
					title: '画布ID',
					dataIndex: 'canvas_id',
					key: 'canvas_id',
					align: 'center',
				},
				{
					title: '画布名称',
					dataIndex: 'canvas_name',
					key: 'canvas_name',
					align: 'center',
				},
				{
					title: '画布描述',
					dataIndex: 'canvas_description',
					key: 'canvas_description',
					align: 'center',
				},
				{
					title: '画布状态',
					dataIndex: 'canvas_status',
					key: 'canvas_status',
					align: 'center',
					render: (_, { canvas_status }) => (
						<StatusTag status={canvas_status}>
							{canvas_status}
						</StatusTag>
					),
				},
			],
			dataSource: data,
		},
	}

	useEffect(() => {
		async function getData() {
			const res = await handlers.getAllCanvas()
			setData(res.data as any)
		}
		getData()
	}, [])

	return (
		<BaseContentLayout config={config}></BaseContentLayout>
	)
}
