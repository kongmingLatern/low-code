import { Button, Layout, Menu, Space, theme } from 'antd'
import { InfoType, UserCanvasInfo, handlers } from '@/shared'
import {
	Outlet,
	useNavigate,
	useSearchParams,
} from 'react-router-dom'
import React, {
	createContext,
	useCallback,
	useEffect,
	useState,
} from 'react'

import Box from '@/module/Index/components/Box'

const { Header, Content, Footer } = Layout

interface LayoutProps {
	layoutCfg: Record<string, any>
}

export const InfoContext = createContext(
	{} as {
		info: InfoType
		getData: () => Promise<void>
	}
)

const App: React.FC<LayoutProps> = props => {
	const { layoutCfg } = props
	const { menuCfg } = layoutCfg
	const [selectedMenu, setSelectedMenu] = useState('')

	const [info, setInfo] = useState<InfoType>({} as InfoType)
	const [canvas, setCanvas] = useState<UserCanvasInfo>({} as UserCanvasInfo)
	const [searchParams] = useSearchParams()
	const {
		token: { colorBgContainer },
	} = theme.useToken()
	const navigate = useNavigate()

	const getData = useCallback(async () => {
		const res = await handlers.getProjectById(
			searchParams.get('project_id')
		)

		const rs = await handlers.getCanvasByUid({
			project_id: searchParams.get('project_id'),
			uid: localStorage.getItem('uid')
		})

		setInfo(res.data)
		setCanvas(rs.data)
	}, [searchParams])

	useEffect(() => {
		const pathname = window.location.pathname
		localStorage.setItem(
			'canvas_menu_key',
			pathname.split('/')[2]
		)
		const key = localStorage.getItem('canvas_menu_key')

		if (key) {
			setSelectedMenu(key)
			navigate(
				`/canvasConfig/${key}?project_id=${searchParams.get(
					'project_id'
				)}`
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, searchParams, window.location.pathname])

	useEffect(() => {
		getData()
	}, [getData])

	return (
		<Layout className="layout">
			<Header
				style={{ display: 'flex', alignItems: 'center' }}
			>
				<Space>
					<Button
						type="primary"
						onClick={() => {
							navigate(-1)
						}}
					>
						{'<'}
					</Button>
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
					<Menu
						className="w-full"
						theme="dark"
						mode="horizontal"
						selectedKeys={[selectedMenu]}
						onClick={e => {
							localStorage.setItem('canvas_menu_key', e.key)
							setSelectedMenu(e.key)
							const path = menuCfg.handleClick(e)
							navigate(
								`${path}?project_id=${searchParams.get(
									'project_id'
								)}`
							)
						}}
						items={menuCfg.itemList(canvas)}
					/>
				</Space>
			</Header>
			<Content
				style={{ padding: '0 50px', minHeight: '800px' }}
			>
				{/* <Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb> */}
				<div
					className="site-layout-content"
					style={{
						margin: '16px 0 ',
						background: colorBgContainer,
					}}
				>
					<InfoContext.Provider value={{ info, getData }}>
						<Outlet />
					</InfoContext.Provider>
				</div>
			</Content>
			<Footer
				style={{
					color: 'white',
					textAlign: 'center',
					background: '#001529',
					height: '100px',
					lineHeight: '52px',
				}}
			>
				&copy; 2023 凤之兮原
			</Footer>
		</Layout>
	)
}

export default App
