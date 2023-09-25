import { CanvasConfig } from '@packages/customized'
import classNames from 'classnames'
import styled from '@/assets/canvas.module.scss'

export default function Canvas() {
	return (
		<canvas
			id="canvas"
			className={classNames(styled.coverCanvas)}
			style={{ backgroundColor: CanvasConfig.background }}
			width={CanvasConfig.width}
			height={CanvasConfig.height}
		></canvas>
	)
}
