import { handlePostRequest, urls } from '@/api'

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

export const canvasHandler = {
	create: createCanvasHandler,
}
