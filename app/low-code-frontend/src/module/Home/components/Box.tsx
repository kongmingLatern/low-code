import { Icon } from '@iconify/react/dist/iconify.js'
import { FunctionComponent } from 'react'

interface BoxProps {
	icon?: {
		src?: string
		width?: number
		height?: number
	}
	content?: string
	fontSize?: string
}

const Box: FunctionComponent<BoxProps> = props => {
	const { icon, content, fontSize } = props
	return (
		<span className="flex-center">
			<Icon
				icon={icon?.src || 'fad:logo-fl'}
				width={icon?.width || 60}
				height={icon?.width || 60}
			/>
			<span style={{ fontSize: fontSize || '16px' }}>
				{content ? content : '用户名'}
			</span>
		</span>
	)
}

export default Box
