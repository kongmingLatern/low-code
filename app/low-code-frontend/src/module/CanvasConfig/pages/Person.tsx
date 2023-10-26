import DataTable from '@/components/common/DataTable'
import { formatYMD } from '@/shared'
import { Button, Space } from 'antd'
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
			align: 'center',
		},
		{
			title: '分配画布',
			dataIndex: 'age',
			key: 'age',
			align: 'center',
		},
		{
			title: '权限',
			dataIndex: 'auth',
			key: 'auth',
			align: 'center',
		},
		{
			title: '加入日期',
			dataIndex: 'date',
			key: 'date',
			align: 'center',
		},
		{
			title: '操作',
			key: 'action',
			align: 'center',
			render: () => (
				<Space size="middle">
					<Button type="primary">修改</Button>
					<Button danger>删除</Button>
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
