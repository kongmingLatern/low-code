import { loginHandler, registerHandle } from './auth'

import { canvasHandler } from './canvas'
import { projectHandler } from './project'

export const handlers = {
	login: loginHandler,
	register: registerHandle,

	getAllProjectByUid: projectHandler['uid'],
	getProjectById: projectHandler['project_id'],
	createProject: projectHandler['create'],
	joinProject: projectHandler['join'],
	deleteUserByUid: projectHandler['deleteUser'],

	createCanvas: canvasHandler['create'],
	getCanvasByProjectId:
		canvasHandler['getCanvasByProjectId'],
	assignCanvas: canvasHandler['assignCanvas'],
}

export * from './auth'
export * from './project'
export * from './canvas'
export * from './types'
