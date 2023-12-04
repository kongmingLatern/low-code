import { get, urls } from '@/api'

interface ProjectUidType {
	code: number
	data: Record<'projects', Array<Record<string, any>>>
	message: string
}

interface ProjectIdType {
	code: number
	data: Record<string, any>
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
