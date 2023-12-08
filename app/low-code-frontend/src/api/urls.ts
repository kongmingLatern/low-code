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
		joinProject: `${modules.project}/join`,
		deleteUser: `${modules.project}/deleteUser`,
	},
	canvas: {
		createCanvas: `${modules.canvas}/create`,
		getCanvasByProjectId: `${modules.canvas}/getCanvas`,
		multAllocation: `${modules.canvas}/multAllocation`,
		updateCanvas: `${modules.canvas}/updateCanvas`,
		deleteCanvas: `${modules.canvas}/deleteCanvas`,
	},
}
