import { ELEMENT_TYPE } from '@/shared'
import { Image, Typography } from 'antd'

type ComponentType = 'Antd'

// 适配层, 通过 type 对 value 进行处理
export class RenderAdapter {
	private type?: ELEMENT_TYPE = ELEMENT_TYPE.TEXT
	private value?: any
	private props?: Record<string, any> = {}
	// NOTE: 组件库类型,默认为 antd
	private component_type?: ComponentType = 'Antd'

	constructor(
		_type?: ELEMENT_TYPE,
		_value?: any,
		_props?: Record<string, any>,
		_component_type?: ComponentType
	) {
		this.type = _type
		this.value = _value
		this.props = _props
		this.component_type = _component_type
	}

	private textHandler(value?, props?, component_type?) {
		switch (component_type || this.component_type) {
			case 'Antd':
				return (
					<Typography.Text {...(props || this.props)}>
						{value || this.value}
					</Typography.Text>
				)
			default:
				return <span>{value || this.value}</span>
		}
	}

	private imgHandler(value?, props?, component_type?) {
		switch (component_type || this.component_type) {
			case 'Antd':
				return (
					<Image
						src={value || this.value}
						{...(props || this.props)}
					></Image>
				)
			default:
				return <img src={value || this.value} />
		}
	}

	// 对外暴露一个接口,该接口即对type做对应的适配
	handler(
		type?: ELEMENT_TYPE,
		value?: any,
		props?: Record<string, any>,
		component_type: ComponentType = 'Antd'
	) {
		switch (type || this.type) {
			case ELEMENT_TYPE.TEXT:
				return this.textHandler(
					value,
					props,
					component_type
				)
			case ELEMENT_TYPE.IMAGE:
				return this.imgHandler(value, props, component_type)
			default:
				throw new Error('未处理的类型' + this.type)
		}
	}
}
