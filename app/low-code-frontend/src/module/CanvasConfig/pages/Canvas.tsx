import { Button, Input, Space } from 'antd'
import {
	InfoType,
	formatYMDHHmmss,
	handlers,
	isProjectManager,
} from '@/shared'
import { useContext, useEffect, useState } from 'react'
import {
	useNavigate,
	useSearchParams,
} from 'react-router-dom'

import { ColumnsType } from 'antd/es/table'
import DataTable from '@/components/common/DataTable'
import DeleteButton from '@/components/common/DeleteButton'
import Flex from '@/components/common/Flex'
import { InfoContext } from '@/layout/CanvasHomeLayout'
import ModalButton from '@/components/common/ModalButton'
import { SearchProps } from 'antd/es/input'
import StatusTag from '@/components/common/StatusTag'

export default function Canvas() {
	const navigate = useNavigate()
	const { info, getData, canvas } = useContext(InfoContext)
	const [list, setList] = useState(info.refMap)
	const [searchParams] = useSearchParams()

	useEffect(() => {
		setList(info.refMap)
	}, [info])

	const { Search } = Input

	const onSearch: SearchProps['onSearch'] = val => {
		const value = val.trim()
		if (value) {
			const canvasList = list.canvas.find(
				i => i.canvas_name === value
			)
			setList({
				...list,
				canvas: [canvasList!] ?? list.canvas,
			})
		} else {
			setList(info.refMap)
		}
	}

	const columns: ColumnsType<
		InfoType['refMap']['canvas'][number]
	> = [

			{
				title: '画布名称',
				dataIndex: 'canvas_name',
				key: 'canvas_name',
				align: 'center',
			},
			{
				title: '画布描述',
				dataIndex: 'canvas_description',
				key: 'canvas_description',
				align: 'center',
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				key: 'create_time',
				align: 'center',
				render: (_, { create_time }) =>
					formatYMDHHmmss(new Date(create_time)),
			},
			{
				title: '更新时间',
				dataIndex: 'update_time',
				key: 'update_time',
				align: 'center',
				render: (_, { update_time }) =>
					formatYMDHHmmss(new Date(update_time)),
			},
			{
				title: '画布状态',
				key: 'project_status',
				dataIndex: 'project_status',
				align: 'center',
				render: (_, { canvas_status }) => (
					<StatusTag status={canvas_status}>
						{canvas_status}
					</StatusTag>
				),
			},
			{
				title: '操作',
				key: 'action',
				align: 'center',
				render: (
					_,
					record: InfoType['refMap']['canvas'][number]
				) => (
					<Space size="middle">
						<Button
							type="link"
							onClick={() =>
								navigate('/canvas/' + record.canvas_id)
							}
						>
							进入画布
						</Button>
						<ModalButton
							role={canvas.role_id}
							title="画布修改"
							form
							initialValues={{
								canvas_name: record.canvas_name,
								canvas_description: record.canvas_description,
								canvas_status: record.canvas_status,
							}}
							formItem={[
								{
									type: 'input',
									props: {
										label: '画布名称',
										name: 'canvas_name',
										rules: [
											{
												required: true,
												message: '请输入画布名称',
											},
										],
									},
								},
								{
									type: 'input',
									props: {
										label: '画布描述',
										name: 'canvas_description',
										rules: [
											{
												required: true,
												message: '请输入对画布的描述信息',
											},
										],
									},
								},
								{
									type: 'select',
									props: {
										label: '画布状态',
										name: 'canvas_status',
										rules: [
											{
												required: true,
												message: '请选择画布状态',
											},
										],
									},
									inject: {
										options: [
											{
												value: '未开始',
												label: '未开始',
											},
											{
												value: '进行中',
												label: '进行中',
											},
											{
												value: '已完成',
												label: '已完成',
											},
										],
									},
								},
							]}
							onOk={async e => {
								await handlers.updateCanvas({
									...e,
									canvas_id: record.canvas_id,
								})
								await getData()
							}}
							onCancel={e => {
								console.log('cancel', e)
							}}
							footer={null}
						>
							修改
						</ModalButton>
						<DeleteButton
							role={canvas.role_id}
							onConfirm={async () => {
								await handlers.deleteCanvas(record.canvas_id)
								await getData()
							}}
						/>
					</Space>
				),
			},
		]

	if (isProjectManager(canvas.role_id)) {
		columns.unshift({
			title: '画布id',
			dataIndex: 'canvas_id',
			key: 'canvas_id',
			align: 'center',
		},)
	}

	return (
		<>
			<Flex
				justify="space-between"
				marginBottom="0"
				className="p-1rem"
			>
				<div className="font-semibold text-20px">
					工具栏
				</div>

				<Space>
					<Search
						className="w-250px"
						placeholder="请输入要查询的画布名称"
						onSearch={onSearch}
						enterButton
					/>
					<ModalButton
						role={canvas.role_id}
						title="画布创建"
						form
						formItem={[
							{
								type: 'input',
								props: {
									label: '画布名称',
									name: 'canvas_name',
								},
							},
							{
								type: 'input',
								props: {
									label: '画布描述',
									name: 'canvas_description',
								},
							},
						]}
						onOk={async e => {
							const values = {
								...e,
								project_id: searchParams.get('project_id'),
							}
							await handlers.createCanvas(values)
							await getData()
						}}
						onCancel={e => {
							console.log('cancel', e)
						}}
						footer={null}
					>
						创建画布
					</ModalButton>
				</Space>
			</Flex>
			{list?.canvas && (
				<DataTable
					primaryKey="canvas_id"
					columns={columns}
					dataSource={list.canvas}
				/>
			)}
		</>
	)
}
