import { Col, Row, Tabs } from 'antd'
import {
	LeftSiderTab,
	getContent,
} from '@packages/customized'
import { useEffect, useState } from 'react'

import Box from '@/components/Box'
import { CreateComponentType } from '@/shared'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function LeftSider() {
	const [isExpanded] = useState(true)
	const [activeKey, setActiveKey] = useState<string>(
		'all'
	)
	const [data, setData] = useState<CreateComponentType[]>([])
	const [parent] = useAutoAnimate()

	const onChange = (activeKey: string) => {
		setActiveKey(activeKey)
	}

	useEffect(() => {
		async function getData() {
			const arr = await getContent(activeKey)
			setData(arr)
		}
		getData()
	}, [activeKey])

	const getChildrenByKey = () => {

		return (
			<div ref={parent} className="mt-1rem pr-24px" style={{ height: '940px' }}>
				{isExpanded && (
					<Row gutter={[16, 16]}>
						{data.map(i => (
							<Col span={12} key={i.component_id}>
								<Box
									type={i.component_type}
									value={JSON.parse(i.component_props).value}
									style={JSON.parse(i.component_props).style}
									editorBy={[]}
									{...i}
								/>
							</Col>
						))}
					</Row>
				)}
			</div>
		)
	}

	const items = LeftSiderTab.map(i => {
		return {
			label: i.label,
			key: i.key,
			children: getChildrenByKey(),
		}
	})

	return (
		<>
			<Tabs
				className="mt-1rem"
				defaultActiveKey={'all'}
				tabPosition={'left'}
				style={{ height: '100%' }}
				items={items}
				onChange={onChange}
			/>
		</>
	)
}
