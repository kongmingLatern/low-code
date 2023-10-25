import { createBrowserRouter } from 'react-router-dom'
import BaseCanvasLayout from '@/layout/BaseCanvasLayout'
import BaseHomeLayout from '@/layout/BaseHomeLayout'
import LoginCover from '@/components/common/Cover'

import Login from '@/module/Login/pages/Login'
import Register from '@/module/Login/pages/Register'
import Home from '@/module/Index/pages/Home'
import { layoutCfg } from '@/config/layoutCfg'
import CanvasHomeLayout from '@/layout/CanvasHomeLayout'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/home',
		element: <BaseHomeLayout layoutCfg={layoutCfg} />,
		children: layoutCfg.children,
	},
	{
		path: '/canvasConfig',
		element: <CanvasHomeLayout />,
	},
	{
		path: '/canvas',
		element: <BaseCanvasLayout />,
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
