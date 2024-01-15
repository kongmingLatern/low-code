import { Dropdown, MenuProps, message } from 'antd'
import React, { useState } from 'react'

import { RenderAdapter } from '@packages/renderer-core'
import classNames from 'classnames'
import { copyToClipboard } from '@/shared'
import { sendActiveElementInfo } from '@packages/server'
import styled from './element.module.scss'
import { useCanvasContext } from '@/hooks'
import { useDrag } from 'ahooks'
import { useRef } from 'react'

const enum ZINDEX {
	MAX = 1049,
	MIN = 0
}

export default function Element(props) {
	const { key, type, value, style, editorBy, ...rest } =
		props.element
	const [zIndex, setZIndex] = useState(ZINDEX.MIN)

	const { index, isSelected } = props
	const dragRef = useRef(null)
	const canvas = useCanvasContext()
	const currentIndex = useRef(null)
	const nickname = localStorage.getItem('nickname')

	useDrag({}, dragRef, {
		onDragStart: e => {
			setSelected(e)
			const startX = e.pageX
			const startY = e.pageY
			e.dataTransfer.setData('text', startX + ',' + startY)
		},
	})
	const renderAdapter = new RenderAdapter(type, value, {
		style,
		...rest,
	})
	const items: MenuProps['items'] = [
		{
			label: '复制',
			key: 'copy',
		},
		{
			label: '上移一层',
			key: 'up',
			disabled: zIndex === ZINDEX.MAX
		},
		{
			label: '下移一层',
			key: 'down',
			disabled: zIndex === ZINDEX.MIN
		},
		{
			label: '至于顶层',
			key: 'above',
			disabled: zIndex === ZINDEX.MAX
		},
		{
			label: '至于底层',
			key: 'below',
			disabled: zIndex === ZINDEX.MIN
		},
	];



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

	const handleClick: MenuProps['onClick'] = (e) => {
		e.domEvent.stopPropagation()
		console.log(e);
		switch (e.key) {
			case 'copy':
				copyToClipboard(JSON.stringify(props.element))
				message.success('复制成功')
				break;
			case 'up':
				if (zIndex <= ZINDEX.MAX - 1) {
					// console.log(canvas.getSelectedElement());
					canvas.updateSelectedElementStyle({
						zIndex: zIndex + 1
					})
					setZIndex(zIndex + 1)
				}
				break;
			case 'down':
				if (zIndex >= ZINDEX.MIN + 1) {
					canvas.updateSelectedElementStyle({
						zIndex: zIndex - 1
					})
					setZIndex(zIndex - 1)
				}
				break;
			case 'above':

				canvas.updateSelectedElementStyle({
					zIndex: ZINDEX.MAX
				})
				setZIndex(ZINDEX.MAX)
				break;
			case 'below':
				canvas.updateSelectedElementStyle({
					zIndex: ZINDEX.MIN
				})
				setZIndex(ZINDEX.MIN)
				break;
			default:
				break;
		}
		console.log(e);
	}


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
			style: {}
			// style: { ...child.props.style, position: 'absolute' },
			// style: { ...child.props.style },
			// ...child.props,
		})

	function setSelected(e) {
		e.stopPropagation()
		// 清空当前画布上所有 编辑者为 333 的
		canvas.removeAllEditor(nickname)
		canvas.setSelectedIndex(index)
		const element = canvas.getSelectedElement()

		console.log('setSelected', canvas.getCanvas())

		// 1. 判断元素是否已经有人正在修改

		if (element.editorBy.length === 0) {
			// 无人在修改

			// 1. 添加uid至editor中
			// 2. 获取当前画布信息
			// 3. 发送 emit 信息
			// 4. canvas/index.tsx 中需要接收消息,广播给其他用户
			canvas.setEditorToSelctedElement(nickname)
			currentIndex.current = index
		} else {
			if (element.editorBy.includes(nickname)) {
				// 用户选中元素后,可能会直接拖动,这里可以直接放行
				return
			}
			// 有人在修改
			message.error(
				`当前元素正在由 ${editorBy.join(',')} 进行修改`
			)
			// canvas.removeEditorToSelctedElement(nickname)
			// 不允许选中
			canvas.setSelectedIndex(-1)
		}

		// NOTE: 向ws服务端发起锁的通知
		sendActiveElementInfo(canvas.getCanvas().canvasId)
		// sendActiveElementInfo(dragRef.current)
	}

	return (
		<div
			className="absolute"
			style={{ ...child.props.style }}
			ref={dragRef}
		// onClick={setSelected}
		>
			<Dropdown menu={{ items, onClick: handleClick }} trigger={['contextMenu']}>
				<div>
					<ElementChildren />
					{editorBy.length > 0 ? (
						<i className="absolute top-[-26px] left-0 text-14px color-white bg-blue-400 p-1 text-truncate">
							<span style={{ color: 'chartreuse' }}>{editorBy.join(', ')}</span>
							正在编辑
						</i>
					) : null}
					{isSelected && <CircleList canvas={canvas} />}
				</div>
			</Dropdown>
		</div>
	)
}
function CircleList(props) {
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
