import { FunctionComponent } from 'react'
import HeaderContent from '../components/Header'
import MainContent from '../components/Main'

import { Layout } from 'antd'

const { Header, Content, Footer } = Layout

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<>
			<Header>
				<HeaderContent />
			</Header>
			<Content>
				<MainContent />
			</Content>
			<Footer></Footer>
		</>
	)
}

export default Home
