import { Card, Image, Typography } from 'antd'

import { ELEMENT_TYPE } from '@/shared'

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

	private textHandler(options = {}) {
		const { componentType } = this

		switch (componentType) {
			case 'Antd':
				return (
					<Typography.Text {...options} {...this.props}>
						{this.value}
					</Typography.Text>
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
						// className="min-w-[400px] min-h-[200px]"
						// style={this.props}
						{...this.props}
						{...options}
					/>
				)
			default:
				return <img src={this.value} />
		}
	}

	private cardHandler(options = {} as any) {
		const { componentType } = this
		switch (componentType) {
			case 'Antd':
				return (
					<Card
						// className="min-w-[400px] min-h-[200px]"
						// style={this.props}

						{...this.props}
						{...this.props?.props}
						title={this.props.props?.title || 'Default size card'}
						cover={
							this.props?.props?.cover && <Image alt="example" src={this.props?.props?.cover}
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
			card: {}
		} as Partial<{
			text: Record<string, any>
			img: Record<string, any>
			card: Record<string, any>
		}>
	) {
		switch (this.type) {
			case ELEMENT_TYPE.TEXT:
				return this.textHandler(options.text)
			case ELEMENT_TYPE.IMAGE:
				return this.imgHandler(options.img)
			case ELEMENT_TYPE.CARD:
				return this.cardHandler(options.card)
			default:
				throw new Error('未处理的类型' + this.type)
		}
	}
}
