import BaseContentLayout, {
	CfgProps,
} from '@/layout/BaseContentLayout'

import StatusTag from '@/components/common/StatusTag'
import { handlers } from '@/shared'

export default function AdminCanvas() {
	async function getData() {
		return await handlers.getAllCanvas()
	}

	const config: CfgProps = {
		searchCfg: {
			placeholder: '请输入要查询的画布',
			onSearch: value => {
				console.log('----onSearch', value)
			},
		},
		dataCfg: {
			primaryKey: 'canvas_id',
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
		},
		actionCfg: {
			formCfg: {
				title: '修改画布信息',
				form: true,
				formItem: [
					{
						type: 'input',
						props: {
							label: '画布名称',
							name: 'canvas_name',
							rules: [
								{
									required: true,
									message: '请输入画布名称',
								},
							],
						},
					},
					{
						type: 'input',
						props: {
							label: '画布描述',
							name: 'canvas_description',
							rules: [
								{
									required: true,
									message: '请输入对画布的描述信息',
								},
							],
						},
					},
					{
						type: 'select',
						props: {
							label: '画布状态',
							name: 'canvas_status',
							rules: [
								{
									required: true,
									message: '请选择画布状态',
								},
							],
						},
						inject: {
							options: [
								{
									value: '未开始',
									label: '未开始',
								},
								{
									value: '进行中',
									label: '进行中',
								},
								{
									value: '已完成',
									label: '已完成',
								},
							],
						},
					},
				],
				footer: null,
				onOk: async value => {
					await handlers.updateCanvas(value)
				},
			},
			deleteButtonCfg: {
				onConfirm: async canvas_id => {
					await handlers.deleteCanvas(canvas_id)
				},
			},
		},
	}

	return (
		<BaseContentLayout
			config={config}
			getData={getData}
		></BaseContentLayout>
	)
}
