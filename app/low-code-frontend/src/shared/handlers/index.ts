import { loginHandler, registerHandle } from './auth'

import { canvasHandler } from './canvas'
import { componentHandler } from './component'
import { projectHandler } from './project'
import { roleHandler } from './role'
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
	getCanvasByUid: canvasHandler['getCanvasByUid'],
	assignCanvas: canvasHandler['assignCanvas'],
	updateCanvas: canvasHandler['updateCanvas'],
	deleteCanvas: canvasHandler['deleteCanvas'],

	getAllComponent: componentHandler['getAllComponent'],
	getAllType: componentHandler['getAllType'],
	createComponent: componentHandler['create'],
	updateComponent: componentHandler['updateComponent'],
	deleteComponent: componentHandler['deleteComponent'],

	getAllRole: roleHandler['getAllRole'],
	addRole: roleHandler['addRole'],
	updateRole: roleHandler['updateRole'],
	deleteRole: roleHandler['deleteRole'],
}

export * from './auth'
export * from './user'
export * from './project'
export * from './canvas'
export * from './component'
export * from './role'
export * from './types'
