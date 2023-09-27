import { RenderAdapter } from '@packages/renderer-core'
import classNames from 'classnames'
import styled from './element.module.scss'
import { useRef } from 'react'
import { useDrag } from 'ahooks'
import React from 'react'
import { useCanvasContext } from '@/hooks'

export default function Element(props) {
	const { type, value, style } = props.element

	const { index, isSelected } = props
	const dragRef = useRef(null)
	const canvas = useCanvasContext()

	useDrag({}, dragRef, {
		onDragStart: e => {
			setSelected()
			const startX = e.pageX
			const startY = e.pageY
			e.dataTransfer.setData('text', startX + ',' + startY)
		},
	})

	const renderAdapter = new RenderAdapter(
		type,
		value,
		style
	)

	const child = React.Children.only(
		renderAdapter.handler({
			img: {
				preview: true,
			},
		})
	) as React.ReactElement<any>

	const ElementChildren = () =>
		React.cloneElement(child, {
			...child.props,
			className: classNames(
				child.props.className,
				isSelected && styled.selected
			),
			style: { ...child.props.style, position: 'absolute' },
		})

	function setSelected() {
		canvas.setSelectedIndex(index)
	}

	return (
		<div
			className="absolute"
			ref={dragRef}
			onClick={setSelected}
		>
			<ElementChildren />
		</div>
	)
}
