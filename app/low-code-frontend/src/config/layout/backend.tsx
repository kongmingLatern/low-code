import AdminCanvas from '@/module/Admin/AdminCanvas'
import AdminProject from '@/module/Admin/AdminProject'
import AdminUser from '@/module/Admin/AdminUser'
import { Icon } from '@iconify/react/dist/iconify.js'
import { LayoutProps } from '@packages/types/menu'

export const backendLayoutCfg: LayoutProps = {
	menuCfg: {
		itemList: [
			{
				key: 'user',
				icon: <Icon icon={'mdi:user'} />,
				label: '用户管理',
			},
			{
				key: 'project',
				icon: <Icon icon={'fa:ellipsis-h'} />,
				label: '项目管理',
			},
			{
				key: 'canvas',
				icon: <Icon icon={'quill:todo'} />,
				label: '画布管理',
			},
		],
		handleClick: e => {
			return `/admin/${e.key}`
		},
	},
	children: [
		{
			path: 'user',
			element: <AdminUser />,
		},
		{
			path: 'project',
			element: <AdminProject />,
		},
		{
			path: 'canvas',
			element: <AdminCanvas />,
		},
	],
}
