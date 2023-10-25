import React from 'react'
import { Table, TableProps } from 'antd'

const App: React.FC<
	TableProps<Record<string, any>>
> = props => {
	const { columns, dataSource } = props
	return <Table columns={columns} dataSource={dataSource} />
}

export default App
