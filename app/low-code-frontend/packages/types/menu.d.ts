import { RouteObject } from 'react-router-dom'
export interface LayoutProps {
	menuCfg: {
		itemList: {
			key: string
			icon: React.ReactNode
			label: string
		}[]
		handleClick: (e: {
			item
			key
			keyPath
			domEvent
		}) => any
	}
	children?: RouteObject[]
}
