import { createContext } from 'react'

export const CanvasContext = createContext(
	{} as {
		getCanvas: () => { [x: string]: any }
		setCanvas: (_canvas: any) => void
	}
)
