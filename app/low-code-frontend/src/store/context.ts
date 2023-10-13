import { Canvas } from '@packages/customized'
import { createContext } from 'react'

export const CanvasContext = createContext(
	{} as ReturnType<Canvas['getPublic']>
)
