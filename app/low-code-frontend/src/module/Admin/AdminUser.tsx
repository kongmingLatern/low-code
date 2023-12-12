import BaseContentLayout, {
	CfgProps,
} from '@/layout/BaseContentLayout'

import { handlers } from '@/shared'

export default function AdminUser() {
	async function getData() {
		return await handlers.getAllUser()
	}

	const config: CfgProps = {
		toolCfg: {
			button: [
				{
					children: '添加用户',
					onClick: () => {
						console.log('onClick')
					},
				},
			],
		},
		searchCfg: {
			placeholder: '请输入要查询的用户名',
			primaryKey: 'username',
		},
		dataCfg: {
			primaryKey: 'uid',
			columns: [
				{
					title: '用户ID',
					dataIndex: 'uid',
					key: 'uid',
					align: 'center',
				},
				{
					title: '用户名',
					dataIndex: 'username',
					key: 'username',
					align: 'center',
				},
				{
					title: '昵称',
					dataIndex: 'nickname',
					key: 'nickname',
					align: 'center',
				},
				{
					title: '密码',
					dataIndex: 'password',
					key: 'password',
					align: 'center',
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
							label: '用户名',
							name: 'username',
							rules: [
								{
									required: true,
									message: '请输入用户名',
								},
							],
						},
					},
					{
						type: 'input',
						props: {
							label: '昵称',
							name: 'nickname',
							rules: [
								{
									required: true,
									message: '请输入昵称',
								},
							],
						},
					},
				],
				footer: null,
				onOk: async value => {
					await handlers.updateUser(value)
				},
			},
			deleteButtonCfg: {
				onConfirm: async primaryKey => {
					await handlers.deleteUser(primaryKey)
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
