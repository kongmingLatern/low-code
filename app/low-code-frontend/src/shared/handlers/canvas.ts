import { post, urls } from '@/api'

import { ReturnType } from './types/returnType'
import { message } from 'antd'

export const enum Status {
	FINISH = '已完成',
	DOING = '进行中',
	NOTSTART = '未开始',
}

interface CreateCanvasType {
	canvas_id: string
	canvas_name: string
	canvas_description: string
	canvas_status: Status
	canvas_info: string
	create_time: Date
	update_time: Date
}

export const createCanvasHander = async (
	values: CreateCanvasType
) => {
	return await post<ReturnType>(
		urls.canvas.createCanvas,
		values
	)
		.then((res: ReturnType) => {
			if (res.code === 201) {
				message.success('创建成功')
				return res
			}
			return res
		})
		.catch(e => {
			message.error(e.response.data.data)
			return Promise.reject(e.response.data.data)
		})
}

export const canvasHandler = {
	create: createCanvasHander,
}
