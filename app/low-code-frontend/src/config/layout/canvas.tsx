import Canvas from '@/module/CanvasConfig/pages/Canvas'
import { Icon } from '@iconify/react'
import Manage from '@/module/CanvasConfig/pages/Manage'
import Person from '@/module/CanvasConfig/pages/Person'
import { ROLE } from '@/shared'

export const canvasLayoutCfg = {
	menuCfg: {
		itemList: (canvas) => {
			// TODO: 动态菜单
			const { role_id } = canvas
			return [
				{
					key: 'manage',
					role: [ROLE.PROJECT_MANAGER],
					icon: <Icon icon={'uil:edit'} />,
					label: '项目管理',
				},
				{
					key: 'person',
					role: [ROLE.PROJECT_MANAGER, ROLE.COMMON],
					icon: <Icon icon={'mdi:user'} />,
					label: '项目人员',
				},
				{
					key: 'canvas',
					role: [ROLE.PROJECT_MANAGER, ROLE.COMMON],
					icon: <Icon icon={'mdi:canvas'} />,
					label: '项目画布',
				},
			].filter(i => i.role.includes(role_id))
		},
		handleClick: e => {
			return `/canvasConfig/${e.key}`
		},
	},
	children: [
		{
			path: 'manage',
			element: <Manage />,
		},
		{
			path: 'person',
			element: <Person />,
		},
		{
			path: 'canvas',
			element: <Canvas />,
		},
	],
}
