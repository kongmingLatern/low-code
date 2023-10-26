import React from 'react'
import { Table, TableProps } from 'antd'

const App: React.FC<TableProps<any>> = props => {
	const { columns, dataSource, ...rest } = props
	return (
		<Table
			columns={columns}
			dataSource={dataSource}
			{...rest}
		/>
	)
}

export default App
