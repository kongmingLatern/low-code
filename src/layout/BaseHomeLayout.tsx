import Canvas from '@/components/Canvas'
import {
	ColorTheme,
	LayoutColor,
	SiderConfig,
} from '@packages/customized'
import { Layout } from 'antd'
import classNames from 'classnames'
import styled from './index.module.scss'
import LeftSider from '@/components/Sider/Left'
import { useCanvas } from '@/hooks/useCanvas'
import { CanvasContext } from '@/store/context'
import { useEffect, useReducer } from 'react'

const headerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: 'white',
	height: '80px',
	paddingInline: 50,
	lineHeight: '80px',
	backgroundColor: ColorTheme.black,
}
const { Header, Sider, Content } = Layout

export default function HomeLayout() {
	const canvas = useCanvas()

	const [, forceUpdate] = useReducer(x => x + 1, 0)

	useEffect(() => {
		const unsubscribe = canvas.subscribe(() => {
			forceUpdate()
		})
		return () => unsubscribe() as any
	}, [canvas])

	return (
		<CanvasContext.Provider value={canvas!}>
			<Layout>
				<Header
					className="text-20px font-semibold"
					style={headerStyle}
				>
					低代码平台
				</Header>
				<Layout className={classNames(styled.siderHeight)}>
					{/* 左侧操作栏 */}
					<Sider
						width={SiderConfig.LeftWidth}
						className={classNames('color-black', 'mr-2rem')}
						style={{
							backgroundColor:
								LayoutColor.leftSiderBackground,
						}}
					>
						<LeftSider />
					</Sider>
					{/* 画布区 */}
					<Content className={classNames('flex-center')}>
						<Canvas />
					</Content>
					{/* 右侧操作栏 */}
					<Sider
						width={SiderConfig.RightWidth}
						className={classNames('color-black', 'ml-2rem')}
						style={{
							backgroundColor:
								LayoutColor.rightSiderBackground,
						}}
					>
						编辑区
					</Sider>
				</Layout>
				{/* <Footer style={footerStyle}>Footer</Footer> */}
			</Layout>
		</CanvasContext.Provider>
	)
}
