import { handlePostRequest, urls } from '@/api'

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

export const createCanvasHandler = async (
	values: CreateCanvasType
) => {
	return await handlePostRequest(
		urls.canvas.createCanvas,
		values,
		'创建成功'
	)
}

export const canvasHandler = {
	create: createCanvasHandler,
}
