import { RenderAdapter } from '@packages/renderer-core'
import classNames from 'classnames'
import styled from './box.module.scss'
import { useCanvasContext } from '@/hooks'
import { useDrag } from 'ahooks'
import { useRef } from 'react'

export default function Box(props) {
	const { type, value, data, style, editorBy, ...rest } =
		props

	const renderAdapter = new RenderAdapter(type, value, {
		style,
		...rest,
	})

	const dragRef = useRef(null)
	const canvas = useCanvasContext()

	useDrag(data, dragRef, {
		onDragStart: e => {
			e.dataTransfer.effectAllowed = 'move'
			const startX = e.pageX
			const startY = e.pageY

			e.dataTransfer.setData(
				'text',
				startX +
				',' +
				startY +
				',' +
				type +
				',' +
				value +
				',' +
				JSON.stringify(editorBy)
			)
			e.dataTransfer.setData(
				'array',
				JSON.stringify(editorBy)
			)

			e.dataTransfer.setData(
				'application/json',
				JSON.stringify(style)
			)

			e.dataTransfer.setData(
				'props',
				JSON.stringify(rest)
			)
		},
	})

	function addToCanvas() {
		canvas.addElement({
			type,
			value,
			style,
			editorBy,
			...rest,
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
			onClick={() => {
				addToCanvas()
			}}
		>
			<span className="text-20px font-semibold lh-80px">
				{/* 这里最好做一个适配层,能够兼容各种组件库 */}
				{renderAdapter.handler({
					img: {
						style: {
							width: '100%',
							height: '100%',
						},
						preview: false,
					},
				})}
			</span>
		</div>
	)
}
