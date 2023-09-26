import classNames from 'classnames'
import styled from './canvas.module.scss'
import { useContext, useRef } from 'react'
import { useDrop } from 'ahooks'
import { CanvasContext } from '@/store/context'

export default function Canvas() {
	const dropRef = useRef(null)
	const { canvas } = useContext(CanvasContext)

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
				backgroundColor: canvas.background,
				width: canvas.width,
				height: canvas.height,
			}}
		></div>
	)
}
