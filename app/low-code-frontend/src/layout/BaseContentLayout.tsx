import { Button, Space } from 'antd'
import DataTable, {
	TableEnhanceProps,
} from '@/components/common/DataTable'
import DeleteButton, { DeleteButtonProps } from '@/components/common/DeleteButton'

import { BaseButtonProps } from 'antd/es/button/button'
import Flex from '@/components/common/Flex'
import ModalButton from '@/components/common/ModalButton'
import Search from 'antd/es/input/Search'

export interface CfgProps {
	toolCfg?: {
		button?: [
			{
				children?: string
				onClick?: () => void
				restProps?: BaseButtonProps
			}
		]
	}
	searchCfg?: {
		className?: string
		placeholder?: string
		onSearch?: (value: string) => void
		restProps?: Record<string, any>
	}
	dataCfg?: TableEnhanceProps

	actionCfg?: {
		formCfg: {
			title: string
			form: boolean
			formItem?: Array<Record<string, any>>
			initialValues?: Record<string, any>
			onOk: (value) => void
			onCancel?: (value) => void
			footer?: boolean | null
		}
		deleteButtonCfg?: Partial<DeleteButtonProps>
	}
}

export interface ContentLayoutProps {
	config?: CfgProps
}

export default function BaseContentLayout(
	props: ContentLayoutProps
) {
	const { config } = props

	const onSearch = value => {
		console.log('onSearch', value)
	}

	const columns = config?.dataCfg?.columns
	console.log('columns', columns)

	return (
		<>
			<Flex justify="end" align="center">
				<Space>
					<Search
						className="w-250px"
						placeholder={
							config?.searchCfg &&
							config.searchCfg.placeholder
						}
						onSearch={
							(config?.searchCfg &&
								config.searchCfg.onSearch) ||
							onSearch
						}
						enterButton
					/>
					{config?.toolCfg?.button &&
						config.toolCfg.button.map((i, index) => (
							<Button key={i.children! + index} onClick={i.onClick} {...i.restProps}>
								{i.children}
							</Button>
						))}
				</Space>
			</Flex>

			<DataTable
				primaryKey={
					(config?.dataCfg && config.dataCfg.primaryKey) ||
					'id'
				}
				columns={
					(config?.dataCfg && [
						...config.dataCfg.columns!,
						{
							title: '操作',
							dataIndex: 'action',
							key: 'action',
							align: 'center',
							render: (_, record) => (
								<Space>
									<ModalButton
										initialValues={record}
										{...config.actionCfg?.formCfg}
									>修改</ModalButton>
									<DeleteButton
										{...config.actionCfg?.deleteButtonCfg}
										onConfirm={() => config.actionCfg?.deleteButtonCfg?.onConfirm!(record[config!.dataCfg!.primaryKey!])}
									>删除</DeleteButton>
								</Space>
							),
						},
					]) ||
					[]
				}
				dataSource={
					(config?.dataCfg && config.dataCfg.dataSource) ||
					[]
				}
			/>
		</>
	)
}
