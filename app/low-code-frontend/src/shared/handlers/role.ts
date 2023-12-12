import {
	ReturnType,
	get,
	handleDeleteRequest,
	handlePostRequest,
	handlePutRequest,
	urls,
} from '@/api'

export const getAllRole = async () => {
	return await get<ReturnType<any>>(urls.role.getAllRole)
}

export const updateRole = async values => {
	return await handlePutRequest(
		urls.role.updateRole + `/${values.id}`,
		values
	)
}

export const deleteRole = async id => {
	return await handleDeleteRequest(
		urls.role.deleteRole + `/${id}`,
		{}
	)
}

export const addRole = async values => {
	return await handlePostRequest(
		urls.role.addRole,
		values,
		'创建成功'
	)
}
export const roleHandler = {
	getAllRole,
	addRole,
	updateRole,
	deleteRole,
}
