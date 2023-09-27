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
			// style: { ...child.props.style, position: 'absolute' },
			style: { ...child.props.style },
		})

	function setSelected() {
		canvas.setSelectedIndex(index)
	}

	return (
		<div
			className="absolute"
			style={{ ...child.props.style }}
			ref={dragRef}
			onClick={setSelected}
		>
			<ElementChildren />
			{isSelected && (
				<>
					<i className="bg-blue-300 circle absolute top-0 left-0 w-8px h-8px"></i>
					<i className="bg-blue-300 circle absolute top-0 left-[50%] w-8px h-8px translate-x-[-50%]"></i>
					<i className="bg-blue-300 circle absolute top-0 left-[100%] w-8px h-8px translate-x-[-100%]"></i>

					<i className="bg-blue-300 circle absolute top-[50%] left-0 w-8px h-8px translate-y-[-50%]"></i>
					<i className="bg-blue-300 circle absolute top-[50%] left-[100%] w-8px h-8px translate-x-[-100%] translate-y-[-50%]"></i>
					<i className="bg-blue-300 circle absolute top-[100%] left-0 w-8px h-8px translate-y-[-100%]"></i>

					<i className="bg-blue-300 circle absolute top-[100%] left-[50%] w-8px h-8px translate-x-[-50%] translate-y-[-100%]"></i>
					<i className="bg-blue-300 circle absolute top-[100%] left-[100%] w-8px h-8px translate-x-[-100%] translate-y-[-100%]"></i>
				</>
			)}
		</div>
	)
}
