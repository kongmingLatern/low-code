import { useCanvasContext } from '@/hooks'
import { ColorPicker, Form, InputNumber } from 'antd'
import { Header } from 'antd/es/layout/layout'

export default function EditorCanvas() {
	const canvas = useCanvasContext()
	const canvasData = canvas.getCanvas()
	console.log(canvasData)

	const handleChange = (name, value) => {
		canvas.updateCanvasStyle({ [name]: value })
	}

	return (
		<>
			<Header className="color-white text-center font-20px bg-blue-500 font-semibold">
				编辑区
			</Header>
			<Form
				className="flex-center flex-col mt-1rem"
				initialValues={{
					width: canvasData.style.width,
					height: canvasData.style.height,
				}}
			>
				<Form.Item
					name="width"
					label="画布宽度(px)"
					className="max-w-300px"
				>
					<InputNumber
						className="w-full"
						placeholder="请输入画布宽度"
						onChange={e => handleChange('width', e)}
					/>
				</Form.Item>
				<Form.Item
					name="height"
					label="画布高度(px)"
					className="max-w-300px"
				>
					<InputNumber
						className="w-full"
						placeholder="请输入画布高度"
						onChange={e => handleChange('height', e)}
					/>
				</Form.Item>
				<Form.Item
					name="backgroundColor"
					label="画布背景色"
          className="max-w-300px min-w-270px"
				>
					<ColorPicker
						className="w-full"
						defaultValue={canvasData.style.background}
						showText
						onChange={(_, hex) =>
							handleChange('background', hex)
						}
					/>
				</Form.Item>
			</Form>
		</>
	)
}
