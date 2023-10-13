import { useCanvasContext, useCanvasData } from '@/hooks'
import { Button, Col, InputNumber, Row, Space } from 'antd'
import { useEffect, useState } from 'react'

export default function ContentHeader() {
	const canvas = useCanvasContext()
	const canvasData = useCanvasData()

	const [width, setWidth] = useState<number>(
		canvasData.style.width
	)
	const [height, setHeight] = useState<number>(
		canvasData.style.height
	)

	useEffect(() => {
		setWidth(canvasData.style.width)
		setHeight(canvasData.style.height)
	}, [canvasData])

	const handleBlur = (key: 'width' | 'height', e) => {
		const { value } = e.target
		if (key === 'width' && value && value > 0) {
			canvas.setStyle({
				width: Number(value),
			})
			setWidth(value)
		} else if (key === 'height' && value && value > 0) {
			canvas.setStyle({
				height: Number(value),
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

	const clearCanvas = () => {
		canvas.clearCanvas()
	}

	return (
		<Row>
			<Col span={10} className="text-center text-nowrap">
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

			<Col span={10} className="text-center text-nowrap">
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
				<Space>
					<Button onClick={() => reset()}>重置尺寸</Button>
					<Button onClick={() => clearCanvas()}>
						清空画布
					</Button>
				</Space>
			</Col>
		</Row>
	)
}
