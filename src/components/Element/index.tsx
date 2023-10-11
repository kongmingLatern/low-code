import { RenderAdapter } from '@packages/renderer-core'
import classNames from 'classnames'
import styled from './element.module.scss'
import { useRef } from 'react'
import { useDrag } from 'ahooks'
import React from 'react'
import { useCanvasContext } from '@/hooks'
import { sendActiveElementInfo } from '@packages/server'
import { message } from 'antd'

export default function Element(props) {
	const { key, type, value, style, editorBy } =
		props.element

	const { index, isSelected } = props
	const dragRef = useRef(null)
	const canvas = useCanvasContext()
	const currentIndex = useRef(null)

	useDrag({}, dragRef, {
		onDragStart: e => {
			setSelected(e)
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
				onClick: e => {
					e.stopPropagation()
					canvas.setSelectedIndex(index)
				},
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
			'data-key': key,
			onClick: e => {
				setSelected(e)
			},
			// style: { ...child.props.style, position: 'absolute' },
			style: { ...child.props.style },
		})

	function setSelected(e) {
		e.stopPropagation()
		// 清空当前画布上所有 编辑者为 333 的
		canvas.removeAllEditor(333)
		canvas.setSelectedIndex(index)
		const element = canvas.getSelectedElement()

		console.log('setSelected', element)

		// 1. 判断元素是否已经有人正在修改

		if (element.editorBy.length === 0) {
			// 无人在修改

			// 1. 添加uid至editor中
			// 2. 获取当前画布信息
			// 3. 发送 emit 信息
			// 4. canvas/index.tsx 中需要接收消息,广播给其他用户
			canvas.setEditorToSelctedElement(333)
			currentIndex.current = index
		} else {
			if (element.editorBy.includes(333)) {
				// 用户选中元素后,可能会直接拖动,这里可以直接放行
				return
			}
			// 有人在修改
			message.error(
				`当前元素正在由 ${editorBy.join(',')} 进行修改`
			)
			canvas.removeEditorToSelctedElement(333)
			// 不允许选中
			canvas.setSelectedIndex(-1)
		}

		// TODO: 向ws服务端发起锁的通知
		sendActiveElementInfo()
		// sendActiveElementInfo(dragRef.current)
	}

	return (
		<div
			className="absolute"
			style={{ ...child.props.style }}
			ref={dragRef}
			// onClick={setSelected}
		>
			<ElementChildren />
			{editorBy.length > 0 ? (
				<i className="absolute top-[-100%] left-0 text-14px color-white bg-blue-400 p-1 text-truncate">
					{editorBy.join(', ') + '正在编辑'}
				</i>
			) : null}
			{isSelected && <CircleList canvas={canvas} />}
		</div>
	)
}
function CircleList(props): React.ReactNode {
	const { canvas } = props

	const handleMouseDown = e => {
		const direction = e.target.dataset.direction
		if (!direction) {
			return
		}
		e.stopPropagation()
		e.preventDefault()

		let startX = e.pageX
		let startY = e.pageY

		const move = e => {
			function transform(style, value) {
				if (style === 'auto') {
					return value
				} else {
					return Number(style)
				}
			}
			const x = e.pageX
			const y = e.pageY
			let disX = x - startX
			let disY = y - startY
			const selectedElement = canvas.getSelectedElement()
			const { key } = selectedElement
			const targetDom: any = document.querySelector(
				`[data-key="${key}"]`
			)

			const newStyle: Record<string, any> = {}

			if (direction) {
				if (direction.indexOf('top') >= 0) {
					disY = 0 - disY
					newStyle.top = selectedElement.style.top - disY
				} else if (direction.indexOf('left') >= 0) {
					disX = 0 - disX
					newStyle.left = selectedElement.style.left - disX
				}
			}

			Object.assign(newStyle, {
				width:
					transform(
						selectedElement.style.width,
						targetDom.offsetWidth
					) + disX,
				height:
					transform(
						selectedElement.style.height,
						targetDom.offsetHeight
					) + disY,
			})

			canvas.updateSelectedElement(newStyle)

			startX = x
			startY = y
		}

		const up = () => {
			document.removeEventListener('mousemove', move)
			document.removeEventListener('mouseup', up)
		}

		document.addEventListener('mousemove', move)
		document.addEventListener('mouseup', up)
	}
	return (
		<ul onMouseDown={handleMouseDown}>
			<li
				className="bg-blue-600 circle absolute top-0 left-0 w-5px h-5px"
				data-direction="top, left"
			></li>
			<li
				className="bg-blue-600 circle absolute top-0 left-[50%] w-5px h-5px translate-x-[-50%]"
				data-direction="top, center"
			></li>
			<li
				className="bg-blue-600 circle absolute top-0 left-[100%] w-5px h-5px translate-x-[-100%]"
				data-direction="top, right"
			></li>

			<li
				className="bg-blue-600 circle absolute top-[50%] left-0 w-5px h-5px translate-y-[-50%]"
				data-direction="center, left"
			></li>
			<li
				className="bg-blue-600 circle absolute top-[50%] left-[100%] w-5px h-5px translate-x-[-100%] translate-y-[-50%]"
				data-direction="center, right"
			></li>

			<li
				className="bg-blue-600 circle absolute top-[100%] left-0 w-5px h-5px translate-y-[-100%]"
				data-direction="bottom, left"
			></li>
			<li
				className="bg-blue-600 circle absolute top-[100%] left-[50%] w-5px h-5px translate-x-[-50%] translate-y-[-100%]"
				data-direction="bottom, center"
			></li>
			<li
				className="bg-blue-600 circle absolute top-[100%] left-[100%] w-5px h-5px translate-x-[-100%] translate-y-[-100%]"
				data-direction="bottom, right"
			></li>
		</ul>
	)
}
