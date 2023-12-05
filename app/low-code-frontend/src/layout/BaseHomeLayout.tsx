import {
	Col,
	Layout,
	Menu,
	Row,
	message,
	theme,
} from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import React, {
	createContext,
	useEffect,
	useState,
} from 'react'

import Box from '@/module/Index/components/Box'
import { handlers } from '@/shared'

const { Header, Sider, Content } = Layout
export const CardContext = createContext([])

// 创建一个提供器组件，用于包裹 Outlet
const CardProvider = ({ children, value }) => {
	return (
		<CardContext.Provider value={value}>
			{children}
		</CardContext.Provider>
	)
}

const App: React.FC<{
	layoutCfg: Record<string, any>
}> = props => {
	const { menuCfg } = props.layoutCfg
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	const [selectedMenu, setSelectedMenu] = useState('')
	const [cardList, setCardList] = useState<any[]>([])
	const [collapsed, setCollapsed] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		const key = localStorage.getItem('menu_key')
		if (key) {
			setSelectedMenu(key)
			navigate(`/home/${key}`)
		}
	}, [navigate])

	useEffect(() => {
		async function getData() {
			const res = await handlers.getAllProjectByUid(
				localStorage.getItem('uid') as string
			)
			setCardList(res.data.projects)
		}
		getData()
	}, [])

	function getContent() {
		const nickname = localStorage.getItem('nickname')
		if (!nickname) {
			message.error('您没有登陆态,请登陆')
			navigate('/login')
			return
		}
		return nickname
	}

	return (
		<Layout>
			<Sider
				// className="h-100vh"
				collapsible
				collapsed={collapsed}
				onCollapse={value => setCollapsed(value)}
			>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					mode="inline"
					items={menuCfg.itemList}
					selectedKeys={[selectedMenu]}
					onClick={e => {
						localStorage.setItem('menu_key', e.key)
						setSelectedMenu(e.key)
						const path = menuCfg.handleClick(e)
						navigate(path)
					}}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: '0 24px',
						background: colorBgContainer,
					}}
				>
					<Row>
						<Col span={8} className="text-18px">
							全部
						</Col>
						<Col span={8} offset={8}>
							<Box
								icon={{
									src: 'mdi:user',
									width: '30',
									height: '30',
								}}
								content={getContent()}
							/>
						</Col>
					</Row>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
					}}
				>
					<CardProvider value={cardList}>
						<Outlet />
					</CardProvider>
				</Content>
			</Layout>
		</Layout>
	)
}

export default App
