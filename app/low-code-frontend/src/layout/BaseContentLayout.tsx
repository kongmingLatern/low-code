import { Button, ModalProps, Space } from 'antd'
import DataTable, {
	TableEnhanceProps,
} from '@/components/common/DataTable'
import DeleteButton, {
	DeleteButtonProps,
} from '@/components/common/DeleteButton'
import ModalButton, {
	ModalButtonType,
} from '@/components/common/ModalButton'
import { useCallback, useEffect, useState } from 'react'

import { BaseButtonProps } from 'antd/es/button/button'
import Flex from '@/components/common/Flex'
import { ReturnType } from '@/api'
import Search from 'antd/es/input/Search'
import { filterByKey } from '@/shared'

export interface CfgProps {
	toolCfg?: {
		button?: [
			{
				type?: 'modalButton' | 'button'
				children?: string
				formItem?: Array<Record<string, any>>
				initialValues?: Record<string, any>,
				onClick?: () => void
				restProps?: BaseButtonProps | ModalProps
			}
		]
	}
	searchCfg?: {
		className?: string
		// NOTE: 这个字段用于表明你想要查询的字段
		primaryKey?: string
		placeholder?: string
		onSearch?: (value: string) => void
		restProps?: Record<string, any>
	}
	dataCfg?: TableEnhanceProps
	actionCfg?: {
		formCfg?: {
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
	getData: () => Promise<ReturnType<any>> | any
}

export default function BaseContentLayout(
	props: ContentLayoutProps
) {
	const { config, getData } = props

	const [operationColumn] = useState(config!.dataCfg?.operationColumns ?? [
		{
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			fixed: 'right',
			width: 200,
			render: (_, record) => (
				<Space>
					{
						config!.actionCfg?.formCfg &&
						(
							<ModalButton
								showJson
								initialValues={Object.assign(config!.actionCfg?.formCfg?.initialValues || {}, record)}
								{...config!.actionCfg?.formCfg}
								onOk={async value => {
									await config!.actionCfg?.formCfg!.onOk({
										...value,
										[config!.dataCfg
											?.primaryKey as string]:
											record[
											config!.dataCfg!.primaryKey!
											],
									})
									await getDataSource()
								}}
							>
								修改
							</ModalButton>
						)
					}
					<DeleteButton
						{...config!.actionCfg?.deleteButtonCfg}
						onConfirm={async () => {
							await config!.actionCfg
								?.deleteButtonCfg?.onConfirm!(
									record[config!.dataCfg!.primaryKey!]
								)
							await getDataSource()
						}}
					>
						删除
					</DeleteButton>
				</Space>
			)
		}
	])

	const [dataSource, setDataSource] = useState<any[]>([])

	const getDataSource = useCallback(async () => {
		const res = await getData()
		setDataSource(res.data)
	}, [getData])

	useEffect(() => {
		getDataSource()
	}, [getDataSource])

	const onSearch = value => {
		if (value === '') {
			getDataSource()
			return
		}
		if (config?.searchCfg?.primaryKey) {
			setDataSource(() => {
				return filterByKey(
					dataSource,
					config.searchCfg!.primaryKey!,
					value.trim()
				)
			})
		}
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
						config.toolCfg.button.map((i, index) => {
							return i.type === 'modalButton' ? (
								<ModalButton
									key={i.children! + index}
									form
									formItem={i.formItem}
									initialValues={i.initialValues}
									{...(i.restProps as (ModalButtonType &
										ModalProps)[])}
									onOk={async value => {
										if (i) {
											i.restProps &&
												(await (i.restProps as any).onOk(
													value
												))
											await getDataSource()
										}
									}}
								>
									{i.children}
								</ModalButton>
							) : (
								<Button
									key={i.children! + index}
									onClick={i.onClick}
									{...(i.restProps as BaseButtonProps[])}
								>
									{i.children}
								</Button>
							)
						})}
				</Space>
			</Flex>

			<DataTable
				{...config?.dataCfg}
				primaryKey={
					(config?.dataCfg && config.dataCfg.primaryKey) ||
					'id'
				}
				columns={
					(config?.dataCfg && [
						...config.dataCfg.columns!,
						...operationColumn
					]) ||
					[]
				}
				dataSource={dataSource}
			/>
		</>
	)
}
