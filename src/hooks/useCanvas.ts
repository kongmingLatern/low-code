import { CanvasContext } from '@/store/context'
import { Canvas } from '@packages/customized'
import { useContext, useRef } from 'react'

export function useCanvas(canvas?) {
	const canvasRef = useRef<{
		getCanvas: () => { [x: string]: any }
		setCanvas: (_canvas: any) => void
	}>()

	if (!canvasRef.current) {
		if (canvas) {
			canvasRef.current = canvas
		} else {
			const canvas = new Canvas()
			canvasRef.current = canvas
		}
	}
	return canvasRef.current
}

export function useCanvasData() {
	const canvas = useContext(CanvasContext)
	return canvas.getCanvas()
}
