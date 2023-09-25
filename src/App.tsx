import { get, post } from '@/api'

function App() {
	return (
		<>
			<button onClick={() => get('/', { a: 123 })}>
				123
			</button>
			<button onClick={() => post('/', { a: 1 })}>
				123
			</button>
		</>
	)
}

export default App
