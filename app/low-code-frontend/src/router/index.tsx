import { canvasLayoutCfg, homeLayoutCfg } from '@/config'

import App from '@/App'
import BaseBackendLayout from '@/layout/BaseBackendLayout'
import BaseCanvasLayout from '@/layout/BaseCanvasLayout'
import BaseHomeLayout from '@/layout/BaseHomeLayout'
import CanvasHomeLayout from '@/layout/CanvasHomeLayout'
import Home from '@/module/Index/pages/Home'
import Login from '@/module/Login/pages/Login'
import LoginCover from '@/components/common/Cover'
import Register from '@/module/Login/pages/Register'
import { backendLayoutCfg } from '@/config/layout/backend'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/preview',
		element: <App />,
	},
	{
		path: '/home',
		element: <BaseHomeLayout layoutCfg={homeLayoutCfg} />,
		children: homeLayoutCfg.children,
	},
	{
		path: '/canvasConfig',
		element: (
			<CanvasHomeLayout layoutCfg={canvasLayoutCfg} />
		),
		children: canvasLayoutCfg.children,
	},
	{
		path: '/canvas/:id',
		element: <BaseCanvasLayout />,
	},
	{
		path: '/admin',
		element: (
			<BaseBackendLayout layoutCfg={backendLayoutCfg} />
		),
		children: backendLayoutCfg.children,
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
