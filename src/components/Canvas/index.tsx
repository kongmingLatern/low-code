import { CanvasConfig } from '@packages/customized'
import classNames from 'classnames'
import styled from './canvas.module.scss'

export default function Canvas() {
	return (
		<div
			id="canvas"
			className={classNames(styled.coverCanvas)}
			style={{
				backgroundColor: CanvasConfig.background,
				width: CanvasConfig.width,
				height: CanvasConfig.height,
			}}
		></div>
	)
}
