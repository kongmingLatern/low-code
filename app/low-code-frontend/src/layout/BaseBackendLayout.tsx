import {
	Col,
	Layout,
	Menu,
	Row,
	Space,
	message,
	theme,
} from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Box from '@/module/Index/components/Box'
import { exitLogin } from '@/shared'

const { Header, Sider, Content } = Layout

const App: React.FC<{
	layoutCfg: Record<string, any>
}> = props => {
	const { menuCfg } = props.layoutCfg
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	const [selectedMenu, setSelectedMenu] = useState('')
	const [collapsed, setCollapsed] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		const key =
			localStorage.getItem('admin_menu_key') || 'all'
		if (key) {
			setSelectedMenu(key)
			navigate(`/admin/${key}`)
		}
	}, [navigate])

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
				className="h-100vh"
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
						localStorage.setItem('admin_menu_key', e.key)
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
							<Space>
								<Box
									isDropdown
									dropProps={{
										items: [
											{
												key: '1',
												label: '退出登陆',
												onClick: () => {
													exitLogin(navigate)
												},
											},
										],
									}}
									icon={{
										src: 'mdi:user',
										width: '30',
										height: '30',
									}}
									content={getContent()}
								/>
							</Space>
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
