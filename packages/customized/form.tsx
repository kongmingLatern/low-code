import { useCanvasContext } from '@/hooks'
import {
	ColorPicker,
	Form,
	Input,
	InputNumber,
	Select,
} from 'antd'
import { useState } from 'react'

export default function FormRender(
	props: Partial<{
		elementData: Record<string, any>
		items: Array<Record<string, any>>
	}>
) {
	function isCanvas() {
		return Object.prototype.hasOwnProperty.call(
			elementData,
			'element'
		)
	}
	const initialValues = () => {
		const { style } = elementData
		const result = {}

		for (const key in style) {
			if (
				Object.prototype.hasOwnProperty.call(style, key)
			) {
				const value = style[key]
				result[key] = value
			}
		}

		if (!isCanvas()) {
			// NOTE: 如果不是画布,那么元素上一个 value属性代表该元素的值
			result['text'] = elementData.value
		}

		return result
	}

	const canvas = useCanvasContext()
	const { elementData = canvas.getCanvas(), items } = props
	const [res] = useState(initialValues())

	const handleChange = (name, value, type?) => {
		if (isCanvas()) {
			canvas.updateCanvasStyle({ [name]: value })
		} else {
			if (type === 'text') {
				canvas.updateSelectedElement(
					{
						[name]: value,
					},
					value
				)
				return
			}
			canvas.updateSelectedElement({
				[name]: value,
			})
		}
	}

	// useEffect(() => {
	// 	console.log(elementData.style)
	// 	setRes(elementData.style)

	// 	// setRes({
	// 	// 	...elementData.style,
	// 	// })
	// }, [elementData])

	const renderItem = item => {
		switch (item.type) {
			case 'text':
				return (
					<Input
						className="w-full"
						placeholder={item.placeholder}
						onChange={e =>
							handleChange(
								item.name,
								e.target.value,
								'text'
							)
						}
					/>
				)
			case 'number':
				return (
					<InputNumber
						className="w-full"
						placeholder={item.placeholder}
						onChange={e => handleChange(item.name, e)}
					/>
				)
			case 'select':
				return (
					<Select
						onChange={e => handleChange(item.name, e)}
						options={item.options}
					/>
				)
			case 'color':
				return (
					<ColorPicker
						className="w-full"
						showText
						onChange={(_, hex) =>
							handleChange(item.name, hex)
						}
					/>
				)
		}
	}

	return (
		<Form
			className="flex-center flex-col mt-1rem"
			initialValues={res}
		>
			{items!.map(item => {
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
