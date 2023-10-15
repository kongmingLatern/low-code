import React, { useState } from 'react'
import { Layout, Menu, Button, theme } from 'antd'
import { Icon } from '@iconify/react/dist/iconify.js'

const { Header, Sider, Content } = Layout

const App: React.FC<{
	layoutCfg: Record<string, any>
}> = props => {
	const { menuCfg } = props.layoutCfg

	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	return (
		<Layout>
			<Sider
				className="h-100vh"
				trigger={null}
				collapsible
				collapsed={collapsed}
			>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['1']}
					items={menuCfg.itemList}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					<Button
						type="text"
						icon={
							collapsed ? (
								<Icon icon={'pajamas:collapse-right'} />
							) : (
								<Icon icon={'pajamas:collapse-left'} />
							)
						}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
					}}
				>
					Content
				</Content>
			</Layout>
		</Layout>
	)
}

export default App
