import {
	ColorPicker,
	Form,
	Input,
	InputNumber,
	Select,
	Switch,
	Typography,
} from 'antd'
import { useEffect, useState } from 'react'

import { useCanvasContext } from '@/hooks'

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
		const { style, props } = data || elementData
		const result = {}

		for (const key in style) {
			if (
				Object.prototype.hasOwnProperty.call(style, key)
			) {
				const value = style[key]
				result[key] = value
			}
		}
		for (const key in props) {
			if (
				Object.prototype.hasOwnProperty.call(props, key)
			) {
				const value = props[key]
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form, elementData, elementData.style])

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
							)
						}
					/>
				)

			case 'textarea':
				return initialValues()[item.name]?.map((i, index) => {
					return <Typography.Text key={index} editable={{
						autoSize: true, onChange(value) {
							elementData.props[item.name].forEach(element => {
								if (element.title === i.title) {
									Object.assign(element, {
										title: value
									})
									canvas.update()
								}
							});
						},
					}}>{i.title}</Typography.Text>
				})

			case 'value':
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

			case 'switch':
				return (
					<Switch
						onChange={e => handleChange(item.name, e)}
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
			form={form}
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
