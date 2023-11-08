import { Icon } from '@iconify/react/dist/iconify.js'
import { FunctionComponent } from 'react'

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
		...style
	} = props
	return (
		<span className="flex-center">
			{showIcon && (
				<Icon
					icon={icon?.src || 'fad:logo-fl'}
					width={icon?.width || 60}
					height={icon?.width || 60}
					color={icon?.color || 'black'}
				/>
			)}
			<span
				style={{
					fontSize: fontSize || '16px',
					color,
					...style,
				}}
			>
				{content ? content : '用户名'}
			</span>
		</span>
	)
}

export default Box
