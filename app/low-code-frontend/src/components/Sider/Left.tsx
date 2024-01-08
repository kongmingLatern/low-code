import { Col, Row, Tabs } from 'antd'
import { CreateComponentType, TABKEY } from '@/shared'
import {
	LeftSiderTab,
	getContent,
} from '@packages/customized'
import { useEffect, useState } from 'react'

import Box from '@/components/Box'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function LeftSider() {
	const [isExpanded] = useState(true)
	const [activeKey, setActiveKey] = useState<string>(
		TABKEY.TEXT as string
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
			<div ref={parent} className="mt-1rem pr-24px">
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
			label: i,
			key: i,
			children: getChildrenByKey(),
		}
	})

	return (
		<>
			<Tabs
				className="mt-1rem"
				defaultActiveKey={TABKEY.TEXT}
				tabPosition={'left'}
				style={{ height: '100%' }}
				// style={{ height: 'calc(100vh - 80px)' }}
				items={items}
				onChange={onChange}
			/>
		</>
	)
}
