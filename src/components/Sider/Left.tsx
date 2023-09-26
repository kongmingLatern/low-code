import { Col, Row, Tabs } from 'antd'
import Box from '../Box'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from 'react'
import { getContent } from '@/shared'

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
			<div ref={parent} className="mt-1rem">
				{isExpanded && (
					<Row>
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

	const items = ['文本', '图片'].map(i => {
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
