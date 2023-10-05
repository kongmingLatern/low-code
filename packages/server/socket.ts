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

connect()

export function sendJoinMessage(element) {
	console.log(element)
	socket.emit('onJoin', {
		uid: '当前用户的uid',
	})
}

export function sendActiveElementInfo(element) {
	console.log(element)
	// TODO: 广播到其他用户, 禁用 element
	socket.emit('onActive', {
		uid: '当前用户的uid',
	})
}