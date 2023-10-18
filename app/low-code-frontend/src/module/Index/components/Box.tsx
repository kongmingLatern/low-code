import { Icon } from '@iconify/react/dist/iconify.js'
import { FunctionComponent } from 'react'

interface BoxProps {
	showIcon?: boolean
	icon?: {
		src?: string
		width?: number | string
		height?: number | string
	}
	content?: any
	fontSize?: string | number
}

const Box: FunctionComponent<BoxProps> = props => {
	const { showIcon = true, icon, content, fontSize } = props
	return (
		<span className="flex-center">
			{showIcon && (
				<Icon
					icon={icon?.src || 'fad:logo-fl'}
					width={icon?.width || 60}
					height={icon?.width || 60}
				/>
			)}
			<span style={{ fontSize: fontSize || '16px' }}>
				{content ? content : '用户名'}
			</span>
		</span>
	)
}

export default Box
