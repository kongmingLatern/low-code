import { Dropdown, MenuProps } from 'antd'

import { FunctionComponent } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

interface BoxProps {
	showIcon?: boolean
	icon?: {
		src?: string
		width?: number | string
		height?: number | string
		color?: string
	}
	content?: any
	fontSize?: string | number
	isDropdown?: boolean
	dropProps?: MenuProps
	color?: string
}

const Box: FunctionComponent<
	BoxProps & Record<string, any>
> = props => {
	const {
		showIcon = true,
		icon,
		content,
		fontSize,
		color = 'black',
		isDropdown = false,
		style,
		dropProps,
		...rest
	} = props

	const getName = (
		<span
			style={{
				fontSize: fontSize || '16px',
				color,
				...style,
			}}
		>
			{content ? content : '用户名'}
		</span>
	)

	const items = dropProps?.['items'] || undefined

	return (
		<span className="flex-center" {...rest}>
			{showIcon && (
				<Icon
					icon={icon?.src || 'fad:logo-fl'}
					width={icon?.width || 60}
					height={icon?.width || 60}
					color={icon?.color || 'black'}
				/>
			)}
			{isDropdown ? (
				<Dropdown menu={{ items }}>{getName}</Dropdown>
			) : (
				getName
			)}
		</span>
	)
}

export default Box
