import { useCanvasContext } from '@/hooks'
import EditorElement from '../Editor/Element'
import EditorCanvas from '../Editor/Canvas'

export default function RightSider() {
	const canvas = useCanvasContext()
	const hasElement = canvas.getSelectedElement()

	return hasElement ? <EditorElement /> : <EditorCanvas />
}
