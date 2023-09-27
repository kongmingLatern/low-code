import { RenderAdapter } from '@packages/renderer-core'
import classNames from 'classnames'
import styled from './element.module.scss'

export default function Element(props) {
	const { type, value, props: elementProps } = props.element

	const { isSelected } = props

	const renderAdapter = new RenderAdapter(
		type,
		value,
		elementProps
	)

	return (
		<div
			className={classNames(isSelected && styled.selected)}
		>
			{renderAdapter.handler()}
		</div>
	)
}
