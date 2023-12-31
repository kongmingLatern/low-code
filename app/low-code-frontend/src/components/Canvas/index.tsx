import { sendLeaveRoom, socket } from '@packages/server'
import { useEffect, useRef, useState } from 'react'

import Element from '../Element'
import classNames from 'classnames'
import styled from './canvas.module.scss'
import { useCanvasContext } from '@/hooks/useCanvas'
import { useDrop } from 'ahooks'

// import { useAutoAnimate } from '@formkit/auto-animate/react'
// connect()

export default function Canvas() {
	const dropRef = useRef<HTMLDivElement>(null)

	const canvas = useCanvasContext()
	const [id, setId] = useState('')

	useEffect(() => {
		function handlePaste(e) {
			const clipboardData = e.clipboardData;
			if (!(clipboardData && clipboardData.items)) { //剪切版中是否有内容
				return;
			}
			const content = e.clipboardData.getData('text/plain');
			canvas.addElement(JSON.parse(content))
			return content
		}

		function handleDelete(event) {
			if (event.keyCode === 46 || event.key === "Delete") {
				canvas.removeElement(canvas.getSelectedElement())
			}
		}

		window.addEventListener('paste', handlePaste)
		window.addEventListener('keydown', handleDelete);

		return () => {
			window.removeEventListener('paste', handlePaste)
			window.removeEventListener('keydown', handleDelete)
		}
	}, [canvas])

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
			const editorBy = e!.dataTransfer.getData('array')
			const endX = e!.pageX
			const endY = e!.pageY
			const disX = endX - Number(startX)
			const disY = endY - Number(startY)

			if (flag.length > 0) {
				initDragElement()
				// NOTE: 用户直接从左侧拖拽到画布上时触发
				// sendActiveElementInfo(selectedElement)
				// sendJoinMessage(e!.target)
				return
			}

			updateSelectedPosition()

			// TODO: 向ws服务端发起锁的通知
			// NOTE: 用户在画布上拖拽时触发
			console.log('not initDragElement')

			function updateSelectedPosition() {
				const selectedElement = canvas.getSelectedElement()

				if (selectedElement && selectedElement.style) {
					const { top, left } = selectedElement.style

					canvas.updateSelectedElementStyle({
						top: top + disY,
						left: left + disX,
					})

					// TODO: 这里可以把selectElement的数据结构改变
					// e.g. 加一个 editBy: ['uidA', 'uidB']
					// sendActiveElementInfo(selectedElement)
				}
			}

			function initDragElement() {
				// NOTE: addElement
				const [type, value] = flag

				const obj = e!.dataTransfer.getData(
					'application/json'
				)

				const props = e!.dataTransfer.getData(
					'props'
				)

				const { width, height } = JSON.parse(obj)

				const { top, left } =
					dropRef.current!.getBoundingClientRect()

				canvas.addElement({
					type,
					value,
					style: {
						...JSON.parse(obj),
						top: endY - top - window.scrollY,
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
					// TODO: 这里的 editorBy 需要传递 uid
					editorBy: JSON.parse(editorBy),
					props: { ...JSON.parse(JSON.parse(props).component_props).props || {} }
				})
			}
		},
	})


	useEffect(() => {
		socket.on('join', data => {
			console.log('data', data)
			const { canvasId } = data
			setId(canvasId)
			console.log('join', canvasId)
			canvas.setCanvas(
				{
					canvasId,
					element: Array.isArray(data.element)
						? data.element
						: JSON.parse(data.element),
					style:
						typeof data.style === 'object'
							? data.style
							: JSON.parse(data.style),
				},
				false
			)
		})
		socket.on('canvasUpdate', ({ data }) => {
			console.log('canvasUpdate', data)
			if (data.canvasId === id) {
				canvas.setCanvas(data, false)
			}
		})
		return () => {
			if (id) {
				sendLeaveRoom(id)
			}
		}
	}, [canvas, id])

	function removeSelected() {
		canvas.removeEditorToSelctedElement(localStorage.getItem('nickname'))
		canvas.setSelectedIndex(-1)
	}

	return (
		<div
			id="canvas"
			ref={dropRef}
			className={classNames(styled.coverCanvas, 'relative')}
			onClick={removeSelected}
			style={{ ...canvas.getCanvas().style }}
		>
			{canvas.getCanvas().element.map((i, index) => (
				<Element
					key={i + index}
					index={index}
					element={i}
					isSelected={canvas.getSelectedIndex() === index}
					{...i}
				/>
			))}
		</div>
	)
}
