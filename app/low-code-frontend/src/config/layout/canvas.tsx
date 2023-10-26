import All from '@/module/CanvasConfig/pages/All'
import { Finish } from '@/module/CanvasConfig/pages/Finish'
import { Icon } from '@iconify/react'

export const canvasLayoutCfg = {
	menuCfg: {
		itemList: [
			{
				key: 'all',
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
			path: 'all',
			element: <All />,
		},
		{
			path: 'finish',
			element: <Finish />,
		},
		{
			path: 'manage',
			element: <Finish />,
		},
	],
}
