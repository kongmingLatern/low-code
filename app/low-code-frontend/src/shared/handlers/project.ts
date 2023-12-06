import { CreateProjectDto, ProjectIdType } from './types'
import {
	ReturnType,
	deleteAPI,
	get,
	handlePostRequest,
	urls,
} from '@/api'

import { message } from 'antd'

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
	return await deleteAPI<ReturnType>(
		urls.project.deleteUser + `/${values.uid}`,
		{
			project_id: values.project_id,
		}
	)
		.then(res => {
			if (res.code === 200) {
				message.success('删除成功')
			}
			return '删除成功'
		})
		.catch(e => {
			message.error(e.response?.data?.data)
			return Promise.reject(e.response?.data?.data)
		})
}

export const projectHandler = {
	uid: projectUidHandler,
	project_id: projectIdHandler,
	create: createProject,
	join: joinProject,
	deleteUser: deleteUserByUid,
}
