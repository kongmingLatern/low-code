import DataTable from '@/components/common/DataTable'
import { formatYMD } from '@/shared'
import { Tag, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
interface DataType {
	key: string
	name: string
	age: number
	auth: string
	date: string
	tags: string[]
}

export default function Person() {
	const columns: ColumnsType<DataType> = [
		{
			title: '协作人员',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '分配画布',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: '权限',
			dataIndex: 'auth',
			key: 'auth',
		},
		{
			title: '加入日期',
			dataIndex: 'date',
			key: 'date',
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
			auth: '项目管理员',
			date: formatYMD(new Date()),
			tags: ['在线'],
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			auth: '画布管理员',
			date: formatYMD(new Date()),
			tags: ['离线'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			auth: '协作人员',
			date: formatYMD(new Date()),
			tags: ['cool', 'teacher'],
		},
	]
	return <DataTable columns={columns} dataSource={data} />
}
