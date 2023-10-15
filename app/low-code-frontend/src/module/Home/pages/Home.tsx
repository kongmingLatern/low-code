import { FunctionComponent } from 'react'
import HeaderContent from '../components/Header'
import MainContent from '../components/Main'

import { Layout } from 'antd'
import { ColorTheme } from '@packages/customized'

const { Header, Content, Footer } = Layout

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const footerStyle: React.CSSProperties = {
		textAlign: 'center',
		color: 'white',
		height: '80px',
		lineHeight: '80px',
		backgroundColor: ColorTheme.black,
		fontSize: '20px'
	}
	return (
		<>
			<Header>
				<HeaderContent />
			</Header>
			<Content>
				<MainContent />
			</Content>
			<Footer className="p-0" style={footerStyle}>
				&copy; 2023-2024 凤之兮原
			</Footer>
		</>
	)
}

export default Home
