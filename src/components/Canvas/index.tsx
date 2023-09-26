import classNames from 'classnames'
import styled from './canvas.module.scss'
import { useRef } from 'react'
import { useDrop } from 'ahooks'
import { useCanvasData } from '@/hooks/useCanvas'
import { RenderAdapter } from '@packages/renderer-core'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function Canvas() {
	const dropRef = useRef(null)

	const { style, element } = useCanvasData()
	const [parent] = useAutoAnimate()

	const renderAdapter = new RenderAdapter()

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
			<ul ref={parent}>
				{element.map(i => (
					<li key={i.key}>
						{renderAdapter.handler(
							i.type,
							i.value,
							i.props
						)}
					</li>
				))}
			</ul>
		</div>
	)
}
