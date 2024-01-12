import { message, notification } from 'antd'

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
		sendOnline(localStorage.getItem('uid') || '')
		console.log(
			'open'
			// JSON.parse(localStorage.getItem('invite_list'))
		)
	})

	socket.on('active', data => {
		message.success('用户A正在操作元素A')
		console.log('userActiveElement', data)
	})

	socket.on('search', message => {
		localStorage.setItem('invite_list', message)
	})

	socket.on('reuseProject', data => {
		const { nickname, project_name } = data
		notification.error({
			message: '通知信息',
			description: `用户${nickname}拒绝参加项目:${project_name}!`,
		})
	})
	socket.on('agreeProject', data => {
		const { nickname, project_name } = data
		notification.success({
			message: '通知信息',
			description: `用户${nickname}同意参加项目:${project_name}!`,
		})
	})

	socket.on('message', message => {
		notification.info({
			message: '新项目邀请',
			description: '您有一则新项目的邀请信息,请查收',
			onClick: () => {
				window.location.href = '/notice'
			},
		})

		localStorage.setItem(
			'invite_list',
			JSON.stringify(message)
		)
	})

	socket.on('leave', () => {
		// TODO: 这里可以获取到用户名
		message.info('用户已离开该房间')
	})
}

connect()

export function sendJoinMessage(canvasId) {
	console.log('ws:sendJoinMessage', canvasId)

	socket.emit('onJoin', {
		uid: '当前用户的uid',
		canvasId,
	})
}

export function sendActiveElementInfo(canvasId) {
	// TODO: 广播到其他用户, 禁用 element
	socket.emit('onActive', {
		uid: '当前用户的uid 13123',
		canvasId,
	})
}

export function sendCanvasUpdate(data) {
	console.log('onCanvasUpdate', data)
	// NOTE: 更新redis,并广播到用户
	socket.emit('onCanvasUpdate', {
		data,
	})
}

export function sendLeaveRoom(canvasId: string) {
	socket.emit('onLeave', {
		canvasId,
	})
}
export function sendInvite(body) {
	console.log(body)
	socket.emit('onInvite', {
		uid: body.uid,
		project_id: body.project_id,
	})
}
export function sendOnline(uid) {
	console.log('上线', uid)
	socket.emit('onLine', {
		uid,
	})
}
export function sendReuse({ uid, project_id, createBy }) {
	socket.emit('onReuse', {
		uid,
		createBy,
		project_id,
	})
}

export function sendAgree({ uid, project_id, createBy }) {
	socket.emit('onAgree', {
		uid,
		createBy,
		project_id,
	})
}
