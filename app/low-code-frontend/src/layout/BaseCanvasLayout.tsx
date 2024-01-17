import { Affix, Button, Layout, Space } from 'antd'
import {
	ColorTheme,
	LayoutColor,
	SiderConfig,
	codeTemplate,
} from '@packages/customized'
import { downFile, formatToExport, getFile, getShareImgBase64 } from '@/shared'
import { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Box from '@/module/Index/components/Box'
import Canvas from '@/components/Canvas'
import { CanvasContext } from '@/store/context'
import LeftSider from '@/components/Sider/Left'
import RightSider from '@/components/Sider/Right'
import classNames from 'classnames'
import { sendJoinMessage } from '@packages/server'
import styled from './index.module.scss'
import { useCanvas } from '@/hooks/useCanvas'

const headerStyle: React.CSSProperties = {
	color: 'white',
	height: '80px',
	paddingInline: 50,
	lineHeight: '80px',
	backgroundColor: ColorTheme.black,
	display: 'flex',
	justifyContent: 'space-between'
}

const { Header, Sider, Content } = Layout

export default function HomeLayout() {
	// TODO: 获取 canvas_id => 可以通过获取路由的参数 => /canvas/12312312

	const canvas = useCanvas()

	const params = useParams()

	const navigate = useNavigate()

	const [, forceUpdate] = useReducer(x => x + 1, 0)

	const [top] = useState(0)

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
											<a
												href='#'
												onClick={() => {
													getShareImgBase64().then((imgData: any) => {
														downFile(imgData, 'saveCanvas.png')
													})
												}}
											>
												Jpeg 图片
											</a>
										),
									},
									{
										key: 'json',
										label: (
											<a
												href='#'
												type='text'
												onClick={() => {
													getFile(formatToExport(canvas.getCanvas().element), 'data.json')
												}}
											>
												JSON 文件
											</a>
										),
									},
									{
										key: 'tsx-code',
										label: (
											<a
												href='#'
												type='text'
												onClick={() => {
													downFile(`data:text/plain;charset=utf-8,${encodeURIComponent(codeTemplate(formatToExport(canvas.getCanvas().element)))}`, 'index.tsx')
												}}
											>
												TSX 文件
											</a>
										),
									}
								]
							}}
							content={<Button type='primary'>导出</Button>}
						/>


					</Space>

					<Space>
						<Button type='link' className='text-14px' onClick={() => {
							navigate('/preview', {
								state: canvas.getCanvas().element
							})
						}}>预览</Button>
					</Space>
				</Header>
				<Layout className={classNames(styled.siderHeight)}>
					{/* 左侧操作栏 */}
					<Affix offsetTop={top}>
						<Sider
							width={SiderConfig.LeftWidth}
							className={classNames('mr-2rem')}
							style={{
								minHeight: 'calc(100vh)',
								backgroundColor:
									LayoutColor.leftSiderBackground,
							}}
						>
							<LeftSider />
						</Sider>
					</Affix>
					{/* 画布区 */}
					<Content
						className={classNames(
							'flex',
							'items-center',
							'flex-col',
							'mt-1rem'
						)}
					>
						<Canvas />
					</Content>
					{/* 右侧操作栏 */}
					<Affix offsetTop={top}>
						<Sider
							width={SiderConfig.RightWidth}
							className={classNames('color-black', 'ml-2rem')}
							style={{
								backgroundColor:
									LayoutColor.rightSiderBackground,
								minHeight: 'calc(100vh)'
							}}
						>
							<Header className="color-white text-center font-20px bg-blue-500 font-semibold">
								编辑区
							</Header>
							<RightSider />
						</Sider>
					</Affix>
				</Layout>
				{/* <Footer className="p-0" style={footerStyle}>
					Footer
				</Footer> */}
			</Layout>
		</CanvasContext.Provider>
	)
}