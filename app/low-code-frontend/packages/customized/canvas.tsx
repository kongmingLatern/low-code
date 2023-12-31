import { http } from '@/api'
import { sendCanvasUpdate } from '@packages/server'
import { v4 as uuid } from 'uuid'
// TODO: 这里可以自由定制画布大小
export const CanvasConfig = {
	element: [],

	style: {
		width: 600,
		height: 800,
		backgroundColor: '#fff',
	},
}

export class Canvas {
	canvas: Record<string, any>
	listeners: Array<any> = []
	selectedIndex: number | null

	constructor(_canvas: Record<string, any> = CanvasConfig) {
		// TODO: 这里才是要根据当前画布的id获取到对应画布的配置信息
		this.canvas = _canvas
		this.listeners = []
		this.selectedIndex = null
	}
	addElement(element) {
		// 添加元素
		this.canvas.element.push({
			...element,
			key: uuid(),
		})

		// 设置为选中元素
		this.selectedIndex = this.canvas.element.length - 1

		// 更新画布
		this.update()
	}

	removeElement(targetElement) {
		this.canvas.element = this.canvas.element.filter(i => i !== targetElement)
		this.update()
	}

	getCanvas() {
		// 更新画布
		return { ...this.canvas }
	}

	getSelectedIndex() {
		return this.selectedIndex
	}

	getSelectedElement() {
		return this.canvas.element[this.selectedIndex!]
	}

	setEditorToSelctedElement(editor) {
		this.canvas.element[this.selectedIndex!].editorBy.push(
			editor
		)
		this.update()
	}

	removeEditorToSelctedElement(editor) {
		if (
			this.selectedIndex !== null &&
			this.selectedIndex !== -1
		) {
			const editorBy = this.canvas.element[
				this.selectedIndex!
			]?.editorBy?.filter(i => i !== editor)

			if (this.canvas.element[this.selectedIndex]) {
				this.canvas.element[this.selectedIndex!].editorBy =
					editorBy
				this.update()
			}

		}
	}

	removeAllEditor(editor) {
		if (this.selectedIndex !== -1) {
			this.canvas.element = this.canvas.element.map(
				item => {
					return {
						...item,
						editorBy: item.editorBy.filter(
							i => i !== editor
						),
					}
				}
			)
			this.update()
		}
	}

	setSelectedIndex(index) {
		if (isEqual(this.selectedIndex, index)) {
			return
		}
		this.selectedIndex = index

		this.update()
	}

	setCanvas(_canvas, shouldSend = true) {
		Object.assign(this.canvas, _canvas)
		http.post('/redis/setCanvas', this.canvas)
		this.update(shouldSend)
	}

	setStyle(style: Record<string, any>) {
		Object.assign(this.canvas.style, {
			...this.canvas.style,
			...style,
		})
		this.update()
	}

	clearCanvas() {
		this.canvas.element = []
		this.update()
	}

	async update(shouldSend = true) {
		if (shouldSend) {
			sendCanvasUpdate(this.canvas)
		}
		this.listeners.forEach(listener => listener())
	}

	updateSelectedElement(
		newStyle = {},
		value = this.getSelectedElement().value
	) {
		const selectedElement = this.getSelectedElement()

		Object.assign(
			this.canvas.element[this.selectedIndex || 0],
			// TODO: 有重复属性,需要区分props和style
			{
				props: {
					...(selectedElement.props || {}),
					...newStyle
				},
				style: {
					...(selectedElement.style || {}),
					...newStyle,
				},
				value,
			}
		)

		this.update()
	}

	updateSelectedElementProps(
		newProps = {},
		value = this.getSelectedElement().value
	) {
		const selectedElement = this.getSelectedElement()

		Object.assign(
			this.canvas.element[this.selectedIndex || 0],
			{
				props: {
					...(selectedElement.props || {}),
					...newProps
				},
				value,
			}
		)

		this.update()
	}


	updateSelectedElementStyle(
		newStyle = {},
		value = this.getSelectedElement().value
	) {
		const selectedElement = this.getSelectedElement()

		Object.assign(
			this.canvas.element[this.selectedIndex || 0],
			{
				style: {
					...(selectedElement.style || {}),
					...newStyle,
				},
				value,
			}
		)

		this.update()
	}

	updateCanvasStyle(newStyle = {}) {
		Object.assign(this.canvas.style, {
			...this.canvas.style,
			...newStyle,
		})
		this.update()
	}

	subscribe(listener) {
		this.listeners.push(listener)
		return () =>
		(this.listeners = this.listeners.filter(
			i => i !== listener
		))
	}

	getPublic() {
		const obj = {
			addElement: this.addElement,
			removeElement: this.removeElement,
			getCanvas: this.getCanvas,
			getSelectedIndex: this.getSelectedIndex,
			setSelectedIndex: this.setSelectedIndex,
			getSelectedElement: this.getSelectedElement,
			setCanvas: this.setCanvas,
			setStyle: this.setStyle,
			setEditorToSelctedElement:
				this.setEditorToSelctedElement,
			removeEditorToSelctedElement:
				this.removeEditorToSelctedElement,
			removeAllEditor: this.removeAllEditor,
			subscribe: this.subscribe,
			update: this.update,
			clearCanvas: this.clearCanvas,
			updateSelectedElement: this.updateSelectedElement,
			updateSelectedElementStyle: this.updateSelectedElementStyle,
			updateSelectedElementProps: this.updateSelectedElementProps,
			updateCanvasStyle: this.updateCanvasStyle,
		}
		return obj
	}
}

function isEqual(selectedIndex, index) {
	return selectedIndex === index
}
