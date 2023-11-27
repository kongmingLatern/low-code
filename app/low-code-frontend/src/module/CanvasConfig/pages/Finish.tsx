import { Button, Space, Tag } from 'antd'

import { ColumnsType } from 'antd/es/table'
import DataTable from '@/components/common/DataTable'
import DeleteButton from '@/components/common/DeleteButton'
import ModalButton from '@/components/common/ModalButton'
import { formatYMD } from '@/shared'
import { useNavigate } from 'react-router-dom'

interface DataType {
	key: string
	canvas_id: string
	canvas_name: string
	num: number
	create_time: string
	tags: string[]
}

export default function Finish() {
	const navigate = useNavigate()
	const columns: ColumnsType<DataType> = [
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
		},
		{
			title: '协作人数',
			dataIndex: 'num',
			key: 'num',
			align: 'center',
		},
		{
			title: '画布状态',
			key: 'tags',
			dataIndex: 'tags',
			align: 'center',
			render: (_, { tags }) => (
				<>
					{tags.map(tag => {
						const color =
							tag === '完成'
								? 'geekblue'
								: tag === '进行中'
								? 'green'
								: 'red'
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						)
					})}
				</>
			),
		},
		{
			title: '操作',
			key: 'action',
			align: 'center',
			render: (_, record: DataType) => (
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

	const data: DataType[] = [
		{
			key: '1',
			canvas_id: '1',
			canvas_name: 'John Brown',
			num: 1,
			create_time: formatYMD(new Date()),
			tags: ['已完成'],
		},
		{
			key: '2',
			canvas_id: '2',
			canvas_name: 'Jim Green',
			num: 2,
			create_time: formatYMD(new Date()),
			tags: ['进行中'],
		},
		{
			key: '3',
			canvas_id: '3',
			canvas_name: 'Joe Black',
			num: 23,
			create_time: formatYMD(new Date()),
			tags: ['未开始'],
		},
	]

	return <DataTable columns={columns} dataSource={data} />
}
