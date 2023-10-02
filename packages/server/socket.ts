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

export function sendJoinMessage(element) {
	socket.emit(
		'onJoin',
		{
			uid: '当前用户的uid',
			// 当前所点击的元素
			element,
		},
		(e: any) => {
			console.log(e)
		}
	)
}
