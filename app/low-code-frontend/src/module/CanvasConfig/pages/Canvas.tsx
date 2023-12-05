import { Button, Input, Space, Tag } from 'antd'
import { InfoType, formatYMD } from '@/shared'
import { useContext, useEffect, useState } from 'react'

import { ColumnsType } from 'antd/es/table'
import DataTable from '@/components/common/DataTable'
import DeleteButton from '@/components/common/DeleteButton'
import Flex from '@/components/common/Flex'
import { InfoContext } from '@/layout/CanvasHomeLayout'
import ModalButton from '@/components/common/ModalButton'
import { SearchProps } from 'antd/es/input'
import { useNavigate } from 'react-router-dom'

export default function Canvas() {
	const navigate = useNavigate()
	const info = useContext(InfoContext).refMap
	const [list, setList] = useState(info)

	useEffect(() => {
		setList(info)
	}, [info])

	const { Search } = Input

	const onSearch: SearchProps['onSearch'] = (
		value,
		_e,
		info
	) => console.log(info?.source, value)

	const columns: ColumnsType<
		InfoType['refMap']['canvas'][number]
	> = [
		{
			title: '画布id',
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
			title: '创建时间',
			dataIndex: 'create_time',
			key: 'create_time',
			align: 'center',
			render: (_, { create_time }) =>
				formatYMD(new Date(create_time)),
		},
		{
			title: '画布状态',
			key: 'project_status',
			dataIndex: 'project_status',
			align: 'center',
			render: (_, { canvas_status }) => {
				const color =
					canvas_status === '已完成'
						? '#87d068'
						: canvas_status === '进行中'
						? '#108ee9'
						: 'purple'
				return (
					canvas_status && (
						<Tag color={color}>{canvas_status}</Tag>
					)
				)
			},
		},
		{
			title: '操作',
			key: 'action',
			align: 'center',
			render: (
				_,
				record: InfoType['refMap']['canvas'][number]
			) => (
				<Space size="middle">
					<Button
						type="link"
						onClick={() =>
							navigate('/canvas/' + record.canvas_id)
						}
					>
						进入画布
					</Button>
					<ModalButton
						title="画布修改"
						form
						formItem={[
							{
								type: 'input',
								props: {
									label: 'Username',
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
						修改
					</ModalButton>
					<DeleteButton />
				</Space>
			),
		},
	]

	return (
		<>
			<Flex
				justify="space-between"
				marginBottom="0"
				className="p-1rem"
			>
				<div className="font-semibold text-20px">
					工具栏
				</div>

				<Space>
					<Search
						className="w-250px"
						placeholder="请输入要查询的画布名称"
						onSearch={onSearch}
						enterButton
					/>
					<ModalButton
						title="画布创建"
						form
						formItem={[
							{
								type: 'input',
								props: {
									label: '画布名称',
									name: 'canvas_name',
								},
							},
							{
								type: 'input',
								props: {
									label: '画布描述',
									name: 'canvas_description',
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
						创建画布
					</ModalButton>
				</Space>
			</Flex>
			{list?.canvas && (
				<DataTable
					primaryKey="canvas_id"
					columns={columns}
					dataSource={list.canvas}
				/>
			)}
		</>
	)
}
