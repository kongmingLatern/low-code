import { v4 as uuid } from 'uuid'
// TODO: 这里可以自由定制画布大小
export const CanvasConfig = {
	element: [],

	style: {
		width: 600,
		height: 800,
		background: '#fff',
	},
}

export class Canvas {
	canvas: Record<string, any>
	listeners: Array<any> = []

	constructor(_canvas: Record<string, any> = CanvasConfig) {
		this.canvas = _canvas
		this.listeners = []
	}
	addElement(element) {
		this.canvas.element.push({
			...element,
			key: uuid(),
		})
		this.update()
	}

	getCanvas() {
		return { ...this.canvas }
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
			setCanvas: this.setCanvas,
			setStyle: this.setStyle,
			subscribe: this.subscribe,
			clearCanvas: this.clearCanvas,
		}
		return obj
	}
}
