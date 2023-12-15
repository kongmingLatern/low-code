import { ColumnType, ColumnsType } from 'antd/es/table'
import { Table, TableProps } from 'antd'

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



	const items: ColumnsType<any> = columns!.map(i => {
		const i1 = {
			...i,
			ellipsis: true
		}
		if (i.key === 'action') {
			return {
				width: 150,
				...i1,
				fixed: 'right'
			}
		}
		return i1
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
