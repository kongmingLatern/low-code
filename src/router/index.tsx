import { createBrowserRouter } from 'react-router-dom'
import BaseHomeLayout from '@/layout/BaseHomeLayout'
import Login from '@/module/Login/pages/Login'
import LoginCover from '@/components/common/Cover'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <BaseHomeLayout />,
	},
	{
		path: '/login',
		element: (
			<LoginCover>
				<Login />
			</LoginCover>
		),
	},
	{
		path: '/register',
		element: (
			<LoginCover split={3} cover={2}>
				<Login />
			</LoginCover>
		),
	},
])
