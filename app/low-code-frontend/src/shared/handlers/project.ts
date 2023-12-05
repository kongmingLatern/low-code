import { get, post, urls } from '@/api'

import { ReturnType } from './types/returnType'
import { message } from 'antd'

interface ProjectUidType {
	code: number
	data: Record<'projects', Array<Record<string, any>>>
	message: string
}

interface CanvasInfoType {
	canvas_id: string
	canvas_name: string
	canvas_status: string
	canvas_description: string
	create_time: Date
	update_time: Date
}

interface UserInfoType {
	uid: string
	username: string
	project_id: string
	role_id: number
	name: string
	create_time: Date
	update_time: Date
	canvasList: string[]
}

export interface InfoType {
	canvas_num: number
	createBy: string
	createUserName: string
	create_time: Date
	project_code: string
	project_description: string
	project_id: string
	project_name: string
	project_status: string
	refMap: {
		canvas: Array<CanvasInfoType>
		users: Array<UserInfoType>
	}
	update_time: Date
	user_num: number
}

interface ProjectIdType {
	code: number
	data: InfoType
	message: string
}

interface CreateProjectDto {
	project_id: string

	project_name: string

	project_description: string

	project_status: '已完成' | '进行中' | '未开始'

	project_code: string

	create_time?: Date

	update_time?: Date

	createBy?: string
}

const projectUidHandler = async (uid: string) => {
	return await get<ProjectUidType>(
		urls.project.getAllProjectByUid + `/${uid}`
	)
}

const projectIdHandler = async project_id => {
	return await get<ProjectIdType>(
		urls.project.getProjectById + `/${project_id}`
	)
}

const createProject = async (
	values: CreateProjectDto
): Promise<ReturnType> => {
	return await post<ReturnType>(
		urls.project.createProject,
		values
	)
		.then((res: ReturnType) => {
			if (res.code === 201) {
				message.success('创建成功')
				return res
			}
			return res
		})
		.catch(e => {
			message.error(e.response.data.data)
			return Promise.reject(e.response.data.data)
		})
}

export const projectHandler = {
	uid: projectUidHandler,
	project_id: projectIdHandler,
	create: createProject,
}
