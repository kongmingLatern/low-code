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

	getCanvas() {
		return { ...this.canvas }
	}

	getSelectedIndex() {
		return this.selectedIndex
	}

	getSelectedElement() {
		return this.canvas.element[this.selectedIndex!]
	}

	setSelectedIndex(index) {
		if (isEqual(this.selectedIndex, index)) {
			return
		}
		this.selectedIndex = index

		this.update()
	}

	setCanvas(_canvas) {
		Object.assign(this.canvas, _canvas)
		this.update()
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

	update() {
		this.listeners.forEach(listener => listener())
	}

	updateSelectedElement(
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
			getCanvas: this.getCanvas,
			getSelectedIndex: this.getSelectedIndex,
			setSelectedIndex: this.setSelectedIndex,
			getSelectedElement: this.getSelectedElement,
			setCanvas: this.setCanvas,
			setStyle: this.setStyle,
			subscribe: this.subscribe,
			update: this.update,
			clearCanvas: this.clearCanvas,
			updateSelectedElement: this.updateSelectedElement,
			updateCanvasStyle: this.updateCanvasStyle,
		}
		return obj
	}
}

function isEqual(selectedIndex, index) {
	return selectedIndex === index
}
