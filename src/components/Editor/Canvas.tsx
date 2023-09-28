import { useCanvasContext } from '@/hooks'
import { Form, InputNumber } from 'antd'

export default function EditorCanvas() {
	const canvas = useCanvasContext()
	const canvasData = canvas.getCanvas()
	console.log(canvasData)

	const handleChange = (name, value) => {
		canvas.updateCanvasStyle({ [name]: value })
	}

	return (
		<Form
			initialValues={{
				width: canvasData.style.width,
				height: canvasData.style.height,
			}}
		>
			<Form.Item name="width" label="画布宽度(px)">
				<InputNumber
					placeholder="请输入画布宽度"
					onChange={e => handleChange('width', e)}
				/>
			</Form.Item>
			<Form.Item name="height" label="画布高度(px)">
				<InputNumber
					placeholder="请输入画布高度"
					onChange={e => handleChange('height', e)}
				/>
			</Form.Item>
		</Form>
	)
}
