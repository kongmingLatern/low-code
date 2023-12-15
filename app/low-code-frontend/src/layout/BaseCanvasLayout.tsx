import { Button, Layout, Space } from 'antd'
import {
	ColorTheme,
	LayoutColor,
	SiderConfig,
} from '@packages/customized'
import { useEffect, useReducer } from 'react'

import Box from '@/module/Index/components/Box'
import Canvas from '@/components/Canvas'
import { CanvasContext } from '@/store/context'
import LeftSider from '@/components/Sider/Left'
import RightSider from '@/components/Sider/Right'
import classNames from 'classnames'
import html2canvas from 'html2canvas'
import { sendJoinMessage } from '@packages/server'
import styled from './index.module.scss'
import { useCanvas } from '@/hooks/useCanvas'
import { useParams } from 'react-router-dom'

const headerStyle: React.CSSProperties = {
	color: 'white',
	height: '80px',
	paddingInline: 50,
	lineHeight: '80px',
	backgroundColor: ColorTheme.black,
	display: 'flex',
	justifyContent: 'space-between'
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

	function getShareImgBase64() {
		return new Promise((resolve) => {
			setTimeout(() => {
				// #capture 就是我们要获取截图对应的 DOM 元素选择器
				html2canvas(document.querySelector('#canvas')!, {
					logging: false,
					useCORS: true, // 【重要】开启跨域配置
					scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
					allowTaint: true, // 允许跨域图片
				}).then((canvas) => {
					const imgData = canvas.toDataURL('image/jpeg', 1.0);
					resolve(imgData);
				});
			}, 300); // 这里加上 300ms 的延迟是为了让 DOM 元素完全渲染完成后再进行图片的生成
		});
	}

	return (
		<CanvasContext.Provider value={canvas!}>
			<Layout>
				<Header
					className="text-20px font-semibold"
					style={headerStyle}
				>
					<Space>
						<Box
							icon={{
								src: 'fad:logo-fl',
								color: 'white',
							}}
							content="多智协创平台"
							fontSize="24px"
							color="white"
							whiteSpace="nowrap"
							marginRight="1rem"
						/>

						<Box
							showIcon={false}
							color='white'
							isDropdown
							dropProps={{
								items: [
									{
										key: 'png',
										label: (
											<Button
												type='text'
												onClick={() => {
													getShareImgBase64().then((imgData: any) => {
														const downLoadLink = document.createElement('a')
														downLoadLink.href = imgData
														downLoadLink.download = 'saveCanvas.png'
														document.body.appendChild(downLoadLink)
														downLoadLink.click()
														document.body.removeChild(downLoadLink)
													})
												}}
											>
												Jpeg
											</Button>
										),
									},
									{
										key: 'vue_code',
										label: (
											<a href='#'>
												Vue文件
											</a>
										),
									}
								]
							}}
							content={<Button type='primary'>导出</Button>}
						/>
					</Space>
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
