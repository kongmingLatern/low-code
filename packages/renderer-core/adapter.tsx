import { ELEMENT_TYPE } from '@/shared'
import { Image, Typography } from 'antd'

type ComponentType = 'Antd'

// 适配层, 通过 type 对 value 进行处理
export class Adapter {
	private type: ELEMENT_TYPE
	private value: any
	private component_type: ComponentType
	private props: Record<string, any> = {}

	constructor(
		_type: ELEMENT_TYPE = ELEMENT_TYPE.TEXT,
		_value: any,
		_props: Record<string, any> = {},
		_component_type: ComponentType = 'Antd'
	) {
		this.type = _type
		this.value = _value
		this.props = _props
		this.component_type = _component_type
	}

	private textHandler() {
		switch (this.component_type) {
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
		switch (this.component_type) {
			case 'Antd':
				return (
					<Image src={this.value} {...this.props}></Image>
				)
			default:
				return <img src={this.value} />
		}
	}

	// 对外暴露一个接口,该接口即对type做对应的适配
	handler() {
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

// 希望对外用的时候,即 new Adapter('text', 'hello') => <text>hello</text> ...
