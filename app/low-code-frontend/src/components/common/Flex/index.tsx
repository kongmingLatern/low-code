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
			className="flex"
			{...rest}
			style={{
				justifyContent: justify,
				alignItems: align,
				flexWrap: wrap ? 'wrap' : 'nowrap',
			}}
		>
			{children}
		</div>
	)
}

export default Flex
