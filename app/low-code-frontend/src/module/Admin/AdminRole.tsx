import BaseContentLayout, {
	CfgProps,
} from '@/layout/BaseContentLayout'

import { handlers } from '@/shared'

export default function AdminRole() {
	async function getData() {
		return await handlers.getAllRole()
	}

	const config: CfgProps = {
		toolCfg: {
			button: [
				{
					children: '添加角色',
					onClick: () => {
						console.log('onClick')
					},
				},
			],
		},
		searchCfg: {
			placeholder: '请输入要查询的角色',
			primaryKey: 'name',
		},
		dataCfg: {
			primaryKey: 'id',
			columns: [
				{
					title: '角色ID',
					dataIndex: 'id',
					key: 'id',
					align: 'center',
				},
				{
					title: '角色名称',
					dataIndex: 'name',
					key: 'name',
					align: 'center',
				},
			],
		},
		actionCfg: {
			formCfg: {
				title: '修改角色信息',
				form: true,
				formItem: [
					{
						type: 'input',
						props: {
							label: '角色名称',
							name: 'name',
							rules: [
								{
									required: true,
									message: '请输入角色名称',
								},
							],
						},
					},
				],
				footer: null,
				onOk: async value => {
					await handlers.updateRole(value)
				},
			},
			deleteButtonCfg: {
				onConfirm: async primaryKey => {
					await handlers.deleteRole(primaryKey)
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
