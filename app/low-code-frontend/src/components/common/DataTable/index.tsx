import { Table, TableProps } from 'antd'

import React from 'react'

export interface TableEnhanceProps extends TableProps<any> {
	primaryKey?: string
}

const App: React.FC<TableEnhanceProps> = props => {
	const {
		primaryKey = '',
		columns,
		dataSource,
		...rest
	} = props

	const items = columns?.map(i => {
		return {
			...i,
			ellipsis: true
		}
	})

	return (
		<Table
			columns={items}
			dataSource={
				dataSource?.map(i => {
					return {
						...i,
						key: i[primaryKey],
					}
				})
			}
			{...rest}
		/>
	)
}

export default App
