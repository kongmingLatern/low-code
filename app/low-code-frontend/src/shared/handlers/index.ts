import { loginHandler, registerHandle } from './auth'

import { canvasHandler } from './canvas'
import { componentConfigHandler } from './componentConfig'
import { componentHandler } from './component'
import { libraryHandler } from './library'
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

	getAllComponentConfig: componentConfigHandler['get'],
	getComponentConfig: componentConfigHandler['getTag'],
	createComponentConfig: componentConfigHandler['create'],
	updateComponentConfig: componentConfigHandler['update'],
	deleteComponentConfig: componentConfigHandler['delete'],

	getAllRole: roleHandler['getAllRole'],
	addRole: roleHandler['addRole'],
	updateRole: roleHandler['updateRole'],
	deleteRole: roleHandler['deleteRole'],

	getAllLibrary: libraryHandler['getAllLibrary'],
	addLibrary: libraryHandler['addLibrary'],
	updateLibrary: libraryHandler['updateLibrary'],
	deleteLibrary: libraryHandler['deleteLibrary'],
}

export * from './auth'
export * from './user'
export * from './project'
export * from './canvas'
export * from './component'
export * from './componentConfig'
export * from './library'
export * from './role'
export * from './types'
