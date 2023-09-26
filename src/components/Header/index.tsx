import { useCanvasContext } from '@/hooks'
import { Form, Input } from 'antd'

export default function ContentHeader() {
	const [form] = Form.useForm()

	const canvas = useCanvasContext()

	const onFinish = (values: any) => {
		console.log('Finish:', values)
	}

	const handleBlur = (key: 'width' | 'height', e) => {
		const { value } = e.target
		if (key === 'width') {
			canvas.setStyle({
				width: value + 'px',
			})
		} else if (key === 'height') {
			canvas.setStyle({
				height: value + 'px',
			})
		}
	}

	return (
		<Form
			form={form}
			name="horizontal_login"
			layout="inline"
			onFinish={onFinish}
		>
			<Form.Item name="width" label="画布宽度">
				<Input
					placeholder="请输入画布宽度"
					onBlur={e => handleBlur('width', e)}
				/>
			</Form.Item>

			<Form.Item name="height" label="画布高度">
				<Input
					placeholder="请输入画布高度"
					onBlur={e => handleBlur('height', e)}
				/>
			</Form.Item>
		</Form>
	)
}
