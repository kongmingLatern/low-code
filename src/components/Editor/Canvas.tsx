import { CanvasForm } from '@packages/customized'
import { Header } from 'antd/es/layout/layout'

export default function EditorCanvas() {
	return (
		<>
			<Header className="color-white text-center font-20px bg-blue-500 font-semibold">
				编辑区
			</Header>
			<CanvasForm />
		</>
	)
}
