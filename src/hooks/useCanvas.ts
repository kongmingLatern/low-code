import { Canvas } from '@packages/customized'
import { useRef } from 'react'

export function useCanvas(canvas?) {
	const canvasRef = useRef<Record<string, any>>()

	if (!canvasRef.current) {
		if (canvas) {
			canvasRef.current = canvas
		} else {
			canvasRef.current = new Canvas()
		}
	}
	return canvasRef.current
}
