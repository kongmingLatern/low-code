import {
	ReturnType,
	get,
	handleDeleteRequest,
	handlePutRequest,
	urls,
} from '@/api'

export interface UserReturnType {
	uid: string
	username: string
	password: string
	nickname: string
}

export const getAllUser = async () => {
	return await get<ReturnType<UserReturnType>>(
		urls.user.getAllUser
	)
}

export const updateUser = async values => {
	return await handlePutRequest(
		urls.user.updateUser + `/${values.uid}`,
		values
	)
}
export const deleteUser = async uid => {
	return await handleDeleteRequest(
		urls.user.deleteUser + `/${uid}`,
		{}
	)
}

export const userHandler = {
	getAllUser,
	updateUser,
	deleteUser,
}
