import DataTable from '@/components/common/DataTable'
import { formatYMD } from '@/shared'
import { Button, Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
interface DataType {
	key: string
	canvas_name: string
	num: number
	create_time: string
	tags: string[]
}

export function Finish() {
	const columns: ColumnsType<DataType> = [
		{
			title: '画布名称',
			dataIndex: 'canvas_name',
			key: 'canvas_name',
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
			key: 'create_time',
		},
		{
			title: '协作人数',
			dataIndex: 'num',
			key: 'num',
		},

		{
			title: '画布状态',
			key: 'tags',
			dataIndex: 'tags',
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
			render: () => (
				<Space size="middle">
					<Button type="link">进入画布</Button>
					<Button type="primary">修改</Button>
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
