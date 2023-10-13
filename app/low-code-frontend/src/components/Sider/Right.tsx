import { useCanvasContext } from '@/hooks'
import EditorElement from '../Editor/Element'
import EditorCanvas from '../Editor/Canvas'

export default function RightSider() {
	const canvas = useCanvasContext()
	const element = canvas.getSelectedElement()
	return element ? (
		<EditorElement element={element} />
	) : (
		<EditorCanvas />
	)
}
