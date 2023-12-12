const modules = {
	user: '/user',
	auth: '/auth',
	project: '/project',
	canvas: '/canvas',
	role: '/role',
}
export const urls = {
	user: {
		getAllUser: `${modules.user}`,
		updateUser: `${modules.user}/updateUser`,
		deleteUser: `${modules.user}/deleteUser`,
	},
	auth: {
		login: `${modules.auth}/login`,
		register: `${modules.auth}/register`,
	},
	project: {
		getAllProject: `${modules.project}`,
		getAllProjectByUid: `${modules.project}/getAllProject`,
		getProjectById: `${modules.project}/getProject`,
		createProject: `${modules.project}/create`,
		joinProject: `${modules.project}/join`,
		updateProject: `${modules.project}/updateProject`,
		deleteUser: `${modules.project}/deleteUser`,
		deleteProject: `${modules.project}/deleteProject`,
	},
	canvas: {
		getAllCanvas: `${modules.canvas}`,
		createCanvas: `${modules.canvas}/create`,
		getCanvasByProjectId: `${modules.canvas}/getCanvas`,
		multAllocation: `${modules.canvas}/multAllocation`,
		updateCanvas: `${modules.canvas}/updateCanvas`,
		deleteCanvas: `${modules.canvas}/deleteCanvas`,
	},
	role: {
		getAllRole: `${modules.role}`,
		updateRole: `${modules.role}/updateRole`,
		deleteRole: `${modules.role}/deleteRole`,
	},
}
