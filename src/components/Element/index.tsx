import { RenderAdapter } from '@packages/renderer-core'

export default function Element(props) {
	const { type, value, props: elementProps } = props.element
	const renderAdapter = new RenderAdapter(
		type,
		value,
		elementProps
	)

	return renderAdapter.handler()
}
