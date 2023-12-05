import { FunctionComponent } from 'react'

interface FlexProps {
	justify?:
		| 'start'
		| 'end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
	align?:
		| 'start'
		| 'end'
		| 'center'
		| 'baseline'
		| 'stretch'
	wrap?: boolean
	className?: string
	marginBottom?: string
	children?: any
}

const Flex: FunctionComponent<FlexProps> = props => {
	const {
		justify = 'end',
		align = 'center',
		wrap = true,
		marginBottom = '1rem',
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
				marginBottom,
			}}
			{...rest}
		>
			{children}
		</div>
	)
}

export default Flex
