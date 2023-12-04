import { loginHandler, registerHandle } from './auth'

export const handlers = {
	login: loginHandler,
	register: registerHandle,
}
