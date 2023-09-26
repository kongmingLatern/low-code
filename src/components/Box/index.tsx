import classNames from 'classnames'
import styled from './box.module.scss'
export default function Box(props) {
	const { children } = props
	return (
		<div
			className={classNames('flex-center', 'select-none', styled.border)}
		>
			<span className="text-20px font-semibold h-80px lh-80px">
				{children}
			</span>
		</div>
	)
}
