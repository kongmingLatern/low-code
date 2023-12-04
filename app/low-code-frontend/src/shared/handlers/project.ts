import { get, urls } from '@/api'

interface ProjectUidType {
	code: number
	data: Record<'projects', Array<Record<string, any>>>
	message: string
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
	refMap: Record<string, any>
	update_time: Date
	user_num: number
}

interface ProjectIdType {
	code: number
	data: InfoType
	message: string
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

export const projectHandler = {
	uid: projectUidHandler,
	project_id: projectIdHandler,
}
