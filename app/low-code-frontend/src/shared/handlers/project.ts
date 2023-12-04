import { get, urls } from '@/api'

interface ProjectUidType {
	code: number
	data: Record<'projects', Array<Record<string, any>>>
	message: string
}

const projectUidHandler = async (uid: string) => {
	return await get<ProjectUidType>(
		urls.project.getAllProjectByUid + `/${uid}`
	)
}

export const projectHandler = {
	uid: projectUidHandler,
}
