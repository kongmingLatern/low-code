import { loginHandler, registerHandle } from './auth'

import { projectHandler } from './project'

export const handlers = {
	login: loginHandler,
	register: registerHandle,

	getAllProjectByUid: projectHandler['uid'],
	getProjectById: projectHandler['project_id'],
}

export * from './auth'
export * from './project'
