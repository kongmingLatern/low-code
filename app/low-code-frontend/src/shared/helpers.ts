import { ROLE } from './enum'

export const isProjectManager = (role_id: ROLE) =>
	role_id === ROLE.PROJECT_MANAGER

export const isCommon = (role_id: ROLE) =>
	role_id === ROLE.COMMON
