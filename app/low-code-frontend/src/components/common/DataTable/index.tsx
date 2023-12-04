import { Table, TableProps } from 'antd'

import React from 'react'

interface TableEnhanceProps extends TableProps<any> {
	primaryKey?: string
}

const App: React.FC<TableEnhanceProps> = props => {
	const {
		primaryKey = '',
		columns,
		dataSource,
		...rest
	} = props
	return (
		<Table
			columns={columns}
			dataSource={dataSource?.map(i => {
				return {
					...i,
					key: i[primaryKey],
				}
			})}
			{...rest}
		/>
	)
}

export default App
