import { get, post } from '@/api'
import { io } from 'socket.io-client'

const url = 'http://localhost:3000'
let socket
function createSocket() {
	const socket = io(url)
	return socket
}

function connect() {
	socket = createSocket()

	socket.on('connect', () => {
		console.log('open')
	})

	socket.on('join', data => {
		console.log('join', data)
	})
}

function sendMessage() {
	socket.emit(
		'onJoin',
		{
			value: '一串连接信息',
		},
		(e: any) => {
			console.log(e)
		}
	)
}
function App() {
	return (
		<>
			<button onClick={() => connect()}>连接</button>

			<button onClick={() => sendMessage()}>
				发送信息
			</button>
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
