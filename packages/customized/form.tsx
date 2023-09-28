import { useCanvasContext } from '@/hooks'
import { ColorPicker, Form, InputNumber } from 'antd'

export default function FormRender(props) {
	const canvas = useCanvasContext()
	const { elementData = canvas.getCanvas(), items } = props

	const handleChange = (name, value) => {
		canvas.updateCanvasStyle({ [name]: value })
	}

	const initialValues = () => {
		const { style } = elementData
		const res = {}

		for (const key in style) {
			if (
				Object.prototype.hasOwnProperty.call(style, key)
			) {
				const value = style[key]
				res[key] = value
			}
		}
		return res
	}

	const renderItem = item => {
		switch (item.type) {
			case 'number':
				return (
					<InputNumber
						className="w-full"
						placeholder={item.placeholder}
						onChange={e => handleChange(item.name, e)}
					/>
				)
			case 'color':
				return (
					<ColorPicker
						className="w-full"
						showText
						onChange={(_, hex) =>
							handleChange('background', hex)
						}
					/>
				)
		}
	}

	return (
		<Form
			className="flex-center flex-col mt-1rem"
			initialValues={initialValues()}
		>
			{items.map(item => {
				return (
					<Form.Item
						key={item.name}
						name={item.name}
						label={item.label}
						className="max-w-300px min-w-270px"
					>
						{renderItem(item)}
					</Form.Item>
				)
			})}
		</Form>
	)
}
