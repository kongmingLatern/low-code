import { io } from 'socket.io-client'

let socket

const url = 'http://localhost:3000'

function createSocket() {
	const socket = io(url)
	return socket
}

export function connect() {
	socket = createSocket()

	socket.on('connect', () => {
		console.log('open')
	})

	socket.on('join', data => {
		console.log('join', data)
	})
}

export function sendMessage() {
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
