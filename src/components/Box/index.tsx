import classNames from 'classnames'
import styled from './box.module.scss'
import { RenderAdapter } from '@packages/renderer-core'
import { useRef, useState } from 'react'
import { useDrag } from 'ahooks'
import { useCanvasContext } from '@/hooks'

export default function Box(props) {
	const { type, value, data, style } = props
	const renderAdapter = new RenderAdapter(
		type,
		value,
		style
	)

	const dragRef = useRef(null)
	const [, setDragging] = useState(false)
	const canvas = useCanvasContext()

	useDrag(data, dragRef, {
		onDragStart: () => {
			setDragging(true)
		},
		onDragEnd: () => {
			addToCanvas()
			setDragging(false)
		},
	})

	function addToCanvas() {
		console.log(style)
		canvas.addElement({
			type,
			value,
			style,
		})

		console.log('add', canvas)
	}

	return (
		<div
			className={classNames(
				'flex-center',
				'select-none',
				styled.border
			)}
			ref={dragRef}
			onClick={() => addToCanvas()}
		>
			<span className="text-20px font-semibold h-80px lh-80px">
				{/* 这里最好做一个适配层,能够兼容各种组件库 */}
				{renderAdapter.handler()}
			</span>
		</div>
	)
}
