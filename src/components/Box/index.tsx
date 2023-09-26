import classNames from 'classnames'
import styled from './box.module.scss'
export default function Box(props) {
	const { children } = props

	function addToCanvas(props) {
		console.log('props', props)
	}

	return (
		<div
			className={classNames(
				'flex-center',
				'select-none',
				styled.border
			)}
			onClick={() => addToCanvas(props)}
		>
			<span className="text-20px font-semibold h-80px lh-80px">
				{children}
			</span>
		</div>
	)
}
