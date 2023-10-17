import All from '@/module/Home/pages/All'
import { Icon } from '@iconify/react'
import { LayoutProps } from '@packages/types/menu'

export const layoutCfg: LayoutProps = {
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
			element: <div>finish</div>,
		},
		{
			path: 'doing',
			element: <div>doing</div>,
		},
		{
			path: 'will',
			element: <div>will</div>,
		},
	],
}
