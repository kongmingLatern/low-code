const modules = {
	auth: '/auth',
	project: '/project',
}
export const urls = {
	auth: {
		login: `${modules.auth}/login`,
		register: `${modules.auth}/register`,
	},
	project: {
		getAllProjectByUid: `${modules.project}/getAllProject`,
		getProjectById: `${modules.project}/getProject`,
		createProject: `${modules.project}/create`,
	},
}
