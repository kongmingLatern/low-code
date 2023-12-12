import {
	ReturnType,
	get,
	handleDeleteRequest,
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
export const roleHandler = {
	getAllRole,
	updateRole,
	deleteRole,
}
