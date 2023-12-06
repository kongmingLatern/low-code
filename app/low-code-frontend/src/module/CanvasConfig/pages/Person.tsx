import { InfoType, formatYMD, handlers } from '@/shared'
import { Space, Tag } from 'antd'
import { useContext, useEffect, useState } from 'react'

import { ColumnsType } from 'antd/es/table'
import DataTable from '@/components/common/DataTable'
import DeleteButton from '@/components/common/DeleteButton'
import { InfoContext } from '@/layout/CanvasHomeLayout'
import ModalButton from '@/components/common/ModalButton'
import { useSearchParams } from 'react-router-dom'

export default function Person() {
	const context = useContext(InfoContext)
	const info = context.info.refMap
	const { getData } = context
	const [list, setList] = useState(info)
	const [searchParams] = useSearchParams()

	useEffect(() => {
		setList(info)
	}, [info])

	const columns: ColumnsType<
		InfoType['refMap']['users'][number]
	> = [
		{
			title: '协作人员',
			dataIndex: 'username',
			key: 'username',
			align: 'center',
		},
		{
			title: '分配画布',
			dataIndex: 'canvasList',
			key: 'canvasList',
			align: 'center',
			render: (_, { role_id, canvasList }) => {
				return canvasList.length > 0 ? (
					role_id === 1 ? (
						<Tag color="blue-inverse">管理员无需分配</Tag>
					) : (
						canvasList.map(i => {
							return (
								<Tag key={i} color={'pink'}>
									{i}
								</Tag>
							)
						})
					)
				) : role_id === 1 ? (
					<Tag color="blue-inverse">管理员无需分配</Tag>
				) : (
					<Tag color="#ff0000">暂无分配</Tag>
				)
			},
		},
		{
			title: '权限角色',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
		},
		{
			title: '加入日期',
			dataIndex: 'create_time',
			key: 'create_time',
			align: 'center',
			render: (_, { create_time }) =>
				formatYMD(new Date(create_time)),
		},
		{
			title: '操作',
			key: 'action',
			align: 'center',
			render: (_, { role_id, uid }) => (
				<Space size="middle">
					<ModalButton
						title="修改"
						form
						formItem={[
							{
								type: 'input',
								props: {
									label: '用户名',
									name: 'username',
									rules: [
										{
											required: true,
											message:
												'Please input your username!',
										},
									],
								},
							},
							{
								type: 'input',
								props: {
									label: '密码',
									name: 'password',
									rules: [
										{
											required: true,
											message: '请输入密码',
										},
									],
								},
							},
						]}
						onOk={e => {
							console.log('ok', e)
						}}
						onCancel={e => {
							console.log('cancel', e)
						}}
						footer={null}
					>
						修改信息
					</ModalButton>
					{/* NOTE: 排除 项目管理员 删除自己,以及把删除权限控制给管理员 */}
					{role_id === 1 ||
						(uid !== localStorage.getItem('uid') && (
							<DeleteButton
								onConfirm={async () => {
									await handlers.deleteUserByUid({
										uid,
										project_id:
											searchParams.get('project_id'),
									})
									await getData()
								}}
							/>
						))}
				</Space>
			),
		},
	]

	return (
		list?.users && (
			<DataTable
				primaryKey="uid"
				columns={columns}
				dataSource={list.users}
			/>
		)
	)
}
