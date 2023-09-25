import { createHashRouter } from 'react-router-dom'
import BaseHomeLayout from '@/layout/BaseHomeLayout'
export const router = createHashRouter([
	{
		path: '/',
		element: <BaseHomeLayout />,
	},
])
