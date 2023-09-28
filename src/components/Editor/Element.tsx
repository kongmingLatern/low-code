import { ELEMENT_TYPE } from '@/shared'
import FormRender from '@packages/customized/form'

export default function EditorElement({ element }) {
	// TODO: 根据 element 的 type 进行设置表单
	// TODO: TS Type
	let formItems: any = []

	switch (element.type) {
		case ELEMENT_TYPE.TEXT:
			formItems = [
				{
					type: 'text',
					name: 'value',
					label: '文本内容',
				},
				{
					type: 'number',
					name: 'width',
					label: '元素宽度(px)',
					placeholder: '请输入元素宽度(px)',
				},
				{
					type: 'number',
					name: 'height',
					label: '元素高度(px)',
					placeholder: '请输入元素高度(px)',
				},
				{
					type: 'number',
					name: 'fontSize',
					label: '字体大小(px)',
					placeholder: '请输入元素大小',
				},
				{
					type: 'select',
					name: 'fontWeight',
					label: '元素粗细',
					placeholder: '请选择元素粗细',
					options: [
						{
							value: '700',
							label: '粗',
						},
						{
							value: '500',
							label: '中等',
						},
						{
							value: '200',
							label: '细',
						},
					],
				},
				{
					type: 'color',
					name: 'color',
					label: '文字颜色',
				},
			]
			break

		case ELEMENT_TYPE.IMAGE:
			formItems = [
				{
					type: 'text',
					name: 'value',
					label: '图片链接',
				},
				{
					type: 'number',
					name: 'width',
					label: '图片宽度(px)',
					placeholder: '请输入图片宽度(px)',
				},
				{
					type: 'number',
					name: 'height',
					label: '图片高度(px)',
					placeholder: '请输入图片高度(px)',
				},
			]
			break

		default:
			break
	}

	return (
		<FormRender elementData={element} items={formItems} />
	)
}
