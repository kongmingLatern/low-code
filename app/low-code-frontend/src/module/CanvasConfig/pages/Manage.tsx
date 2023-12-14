import { Badge, Descriptions, Typography } from 'antd'
import {
	InfoType,
	formatYMDHHmmss,
	handlers,
} from '@/shared'
import React, { useContext, useEffect } from 'react'

import type { DescriptionsProps } from 'antd'
import Flex from '@/components/common/Flex'
import { InfoContext } from '@/layout/CanvasHomeLayout'
import ModalButton from '@/components/common/ModalButton'
import { useSearchParams } from 'react-router-dom'

const { Paragraph } = Typography

const getStatusText = (status: string) => {
	switch (status) {
		case '已完成':
			return 'success'
		case '进行中':
			return 'processing'
		case '未开始':
			return 'warning'
		default:
			return 'default'
	}
}

const items: (
	info: InfoType
) => DescriptionsProps['items'] = (info: InfoType) => {
	if (info) {
		return [
			{
				key: '1',
				label: '项目名称',
				children: info.project_name,
			},
			{
				key: 'person',
				label: '项目管理员',
				children: info.createUserName,
				span: 3,
			},
			{
				key: '2',
				label: '项目邀请码',
				children: (
					<Paragraph copyable>
						{info.project_code}
					</Paragraph>
				),
				span: 3,
			},
			{
				key: '7',
				label: '项目人员数',
				children: info.user_num,
			},
			{
				key: '8',
				label: '画布数量',
				children: info.canvas_num,
				span: 3,
			},
			{
				key: '4',
				label: '创建时间',
				children: formatYMDHHmmss(
					new Date(info.create_time)
				),
				span: 3,
			},
			{
				key: 'update_time',
				label: '最新更新时间',
				children: formatYMDHHmmss(
					new Date(info.update_time)
				),
				span: 3,
			},
			{
				key: '6',
				label: '项目状态',
				children: (
					<Badge
						status={getStatusText(info.project_status)}
						text={info.project_status}
					/>
				),
				span: 3,
			},
		]
	}
}

const App: React.FC = () => {
	const { info, getData, canvas } = useContext(InfoContext)
	const [searchParams] = useSearchParams()

	useEffect(() => {
		console.log('canvas---Manage', canvas);
	}, [canvas])


	return (
		<>
			<Flex
				justify="end"
				className="p-1rem pb-0"
				marginBottom="0"
			>
				<ModalButton
					role={canvas.role_id}
					title={'邀请人员'}
					form
					initialValues={info}
					formItem={[
						{
							type: 'input',
							props: {
								label: '项目名称',
								name: 'project_name',
								rules: [
									{
										required: true,
										message: '请输入项目名称',
									},
								],
							},
						},
						{
							type: 'select',
							props: {
								label: '项目状态',
								name: 'project_status',
								rules: [
									{
										required: true,
										message: '请选择项目状态',
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
						const values = {
							...e,
							project_id: searchParams.get('project_id'),
						}
						await handlers.updateProject(values)
						await getData()
					}}
					footer={null}
				>
					维护项目信息
				</ModalButton>
			</Flex>
			<Descriptions
				className="p-1.5rem"
				title="项目信息"
				bordered
				items={items(
					useContext(InfoContext).info as InfoType
				)}
			/>
		</>
	)
}

export default App
