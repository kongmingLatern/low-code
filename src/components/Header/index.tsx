import { useCanvasContext, useCanvasData } from '@/hooks'
import {
	Button,
	Col,
	Form,
	Input,
	InputNumber,
	Row,
} from 'antd'
import { useState } from 'react'

export default function ContentHeader() {
	const canvas = useCanvasContext()
	const { style } = useCanvasData()

	const [width, setWidth] = useState<number>(style.width)
	const [height, setHeight] = useState<number>(style.height)

	const handleBlur = (key: 'width' | 'height', e) => {
		const { value } = e.target
		if (key === 'width' && value && value > 0) {
			canvas.setStyle({
				width: value + 'px',
			})
			setWidth(value)
		} else if (key === 'height' && value && value > 0) {
			canvas.setStyle({
				height: value + 'px',
			})
			setHeight(value)
		}
	}

	const reset = () => {
		canvas.setStyle({
			width: 600,
			height: 800,
		})
		setWidth(600)
		setHeight(800)
	}

	return (
		<Row>
			<Col span={10} className="text-center">
				<span>画布宽度: </span>{' '}
				<InputNumber
					className="w-auto"
					placeholder="请输入画布宽度"
					min={1}
					value={width}
					onBlur={e => handleBlur('width', e)}
					onKeyDown={e => {
						if (e.keyCode === 13) {
							handleBlur('width', e)
						}
					}}
				/>
			</Col>

			<Col span={10} className="text-center">
				<span>画布高度: </span>{' '}
				<InputNumber
					className="w-auto"
					placeholder="请输入画布高度"
					min={1}
					value={height}
					onBlur={e => handleBlur('height', e)}
					onKeyDown={e => {
						if (e.keyCode === 13) {
							handleBlur('height', e)
						}
					}}
				/>
			</Col>

			<Col span={4} className="text-center">
				<Button onClick={() => reset()}>重置</Button>
			</Col>
		</Row>
	)
}
