import { get, handlePostRequest, urls } from '@/api'

import { CreateCanvasType } from './types'

export const createCanvasHandler = async (
	values: CreateCanvasType
) => {
	return await handlePostRequest(
		urls.canvas.createCanvas,
		values,
		'创建成功'
	)
}

export const getCanvasByProjectId = async project_id => {
	return await get(
		urls.canvas.getCanvasByProjectId +
			`?project_id=${project_id}`
	)
}

export const assignCanvas = async values => {
	return await handlePostRequest(
		urls.canvas.multAllocation,
		values,
		'分配成功'
	)
}

export const canvasHandler = {
	create: createCanvasHandler,
	getCanvasByProjectId,
	assignCanvas,
}
