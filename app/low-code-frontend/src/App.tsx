import { get, post } from '@/api'
import { Button } from 'antd'

function App() {
	return (
		<>
			<Button onClick={() => get('/', { a: 123 })}>
				123
			</Button>
			<button onClick={() => post('/', { a: 1 })}>
				123
			</button>
		</>
	)
}

export default App
