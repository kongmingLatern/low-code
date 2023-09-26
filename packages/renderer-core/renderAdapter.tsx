import { ELEMENT_TYPE } from '@/shared'
import { Image, Typography } from 'antd'

type ComponentType = 'Antd'

// 适配层, 通过 type 对 value 进行处理
export class RenderAdapter {
	private type: ELEMENT_TYPE = ELEMENT_TYPE.TEXT
	private value: any
	private props: Record<string, any> = {}
	// NOTE: 组件库类型,默认为 antd
	private componentType: ComponentType = 'Antd'

	constructor(
		type?: ELEMENT_TYPE,
		value?: any,
		props?: Record<string, any>,
		componentType?: ComponentType
	) {
		if (type !== undefined) this.type = type
		if (value !== undefined) this.value = value
		if (props !== undefined) this.props = props
		if (componentType !== undefined)
			this.componentType = componentType
	}

	private textHandler() {
		const { componentType } = this
		switch (componentType) {
			case 'Antd':
				return (
					<Typography.Text {...this.props}>
						{this.value}
					</Typography.Text>
				)
			default:
				return <span>{this.value}</span>
		}
	}

	private imgHandler() {
		const { componentType } = this
		switch (componentType) {
			case 'Antd':
				return <Image src={this.value} {...this.props} />
			default:
				return <img src={this.value} />
		}
	}

	// 对外暴露一个接口,该接口即对type做对应的适配
	handler(
		type?: ELEMENT_TYPE,
		value?: any,
		props?: Record<string, any>,
		componentType: ComponentType = 'Antd'
	) {
		if (type !== undefined) this.type = type
		if (value !== undefined) this.value = value
		if (props !== undefined) this.props = props
		this.componentType = componentType

		switch (this.type) {
			case ELEMENT_TYPE.TEXT:
				return this.textHandler()
			case ELEMENT_TYPE.IMAGE:
				return this.imgHandler()
			default:
				throw new Error('未处理的类型' + this.type)
		}
	}
}
