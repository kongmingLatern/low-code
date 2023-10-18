import { FunctionComponent } from 'react'

interface FlexProps {
	justify?:
		| 'start'
		| 'end'
		| 'center'
		| 'between'
		| 'around'
		| 'evenly'
	align?:
		| 'start'
		| 'end'
		| 'center'
		| 'baseline'
		| 'stretch'
	wrap?: boolean
	className?: string
	children?: any
}

const Flex: FunctionComponent<FlexProps> = props => {
	const {
		justify = 'end',
		align = 'center',
		wrap = true,
		children,
		...rest
	} = props
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: justify,
				alignItems: align,
				flexWrap: wrap ? 'wrap' : 'nowrap',
				marginBottom: '1rem',
			}}
			{...rest}
		>
			{children}
		</div>
	)
}

export default Flex
