import { loginHandler, registerHandle } from './auth'

import { canvasHandler } from './canvas'
import { projectHandler } from './project'
import { userHandler } from './user'

export const handlers = {
	login: loginHandler,
	register: registerHandle,

	getAllUser: userHandler['getAllUser'],
	updateUser: userHandler['updateUser'],
	deleteUser: userHandler['deleteUser'],

	getAllProject: projectHandler['getAllProject'],
	getAllProjectByUid: projectHandler['uid'],
	getProjectById: projectHandler['project_id'],
	createProject: projectHandler['create'],
	joinProject: projectHandler['join'],
	updateProject: projectHandler['updateProject'],
	deleteUserByUid: projectHandler['deleteUser'],
	deleteProject: projectHandler['deleteProject'],

	getAllCanvas: canvasHandler['getAllCanvas'],
	createCanvas: canvasHandler['create'],
	getCanvasByProjectId:
		canvasHandler['getCanvasByProjectId'],
	assignCanvas: canvasHandler['assignCanvas'],
	updateCanvas: canvasHandler['updateCanvas'],
	deleteCanvas: canvasHandler['deleteCanvas'],
}

export * from './auth'
export * from './user'
export * from './project'
export * from './canvas'
export * from './types'
