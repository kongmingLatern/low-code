import FormRender from '@packages/customized/form'

export default function EditorElement({ element }) {
	const formItems = [
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
	return (
		<FormRender elementData={element} items={formItems} />
	)
}
