import { FunctionComponent } from 'react'
import { Button, Typography } from 'antd'
import Box from './Box'

const { Title } = Typography

interface ContentProps {}

const Content: FunctionComponent<ContentProps> = () => {
	return (
		<div
			className="w-full h-60vh flex-center flex-col color-white"
			style={{
				background: '#1677ff',
			}}
		>
			<Box
				icon={{
					src: 'fad:logo-fl',
					width: 90,
					height: 90,
				}}
				content="多智协创平台"
				fontSize="48px"
			/>
			<Title style={{color: 'white'}}>第一个多人协作的低代码平台</Title>

			<Button
				type="default"
				className="mt-20px"
				size="large"
			>
				立即创建
			</Button>
		</div>
	)
}

export default Content
