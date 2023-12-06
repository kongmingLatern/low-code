import {
	Badge,
	Descriptions,
	Divider,
	Typography,
} from 'antd'
import {
	InfoType,
	formatYMDHHmmss,
	handlers,
} from '@/shared'
import React, { useContext } from 'react'

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
	const [searchParams] = useSearchParams()
	const { getData } = useContext(InfoContext)
	return (
		<>
			<Flex justify="start" className="p-1rem pb-0">
				<ModalButton
					title={'邀请人员'}
					form
					formItem={[
						{
							type: 'input',
							props: {
								label: '用户ID',
								name: 'uid',
								rules: [
									{
										required: true,
										message: '请输入用户ID',
									},
								],
							},
						},
					]}
					onOk={async e => {
						// TODO: 邀请人员 => 这里先直接拉进,还未考虑是否同意
						const values = {
							...e,
							project_id: searchParams.get('project_id'),
						}
						await handlers.joinProject(values)
						setTimeout(async () => {
							await getData()
						}, 1000)
					}}
					footer={null}
				>
					邀请人员
				</ModalButton>
			</Flex>
			<Divider />
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
