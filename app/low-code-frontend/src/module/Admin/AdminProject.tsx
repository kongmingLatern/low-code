import BaseContentLayout, {
	CfgProps,
} from '@/layout/BaseContentLayout'
import { formatYMDHHmmss, handlers } from '@/shared'

import StatusTag from '@/components/common/StatusTag'

export default function AdminProject() {
	async function getData() {
		return await handlers.getAllProject()
	}

	const config: CfgProps = {
		searchCfg: {
			placeholder: '请输入要查询的项目名',
			primaryKey: 'project_name',
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
		},
		actionCfg: {
			formCfg: {
				title: '修改用户信息',
				form: true,
				formItem: [
					{
						type: 'input',
						props: {
							label: '项目名称',
							name: 'project_name',
							rules: [
								{
									required: true,
									message: '请输入项目名称',
								},
							],
						},
					},
					{
						type: 'input',
						props: {
							label: '项目描述',
							name: 'project_description',
							rules: [
								{
									required: true,
									message: '请输入项目描述',
								},
							],
						},
					},
					{
						type: 'input',
						props: {
							label: '项目邀请码',
							name: 'project_code',
							rules: [
								{
									required: true,
									message: '请输入项目邀请码',
								},
							],
						},
					},
					{
						type: 'select',
						props: {
							label: '项目状态',
							name: 'project_status',
							rules: [
								{
									required: true,
									message: '请选择项目状态',
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
					await handlers.updateProject(value)
				},
			},
			deleteButtonCfg: {
				onConfirm: async primaryKey => {
					await handlers.deleteProject(primaryKey)
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
