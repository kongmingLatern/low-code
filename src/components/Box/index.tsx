import classNames from 'classnames'
import styled from './box.module.scss'
import { RenderAdapter } from '@packages/renderer-core'
import { useRef, useState } from 'react'
import { useDrag } from 'ahooks'

export default function Box(props) {
	const { type, value, data, ...rest } = props
	const renderAdapter = new RenderAdapter(type, value, rest)

	const dragRef = useRef(null)
	const [, setDragging] = useState(false)

	useDrag(data, dragRef, {
		onDragStart: () => {
			setDragging(true)
		},
		onDragEnd: () => {
			addToCanvas(props)
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
		>
			<span className="text-20px font-semibold h-80px lh-80px">
				{/* 这里最好做一个适配层,能够兼容各种组件库 */}
				{renderAdapter.handler()}
			</span>
		</div>
	)
}
