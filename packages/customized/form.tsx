import { useCanvasContext } from '@/hooks'
import {
	ColorPicker,
	Form,
	Input,
	InputNumber,
	Select,
} from 'antd'
import { useEffect, useState } from 'react'

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
	const initialValues = (data?) => {
		const { style } = data || elementData
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
			result['value'] = elementData.value
		}

		return result
	}
	const [form] = Form.useForm()

	const canvas = useCanvasContext()
	const { elementData = canvas.getCanvas(), items } = props
	const [res] = useState(initialValues())

	const handleChange = (name, value, type?) => {
		if (isCanvas()) {
			canvas.updateCanvasStyle({ [name]: value })
		} else {
			if (isTextContent()) {
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

		function isTextContent() {
			return type === 'text'
		}
	}
	useEffect(() => {
		form.setFieldsValue(initialValues(elementData))
	}, [form, initialValues, elementData, elementData.style])

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

	const onValuesChange = e => {
		console.log(e)
	}

	return (
		<Form
			className="flex-center flex-col mt-1rem"
			form={form}
			initialValues={res}
			onValuesChange={onValuesChange}
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
