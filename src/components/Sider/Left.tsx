import { Col, Row, Tabs } from 'antd'
import Box from '../Box'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from 'react'
import { getContent } from '@/shared'
import { LeftSiderTab } from '@packages/customized'

export default function LeftSider() {
	const [isExpanded] = useState(true)
	const [activeKey, setActiveKey] = useState('1')
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
							<Col span={12} key={i}>
								<Box>{i}</Box>
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
				defaultActiveKey="文本"
				tabPosition={'left'}
				style={{ height: 'calc(100vh - 80px)' }}
				items={items}
				onChange={onChange}
			/>
		</>
	)
}
