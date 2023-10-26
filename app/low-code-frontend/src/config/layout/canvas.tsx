import All from '@/module/CanvasConfig/pages/All'
import { Finish } from '@/module/CanvasConfig/pages/Finish'
import { Icon } from '@iconify/react'

export const canvasLayoutCfg = {
	menuCfg: {
		itemList: [
			{
				key: 'all',
				icon: <Icon icon={'mdi:user'} />,
				label: '全部',
			},
			{
				key: 'finish',
				icon: <Icon icon={'fa:ellipsis-h'} />,
				label: '已完成',
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
	],
}
