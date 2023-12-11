import { Button, Space } from 'antd'
import DataTable, {
	TableEnhanceProps,
} from '@/components/common/DataTable'

import { BaseButtonProps } from 'antd/es/button/button'
import Flex from '@/components/common/Flex'
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
						config.toolCfg.button.map(i => (
							<Button onClick={i.onClick} {...i.restProps}>
								{i.children}
							</Button>
						))}
				</Space>
			</Flex>

			<DataTable
				loading={
					config?.dataCfg && !config.dataCfg.dataSource
				}
				primaryKey={
					(config?.dataCfg && config.dataCfg.primaryKey) ||
					'id'
				}
				columns={
					(config?.dataCfg && config.dataCfg.columns) || []
				}
				dataSource={
					(config?.dataCfg && config.dataCfg.dataSource) ||
					[]
				}
			/>
		</>
	)
}
