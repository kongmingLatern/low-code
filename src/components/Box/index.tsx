import classNames from 'classnames'
import styled from './box.module.scss'
import { Adapter } from '@packages/renderer-core'
import { useRef, useState } from 'react'
import { useDrag } from 'ahooks'

export default function Box(props) {
	const { type, value, data, ...rest } = props
	const adapter = new Adapter(type, value, rest)

	const dragRef = useRef(null)
	const [dragging, setDragging] = useState(false)

	useDrag(data, dragRef, {
		onDragStart: () => {
			setDragging(true)
		},
		onDragEnd: () => {
			setDragging(false)
		},
	})

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
			ref={dragRef}
			onClick={() => addToCanvas(props)}
		>
			<span className="text-20px font-semibold h-80px lh-80px">
				{/* 这里最好做一个适配层,能够兼容各种组件库 */}
				{adapter.handler()}
			</span>
		</div>
	)
}
