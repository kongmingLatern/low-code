import Canvas from '@/components/Canvas'
import {
	ColorTheme,
	LayoutColor,
} from '@packages/customized'
import { Layout } from 'antd'
import classNames from 'classnames'
import styled from './index.module.scss'

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
	return (
		<Layout>
			<Header
				className="text-20px font-semibold"
				style={headerStyle}
			>
				低代码平台
			</Header>
			<Layout className={classNames(styled.siderHeight)}>
				<Sider
					width={300}
					className={classNames('color-black', 'mr-2rem')}
					style={{
						backgroundColor:
							LayoutColor.leftSiderBackground,
					}}
				>
					物料区
				</Sider>
				<Content className={classNames('flex-center')}>
					<Canvas />
				</Content>
				<Sider
					width={300}
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
	)
}
