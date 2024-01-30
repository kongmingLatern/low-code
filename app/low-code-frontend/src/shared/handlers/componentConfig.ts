import {
	ReturnType,
	get,
	handleDeleteRequest,
	handlePostRequest,
	handlePutRequest,
	urls,
} from '@/api'

import { CreateComponentConfigType } from './types'

export const getAllComponentConfig = async (id?) => {
	return await get<ReturnType<CreateComponentConfigType[]>>(
		urls.componentConfig.getAllComponentConfig,
		{
			id,
		}
	)
}

export const getConfigByTag = async tag => {
	return await get<ReturnType<CreateComponentConfigType>>(
		urls.componentConfig.getConfigByTag,
		{
			component_tag: tag,
		}
	)
}

export const createComponentConfigHandler = async (
	values: CreateComponentConfigType
) => {
	return await handlePostRequest(
		urls.componentConfig.createComponentConfig,
		values,
		'创建成功'
	)
}

export const updateComponentConfig = async values => {
	return await handlePutRequest(
		urls.componentConfig.updateComponentConfig,
		values
	)
}

export const deleteComponentConfig = async canvas_id => {
	return await handleDeleteRequest(
		urls.componentConfig.deleteComponentConfig +
			`/${canvas_id}`,
		{}
	)
}

export const componentConfigHandler = {
	get: getAllComponentConfig,
	getTag: getConfigByTag,
	create: createComponentConfigHandler,
	update: updateComponentConfig,
	delete: deleteComponentConfig,
}
