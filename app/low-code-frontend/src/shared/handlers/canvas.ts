import { CreateCanvasType, UserCanvasInfo } from './types'
import {
	ReturnType,
	get,
	handleDeleteRequest,
	handlePostRequest,
	handlePutRequest,
	urls,
} from '@/api'

export const getAllCanvas = async () => {
	return await get<ReturnType<CreateCanvasType>>(
		urls.canvas.getAllCanvas
	)
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

export const updateCanvas = async values => {
	return await handlePutRequest(
		urls.canvas.updateCanvas,
		values
	)
}

export const deleteCanvas = async canvas_id => {
	return await handleDeleteRequest(
		urls.canvas.deleteCanvas + `/${canvas_id}`,
		{}
	)
}

export const getCanvasByUid = async values => {
	return await get<ReturnType<UserCanvasInfo>>(
		urls.canvas.getCanvasByUid,
		{
			uid: values.uid,
			project_id: values.project_id,
		}
	)
}

export const canvasHandler = {
	getAllCanvas,
	create: createCanvasHandler,
	getCanvasByProjectId,
	assignCanvas,
	updateCanvas,
	deleteCanvas,
	getCanvasByUid,
}
