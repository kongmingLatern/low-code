import { get } from '@/api'

function App() {
	return (
		<>
			<button onClick={() => get('/')}>123</button>
		</>
	)
}

export default App
