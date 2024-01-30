import AdminCanvas from '@/module/Admin/AdminCanvas'
import AdminComponent from '@/module/Admin/AdminComponent'
import AdminComponentConfig from '@/module/Admin/AdminComponentConfig'
import AdminProject from '@/module/Admin/AdminProject'
import AdminRole from '@/module/Admin/AdminRole'
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
			{
				key: 'role',
				icon: <Icon icon={'quill:todo'} />,
				label: '角色管理',
			},
			{
				key: 'component',
				icon: <Icon icon={'quill:todo'} />,
				label: '组件管理',
			},
			{
				key: 'component_config',
				icon: <Icon icon={'quill:todo'} />,
				label: '组件配置项管理',
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
		{
			path: 'role',
			element: <AdminRole />,
		},
		{
			path: 'component',
			element: <AdminComponent />
		},
		{
			path: 'component_config',
			element: <AdminComponentConfig />
		}
	],
}
