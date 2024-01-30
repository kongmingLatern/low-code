import { useEffect, useState } from 'react'

import FormRender from '@packages/customized/form'
import { handlers } from '@/shared'

type FormItemType = 'text' | 'number' | 'select' | 'color' | 'value'

interface FormItem {
	type: FormItemType
	name: string
	label: string
	placeholder?: string
	options?: {
		value: any
		label: string
	}[]
}

export default function EditorElement({ element }) {
	const [formItem, setFormItem] = useState<FormItem[]>([])

	useEffect(() => {
		async function getData() {
			const res = await handlers.getComponentConfig(element.type)
			setFormItem(res.data as any)
		}
		getData()
	}, [element])

	return (
		<FormRender elementData={element} items={formItem} />
	)
}
