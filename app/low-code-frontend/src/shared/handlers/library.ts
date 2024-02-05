import {
	ReturnType,
	get,
	handleDeleteRequest,
	handlePostRequest,
	handlePutRequest,
	urls,
} from '@/api'

export interface LibraryReturnType {
	library_id: number
	library_name: string
	version: string
}

export const getAllLibrary = async () => {
	return await get<ReturnType<LibraryReturnType>>(
		urls.library.getAllLibraries
	)
}

export const addLibrary = async values => {
	return await handlePostRequest(
		urls.library.addLibrary,
		values,
		'创建成功'
	)
}

export const updateLibrary = async values => {
	return await handlePutRequest(
		urls.library.updateLibrary + `/${values.library_id}`,
		values
	)
}
export const deleteLibrary = async library_id => {
	return await handleDeleteRequest(
		urls.library.deleteLibrary + `/${library_id}`,
		{}
	)
}

export const libraryHandler = {
	getAllLibrary,
	addLibrary,
	updateLibrary,
	deleteLibrary,
}
