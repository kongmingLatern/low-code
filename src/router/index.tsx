import { createBrowserRouter } from 'react-router-dom'
import BaseHomeLayout from '@/layout/BaseHomeLayout'
import Login from '@/module/Login/pages/Login'
import styled from '@/assets/image.module.scss'
import classNames from 'classnames'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <BaseHomeLayout />,
	},
	{
		path: '/login',
		element: (
			<div
				className={classNames(
					'w-full',
					'h-100vh',
					styled.loginCover
				)}
			>
				<Login />
			</div>
		),
	},
])
