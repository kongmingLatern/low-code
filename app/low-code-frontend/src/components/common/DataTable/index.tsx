import { Table, TableProps } from 'antd'

import { ColumnType } from 'antd/es/table'
import React from 'react'

export interface TableEnhanceProps extends TableProps<any> {
	primaryKey?: string
	showIndex?: boolean
}

const App: React.FC<TableEnhanceProps> = props => {
	const {
		primaryKey = '',
		columns,
		dataSource,
		showIndex = true,
		...rest
	} = props

	if (showIndex) {
		const index: ColumnType<any> = {
			title: '序号',
			dataIndex: 'index',
			key: 'index',
			align: 'center',
			render: (_, __, i) => <span>{i + 1}</span>,
			width: 60,
			ellipsis: true
		}

		if (columns?.every(i => i.key !== index.key)) {
			columns?.unshift(index)
		}
	}



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
			scroll={{ x: 1300 }}
			{...rest}
		/>
	)
}

export default App
