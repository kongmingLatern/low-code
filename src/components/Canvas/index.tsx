import classNames from 'classnames'
import styled from './canvas.module.scss'
import { useRef } from 'react'
import { useDrop } from 'ahooks'
import {
	useCanvasContext,
	useCanvasData,
} from '@/hooks/useCanvas'
import Element from '../Element'
// import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function Canvas() {
	const dropRef = useRef<HTMLDivElement>(null)

	const canvas = useCanvasContext()
	const { style, element } = useCanvasData()

	// const [parent] = useAutoAnimate()

	useDrop(dropRef, {
		onText: (text, e) => {
			console.log(e)
			alert(`'text: ${text}' dropped`)
		},
		onFiles: (files, e) => {
			console.log(e, files)
			alert(`${files.length} file dropped`)
		},
		onUri: (uri, e) => {
			console.log(e)
			alert(`uri: ${uri} dropped`)
		},
		onDom: (_: string, e) => {
			const [startX, startY, ...flag] = e!.dataTransfer
				.getData('text')
				.split(',')
			const endX = e!.pageX
			const endY = e!.pageY
			const disX = endX - Number(startX)
			const disY = endY - Number(startY)

			if (flag.length > 0) {
				initDragElement()
				return
			}

			updateSelectedPosition()

			function updateSelectedPosition() {
				const selectedElement = canvas.getSelectedElement()

				if (selectedElement && selectedElement.style) {
					const { top, left } = selectedElement.style

					canvas.updateSelectedElement({
						top: top + disY,
						left: left + disX,
					})
				}
			}

			function initDragElement() {
				const [type, value] = flag
				const obj = e!.dataTransfer.getData(
					'application/json'
				)

				const { width, height } = JSON.parse(obj)

				const { top, left } =
					dropRef.current!.getBoundingClientRect()

				canvas.addElement({
					type,
					value,
					style: {
						...JSON.parse(obj),
						top: endY - top,
						left: endX - left,
						width:
							typeof width === 'string' &&
							!width.includes('%') &&
							!width.includes('auto')
								? Number(width)
								: width,
						height:
							typeof height === 'string' &&
							!width.includes('%') &&
							!height.includes('auto')
								? Number(height)
								: height,
					},
				})
			}
		},
	})

	function removeSelected() {
		canvas.setSelectedIndex(-1)
	}

	return (
		<div
			id="canvas"
			ref={dropRef}
			className={classNames(styled.coverCanvas, 'relative')}
			onClick={removeSelected}
			style={{ ...style }}
		>
			{element.map((i, index) => (
				<Element
					key={i + index}
					index={index}
					element={i}
					isSelected={canvas.getSelectedIndex() === index}
				/>
			))}
		</div>
	)
}
