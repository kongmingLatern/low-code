import { RouteObject } from 'react-router-dom'
export interface LayoutProps {
	menuCfg: {
		itemList: {
			key: string
			icon: React.ReactNode
			label: string
		}[]
	}
	children?: RouteObject[]
}
