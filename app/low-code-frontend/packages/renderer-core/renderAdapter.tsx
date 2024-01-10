import { Button, Card, Image, Typography } from 'antd'

import { ELEMENT_TYPE } from '@/shared/enum'

type ComponentType = 'Antd'

const { Text } = Typography

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

	private textHandler(options = {}) {
		const { componentType } = this
		let elseProps: any = {}
		if ('component_props' in this.props) {
			elseProps = JSON.parse(this.props.component_props)
		}
		switch (componentType) {
			case 'Antd':
				return (
					<Text style={this.props.style} {...options} {...(elseProps?.props)} {...this.props?.props}  >
						{this.value}
					</Text>
				)
			default:
				return <span>{this.value}</span>
		}
	}

	private imgHandler(options = {} as any) {
		const { componentType } = this
		switch (componentType) {
			case 'Antd':
				return (
					<Image
						src={this.value}
						{...this.props?.props}
						style={this.props.style}
						{...options}
					/>
				)
			default:
				return <img src={this.value} />
		}
	}
	private buttonHandler(options = {} as any) {
		const { componentType } = this
		let elseProps: any = {}
		if ('component_props' in this.props) {
			elseProps = JSON.parse(this.props.component_props)
		}
		switch (componentType) {
			case 'Antd':
				return (
					<Button
						{
						...(elseProps?.props)
						}
						style={this.props.style}
						{...this.props?.props}
						{...options}
					>
						{
							this.value
						}
					</Button>
				)
			default:
				return <Button {...options} />
		}
	}



	private cardHandler(options = {} as any) {
		const { componentType } = this
		let elseProps: any = {}
		if ('component_props' in this.props) {
			elseProps = JSON.parse(this.props.component_props)
		}
		switch (componentType) {
			case 'Antd':
				return (
					<Card
						{
						...(elseProps?.props)
						}
						{...this.props?.props}
						title={elseProps?.props?.title || this.props.props?.title || '默认标题'}
						style={this.props?.style}
						cover={
							this.props.props?.cover && <Image alt="example" src={this.props.props?.cover}
								onClick={(e) => {
									console.log('click');
									e.stopPropagation()
								}}
							/>
						}
						{...options}
					>
						{
							this.value
						}
					</Card>
				)
		}
	}

	// 对外暴露一个接口,该接口即对type做对应的适配
	handler(
		options = {
			text: {},
			img: {},
			card: {},
			button: {}
		} as Partial<{
			text: Record<string, any>
			img: Record<string, any>
			card: Record<string, any>
			button: Record<string, any>
		}>
	) {
		switch (this.type) {
			case ELEMENT_TYPE.TEXT:
				return this.textHandler(options.text)
			case ELEMENT_TYPE.IMAGE:
				return this.imgHandler(options.img)
			case ELEMENT_TYPE.CARD:
				return this.cardHandler(options.card)
			case ELEMENT_TYPE.BUTTON:
				return this.buttonHandler(options.button)
			default:
				throw new Error('未处理的类型' + this.type)
		}
	}
}
