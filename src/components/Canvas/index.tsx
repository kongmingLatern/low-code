import { CanvasConfig } from '@packages/customized'
import classNames from 'classnames'
import styled from './canvas.module.scss'
import { useRef } from 'react'
import { useDrop } from 'ahooks'

export default function Canvas() {
	const dropRef = useRef(null)

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
			alert(`custom: ${content} dropped, ${e}`)
		},
	})

	return (
		<div
			id="canvas"
			ref={dropRef}
			className={classNames(styled.coverCanvas)}
			style={{
				backgroundColor: CanvasConfig.background,
				width: CanvasConfig.width,
				height: CanvasConfig.height,
			}}
		></div>
	)
}
