import { createBrowserRouter } from 'react-router-dom'
import BaseHomeLayout from '@/layout/BaseHomeLayout'
import LoginCover from '@/components/common/Cover'

import Login from '@/module/Login/pages/Login'
import Register from '@/module/Login/pages/Register'
import Home from '@/module/Home/pages/Home'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/home',
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
				<Register />
			</LoginCover>
		),
	},
])
