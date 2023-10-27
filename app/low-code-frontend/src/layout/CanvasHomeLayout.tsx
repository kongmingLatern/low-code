import React, { useEffect, useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'

const { Header, Content, Footer } = Layout

interface LayoutProps {
	layoutCfg: Record<string, any>
}

const App: React.FC<LayoutProps> = props => {
	const { layoutCfg } = props
	const { menuCfg } = layoutCfg
	const [selectedMenu, setSelectedMenu] = useState('')
	const navigate = useNavigate()
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	useEffect(() => {
		const key = localStorage.getItem('canvas_menu_key')
		if (key) {
			setSelectedMenu(key)
			navigate(`/canvasConfig/${key}`)
		}
	}, [navigate])

	return (
		<Layout className="layout">
			<Header
				style={{ display: 'flex', alignItems: 'center' }}
			>
				<div className="demo-logo" />
				<Menu
					className="w-full"
					theme="dark"
					mode="horizontal"
					selectedKeys={[selectedMenu]}
					onClick={e => {
						localStorage.setItem('canvas_menu_key', e.key)
						setSelectedMenu(e.key)
						const path = menuCfg.handleClick(e)
						navigate(path)
					}}
					items={menuCfg.itemList}
				/>
			</Header>
			<Content style={{ padding: '0 50px' }}>
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
					<Outlet />
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				&copy; 2023 凤之兮原
			</Footer>
		</Layout>
	)
}

export default App
