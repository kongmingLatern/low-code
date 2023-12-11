import { ReturnType, get, urls } from '@/api'

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
export const userHandler = {
	getAllUser,
}
