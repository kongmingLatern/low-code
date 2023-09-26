import { CanvasContext } from '@/store/context'
import { Canvas } from '@packages/customized'
import { useContext, useRef } from 'react'

export function useCanvas(canvas?) {
	const canvasRef =
		useRef<ReturnType<Canvas['getPublic']>>()

	if (!canvasRef.current) {
		if (canvas) {
			canvasRef.current = canvas
		} else {
			const canvas = new Canvas()
			canvasRef.current = canvas
		}
	}
	return canvasRef.current!
}

export function useCanvasContext() {
	const canvas = useContext(CanvasContext)
	return canvas
}

export function useCanvasData() {
	const canvas = useContext(CanvasContext)
	return canvas.getCanvas()
}
