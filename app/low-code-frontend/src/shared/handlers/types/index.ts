interface CanvasInfoType {
	canvas_id: string
	canvas_name: string
	canvas_status: string
	canvas_description: string
	create_time: Date
	update_time: Date
}

interface UserInfoType {
	uid: string
	username: string
	project_id: string
	role_id: number
	name: string
	create_time: Date
	update_time: Date
	canvasList: string[]
}

export interface InfoType {
	canvas_num: number
	createBy: string
	createUserName: string
	create_time: Date
	project_code: string
	project_description: string
	project_id: string
	project_name: string
	project_status: string
	refMap: {
		canvas: Array<CanvasInfoType>
		users: Array<UserInfoType>
	}
	update_time: Date
	user_num: number
}

export interface UserCanvasInfo {
	role_id: number
	canvas: Array<CreateCanvasType & { isEditable: 0 | 1 }>
}

export interface ProjectIdType {
	code: number
	data: InfoType
	message: string
}

export interface CreateProjectDto {
	project_id: string
	project_name: string
	project_description: string
	project_status: '已完成' | '进行中' | '未开始'
	project_code: string
	create_time?: Date
	update_time?: Date
	createBy?: string
}
export const enum Status {
	FINISH = '已完成',
	DOING = '进行中',
	NOTSTART = '未开始',
}

export interface CreateCanvasType {
	canvas_id: string
	canvas_name: string
	canvas_description: string
	canvas_status: Status
	canvas_info: string
	create_time: Date
	update_time: Date
}

export interface ProjectUidType {
	code: number
	data: Record<'projects', Array<Record<string, any>>>
	message: string
}
