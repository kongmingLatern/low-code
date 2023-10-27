import { Icon } from '@iconify/react'
import Person from '@/module/CanvasConfig/pages/Person'
import Finish from '@/module/CanvasConfig/pages/Finish'
import Manage from '@/module/CanvasConfig/pages/Manage'

export const canvasLayoutCfg = {
	menuCfg: {
		itemList: [
			{
				key: 'person',
				icon: <Icon icon={'mdi:user'} />,
				label: '项目人员',
			},
			{
				key: 'finish',
				icon: <Icon icon={'mdi:canvas'} />,
				label: '项目画布',
			},
			{
				key: 'manage',
				icon: <Icon icon={'uil:edit'} />,
				label: '项目管理',
			},
		],
		handleClick: e => {
			return `/canvasConfig/${e.key}`
		},
	},
	children: [
		{
			path: 'person',
			element: <Person />,
		},
		{
			path: 'finish',
			element: <Finish />,
		},
		{
			path: 'manage',
			element: <Manage />,
		},
	],
}
