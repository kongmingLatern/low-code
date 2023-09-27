import { Col, Row, Tabs } from 'antd'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from 'react'
import { TABKEY, getContent } from '@/shared'
import { LeftSiderTab } from '@packages/customized'
import Box from '@/components/Box'

export default function LeftSider() {
	const [isExpanded] = useState(true)
	const [activeKey, setActiveKey] = useState<string>(
		TABKEY.TEXT as string
	)
	const [parent] = useAutoAnimate()

	const onChange = (activeKey: string) => {
		setActiveKey(activeKey)
	}

	const getChildrenByKey = () => {
		const arr = getContent(activeKey)

		return (
			<div ref={parent} className="mt-1rem pr-24px">
				{isExpanded && (
					<Row gutter={[16, 16]}>
						{arr.map(i => (
							<Col span={12} key={i.key}>
								<Box
									type={i.type}
									value={i.value}
									style={i.style}
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
				style={{ height: 'calc(100vh - 80px)' }}
				items={items}
				onChange={onChange}
			/>
		</>
	)
}
