import FormRender from '@packages/customized/form'

export default function EditorCanvas() {
	const formItems = [
		{
			type: 'number',
			name: 'width',
			label: '画布宽度(px)',
			placeholder: '请输入画布宽度(px)',
		},
		{
			type: 'number',
			name: 'height',
			label: '画布高度(px)',
			placeholder: '请输入画布高度(px)',
		},
		{
			type: 'color',
			name: 'background',
			label: '画层背景色',
		},
	]
	return <FormRender items={formItems} />
}
