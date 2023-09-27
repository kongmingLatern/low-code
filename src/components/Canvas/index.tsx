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
		onDom: (content: string, e) => {
			// alert(`custom: ${content} dropped, ${e}`)
			console.log('onDom', content, e)
		},
	})

	return (
		<div
			id="canvas"
			ref={dropRef}
			className={classNames(styled.coverCanvas)}
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
