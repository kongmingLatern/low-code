import All from '@/module/Home/pages/All'
import Doing from '@/module/Home/pages/Doing'
import Finish from '@/module/Home/pages/Finish'
import { Icon } from '@iconify/react/dist/iconify.js'
import { LayoutProps } from '@packages/types/menu'
import Will from '@/module/Home/pages/Will'

export const backendLayoutCfg: LayoutProps = {
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
			{
				key: 'doing',
				icon: <Icon icon={'quill:todo'} />,
				label: '进行中',
			},
			{
				key: 'will',
				icon: <Icon icon={'ri:calendar-todo-fill'} />,
				label: '未开始',
			},
		],
		handleClick: e => {
			return `/home/${e.key}`
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
			path: 'doing',
			element: <Doing />,
		},
		{
			path: 'will',
			element: <Will />,
		},
	],
}
