import classNames from 'classnames'
import styled from './box.module.scss'
import { Adapter } from '@packages/renderer-core'
export default function Box(props) {
	const { type, value, ...rest } = props

	const adapter = new Adapter(type, value, rest)

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
				{/* 这里最好做一个适配层,能够兼容各种组件库 */}
				{adapter.handler()}
			</span>
		</div>
	)
}
