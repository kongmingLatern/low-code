import { handlers } from '@/shared'

async function getAll() {
	const res = await handlers.getAllComponent()
	const all = res.data.map(i => {
		return {
			label: i.component_tag,
			key: i.component_type,
		}
	})

	const allTab = [
		{
			label: '所有',
			key: 'all',
		},
		...Array.from(
			new Set(all.map(JSON.stringify as any)) as any,
			JSON.parse as any
		),
	]
	return allTab
}

export const LeftSiderTab = await getAll()

export const SiderConfig = {
	LeftWidth: 400,
	RightWidth: 400,
}

export async function getContent(key: string) {
	const res = (await handlers.getAllComponent(key)).data
	return res
}
