import DataTable from '@/components/common/DataTable'
import ModalButton from '@/components/common/ModalButton'
import { formatYMD } from '@/shared'
import { Button, Form, Input, Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
interface DataType {
	key: string
	canvas_name: string
	num: number
	create_time: string
	tags: string[]
}

// const FormItem = (
// 	<Form
// 		name="basic"
// 		labelCol={{ span: 6 }}
// 		wrapperCol={{ span: 16 }}
// 		style={{ maxWidth: 600 }}
// 		initialValues={{ remember: true }}
// 		onFinish={onFinish}
// 		onFinishFailed={onFinishFailed}
// 		autoComplete="off"
// 	>
// 		<Form.Item<FieldType>
// 			label="Username"
// 			name="username"
// 			rules={[
// 				{
// 					required: true,
// 					message: 'Please input your username!',
// 				},
// 			]}
// 		>
// 			<Input />
// 		</Form.Item>

// 		<Form.Item<FieldType>
// 			label="Password"
// 			name="password"
// 			rules={[
// 				{
// 					required: true,
// 					message: 'Please input your password!',
// 				},
// 			]}
// 		>
// 			<Input.Password />
// 		</Form.Item>

// 		<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
// 			<Button type="primary" htmlType="submit">
// 				提交
// 			</Button>
// 		</Form.Item>
// 	</Form>
// )

export default function Finish() {
	const navigate = useNavigate()
	const columns: ColumnsType<DataType> = [
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
			render: () => (
				<Space size="middle">
					<Button
						type="link"
						onClick={() => navigate('/canvas')}
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
					<Button danger>删除</Button>
				</Space>
			),
		},
	]

	const data: DataType[] = [
		{
			key: '1',
			canvas_name: 'John Brown',
			num: 1,
			create_time: formatYMD(new Date()),
			tags: ['已完成'],
		},
		{
			key: '2',
			canvas_name: 'Jim Green',
			num: 2,
			create_time: formatYMD(new Date()),
			tags: ['进行中'],
		},
		{
			key: '3',
			canvas_name: 'Joe Black',
			num: 23,
			create_time: formatYMD(new Date()),
			tags: ['未开始'],
		},
	]

	return <DataTable columns={columns} dataSource={data} />
}
