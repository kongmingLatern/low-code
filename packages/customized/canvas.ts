// TODO: 这里可以自由定制画布大小
export const CanvasConfig = {
	width: 600,
	height: 800,
	background: '#fff',
}

export class Canvas {
	private canvas: Record<string, any>

	constructor(_canvas?: Record<string, any>) {
		this.canvas = _canvas || CanvasConfig
	}

	getCanvas() {
		return { ...this.canvas }
	}

	setCanvas(_canvas) {
		Object.assign(this.canvas, _canvas)
	}

	getPublic() {
		return {
			getCanvas: this.getCanvas,
			setCanvas: this.setCanvas,
		}
	}
}
