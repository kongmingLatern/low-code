import { ELEMENT_TYPE } from '@/shared'
import FormRender from '@packages/customized/form'

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
	let formItems: FormItem[] = []

	switch (element.type) {
		case ELEMENT_TYPE.TEXT:
			formItems = [
				{
					type: 'value',
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
					type: 'value',
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

		case ELEMENT_TYPE.CARD:
			formItems = [
				{
					type: 'text',
					name: 'title',
					label: '卡片标题'
				},
				{
					type: 'value',
					name: 'value',
					label: '卡片内容'
				},
				{
					type: 'number',
					name: 'width',
					label: '卡片宽度(px)',
					placeholder: '请输入卡片宽度(px)',
				},
				{
					type: 'number',
					name: 'height',
					label: '卡片宽度(px)',
					placeholder: '请输入卡片高度(px)',
				},
				{
					type: 'text',
					name: 'cover',
					label: '卡片封面',
					placeholder: '请输入封面链接',
				},
				{
					type: 'select',
					name: 'hoverable',
					label: '是否开启选中效果',
					placeholder: '请选择是否',
					options: [
						{
							value: true,
							label: '是'
						},
						{
							value: false,
							label: '否',
						},
					],
				},
				{
					type: 'select',
					name: 'bordered',
					label: '是否需要边框',
					placeholder: '请选择是否',
					options: [
						{
							value: true,
							label: '是'
						},
						{
							value: false,
							label: '否',
						},
					],
				},
				{
					type: 'select',
					name: 'size',
					label: '卡片大小',
					placeholder: '请选择卡片大小',
					options: [
						{
							value: 'default',
							label: '默认'
						},
						{
							value: 'small',
							label: '小',
						},
					],
				},
			]
			break

		case ELEMENT_TYPE.BUTTON:
			formItems = [
				{
					type: 'value',
					name: 'value',
					label: '文本内容',
				},
				{
					type: 'select',
					name: 'type',
					label: '按扭类型',
					placeholder: '请选择按扭类型',
					options: [
						{
							value: 'primary',
							label: '主要按扭'
						},
						{
							value: 'default',
							label: '默认按扭'
						},
						{
							value: 'text',
							label: '文本按扭'
						},
						{
							value: 'dashed',
							label: '虚线按扭'
						},
						{
							value: 'link',
							label: '链接按扭'
						}
					]
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

		default:
			formItems = [
				{
					type: 'value',
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
	}

	return (
		<FormRender elementData={element} items={formItems} />
	)
}
