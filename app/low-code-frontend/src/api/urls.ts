const modules = {
	user: '/user',
	auth: '/auth',
	project: '/project',
	canvas: '/canvas',
	component: '/component',
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
		getCanvasByUid: `${modules.canvas}/getCanvasByUid`,
		multAllocation: `${modules.canvas}/multAllocation`,
		updateCanvas: `${modules.canvas}/updateCanvas`,
		deleteCanvas: `${modules.canvas}/deleteCanvas`,
	},
	component: {
		getAllComponents: `${modules.component}/get`,
		createComponent: `${modules.component}/create`,
		updateComponent: `${modules.component}/update`,
		deleteComponent: `${modules.component}/delete`,
	},
	role: {
		getAllRole: `${modules.role}`,
		addRole: `${modules.role}/add`,
		updateRole: `${modules.role}/updateRole`,
		deleteRole: `${modules.role}/deleteRole`,
	},
}
