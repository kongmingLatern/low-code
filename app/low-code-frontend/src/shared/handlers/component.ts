import {
	ReturnType,
	get,
	handleDeleteRequest,
	handlePostRequest,
	handlePutRequest,
	urls,
} from '@/api'

import { CreateComponentType } from './types'

export const getAllComponent = async (component_type?) => {
	return await get<ReturnType<CreateComponentType[]>>(
		urls.component.getAllComponents,
		{
			component_type,
		}
	)
}
export const getAllType = async () => {
	return await get<ReturnType<string[]>>(
		urls.component.getAllType
	)
}
export const createComponentHandler = async (
	values: CreateComponentType
) => {
	return await handlePostRequest(
		urls.component.createComponent,
		values,
		'创建成功'
	)
}

export const updateComponent = async values => {
	return await handlePutRequest(
		urls.component.updateComponent,
		values
	)
}

export const deleteComponent = async canvas_id => {
	return await handleDeleteRequest(
		urls.component.deleteComponent + `/${canvas_id}`,
		{}
	)
}

export const componentHandler = {
	getAllComponent,
	getAllType,
	create: createComponentHandler,
	updateComponent,
	deleteComponent,
}
