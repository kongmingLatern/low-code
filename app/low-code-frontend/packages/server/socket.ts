import { message } from 'antd'
import { io } from 'socket.io-client'

export let socket

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

	socket.on('active', data => {
		message.success('用户A正在操作元素A')
		console.log('userActiveElement', data)
	})
}

connect()

export function sendJoinMessage() {
	console.log('send')

	socket.emit('onJoin', {
		uid: '当前用户的uid',
	})
}

export function sendActiveElementInfo() {
	// TODO: 广播到其他用户, 禁用 element
	socket.emit('onActive', {
		uid: '当前用户的uid 13123',
	})
}

export function sendCanvasUpdate(data) {
	// NOTE: 更新redis,并广播到用户
	socket.emit('onCanvasUpdate', {
		data,
	})
}
