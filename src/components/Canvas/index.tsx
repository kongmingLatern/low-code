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
	const dropRef = useRef(null)

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
			const [startX, startY] = e!.dataTransfer
				.getData('text')
				.split(',')
			console.log('start', startX)
			console.log('start', startY)

			const endX = e!.pageX
			const endY = e!.pageY

			const selectedElement = canvas.getSelectedElement()
			console.log('endX', endX)
			console.log('endY', endY)

			const { top, left } = selectedElement.style

			canvas.updateSelectedElement({
				top: top + (endX - Number(startX)),
				left: left + (endY - Number(startY)),
			})
		},
	})

	return (
		<div
			id="canvas"
			ref={dropRef}
			className={classNames(styled.coverCanvas, 'relative')}
			style={{
				backgroundColor: style.background,
				width: style.width,
				height: style.height,
			}}
		>
			<ul>
				{element.map((i, index) => (
					<li key={i.key}>
						<Element
							index={index}
							element={i}
							isSelected={
								canvas.getSelectedIndex() === index
							}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}
