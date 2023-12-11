import {
	CreateProjectDto,
	ProjectIdType,
	ProjectUidType,
} from './types'
import {
	get,
	handleDeleteRequest,
	handlePostRequest,
	handlePutRequest,
	urls,
} from '@/api'

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

const createProject = async (values: CreateProjectDto) => {
	return await handlePostRequest(
		urls.project.createProject,
		values,
		'创建成功'
	)
}

const joinProject = async values => {
	return await handlePostRequest(
		urls.project.joinProject,
		values,
		'邀请成功'
	)
}

const deleteUserByUid = async values => {
	return await handleDeleteRequest(
		urls.project.deleteUser + `/${values.uid}`,
		{ project_id: values.project_id }
	)
}

const updateProject = async values => {
	return await handlePutRequest(
		urls.project.updateProject,
		values
	)
}

export const projectHandler = {
	uid: projectUidHandler,
	project_id: projectIdHandler,
	create: createProject,
	join: joinProject,
	deleteUser: deleteUserByUid,
	updateProject,
}
