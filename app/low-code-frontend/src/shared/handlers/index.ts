import { loginHandler, registerHandle } from './auth'

import { projectHandler } from './project'

export const handlers = {
	login: loginHandler,
	register: registerHandle,

	getAllProjectByUid: projectHandler['uid'],
}
