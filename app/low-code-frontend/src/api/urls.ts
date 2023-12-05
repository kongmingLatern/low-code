const modules = {
	auth: '/auth',
	project: '/project',
	canvas: '/canvas',
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
	canvas: {
		createCanvas: `${modules.canvas}/create`,
	},
}
