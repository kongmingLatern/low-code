import DataTable from '@/components/common/DataTable'
import { formatYMD } from '@/shared'
import { Tag, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
interface DataType {
	key: string
	name: string
	age: number
	address: string
	date: string
	tags: string[]
}

export function Finish() {
	const columns: ColumnsType<DataType> = [
		{
			title: '协作人员',
			dataIndex: 'name',
			key: 'name',
			render: text => <a>{text}</a>,
		},
		{
			title: '分配画布',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: '权限',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: '加入日期',
			dataIndex: 'date',
			key: 'date',
		},
		{
			title: '画布状态',
			key: 'tags',
			dataIndex: 'tags',
			render: (_, { tags }) => (
				<>
					{tags.map(tag => {
						let color =
							tag.length > 5 ? 'geekblue' : 'green'
						if (tag === 'loser') {
							color = 'volcano'
						}
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
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<a>Invite {record.name}</a>
					<a>Delete</a>
				</Space>
			),
		},
	]

	const data: DataType[] = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
			date: formatYMD(new Date()),
			tags: ['nice', 'developer'],
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			date: formatYMD(new Date()),
			tags: ['loser'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			date: formatYMD(new Date()),
			tags: ['cool', 'teacher'],
		},
	]
	return <DataTable columns={columns} dataSource={data} />
}
