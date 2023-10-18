import React, { useEffect, useState } from 'react'
import { Layout, Menu, theme, Col, Row } from 'antd'
import Box from '@/module/Index/components/Box'
import { Outlet, useNavigate } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const App: React.FC<{
	layoutCfg: Record<string, any>
}> = props => {
	const { menuCfg } = props.layoutCfg
	const [selectedMenu, setSelectedMenu] = useState('')
	const navigate = useNavigate()

	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	useEffect(() => {
		const key = localStorage.getItem('menu_key')
		if (key) {
			setSelectedMenu(key)
			navigate(`/home/${key}`)
		}
	}, [navigate])

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
								content="用户名A"
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
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	)
}

export default App
