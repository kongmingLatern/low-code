import {
	ColorTheme,
	LayoutColor,
	SiderConfig,
} from '@packages/customized'
import { useEffect, useReducer } from 'react'

import Canvas from '@/components/Canvas'
import { CanvasContext } from '@/store/context'
import { Layout } from 'antd'
import LeftSider from '@/components/Sider/Left'
import RightSider from '@/components/Sider/Right'
import classNames from 'classnames'
import { sendJoinMessage } from '@packages/server'
import styled from './index.module.scss'
import { useCanvas } from '@/hooks/useCanvas'
import { useParams } from 'react-router-dom'

const headerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: 'white',
	height: '80px',
	paddingInline: 50,
	lineHeight: '80px',
	backgroundColor: ColorTheme.black,
}
const footerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: 'white',
	height: '80px',
	lineHeight: '80px',
	backgroundColor: ColorTheme.black,
}
const { Header, Sider, Content, Footer } = Layout

export default function HomeLayout() {
	// TODO: 获取 canvas_id => 可以通过获取路由的参数 => /canvas/123123123

	const canvas = useCanvas()

	const params = useParams()

	const [, forceUpdate] = useReducer(x => x + 1, 0)

	useEffect(() => {
		const unsubscribe = canvas.subscribe(() => {
			forceUpdate()
		})
		return () => unsubscribe() as any
	}, [canvas])

	useEffect(() => {
		// TODO: 传递 canvas_id, uid
		sendJoinMessage(params.id)
	}, [params.id])

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
					<Content
						className={classNames(
							'flex',
							'items-center',
							'flex-col',
							'mt-1rem'
						)}
					>
						{/* <Header
							className={classNames(
								'w-full',
								'bg-white',
								'mb-1rem'
							)}
						> */}
						{/* <ContentHeader /> */}
						{/* </Header> */}
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
						<Header className="color-white text-center font-20px bg-blue-500 font-semibold">
							编辑区
						</Header>
						<RightSider />
					</Sider>
				</Layout>
				<Footer className="p-0" style={footerStyle}>
					Footer
				</Footer>
			</Layout>
		</CanvasContext.Provider>
	)
}
