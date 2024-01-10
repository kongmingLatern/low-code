import { handlers } from '@/shared'

export const LeftSiderTab = [
	{
		label: '所有',
		key: 'all',
	},
	{
		label: '文本',
		key: 'text',
	},
	{
		label: '图片',
		key: 'img',
	},
	{
		label: '卡片',
		key: 'card',
	},
	{
		label: '按扭',
		key: 'button',
	},
]

export const SiderConfig = {
	LeftWidth: 400,
	RightWidth: 400,
}

export async function getContent(key: string) {
	const res = (await handlers.getAllComponent(key)).data
	return res
	// switch (key) {
	// 	case TABKEY.TEXT:
	// 		return [
	// 			{
	// 				key: uuid(),
	// 				type: ELEMENT_TYPE.TEXT,
	// 				value: '文本1',
	// 				style: {
	// 					top: 0,
	// 					left: 0,
	// 					width: 'auto',
	// 					height: 'auto',
	// 					fontWeight: '400',
	// 					fontSize: 20,
	// 					color: 'black',
	// 				},
	// 				editorBy: [],
	// 			},
	// 			{
	// 				key: uuid(),
	// 				type: ELEMENT_TYPE.TEXT,
	// 				value: '文本2',
	// 				style: {
	// 					top: 0,
	// 					left: 0,
	// 					width: 'auto',
	// 					height: 'auto',
	// 					fontWeight: '700',
	// 					fontSize: 12,
	// 					color: 'black',
	// 				},
	// 				editorBy: [],
	// 			},
	// 			{
	// 				key: uuid(),
	// 				type: ELEMENT_TYPE.TEXT,
	// 				value: '文本3',
	// 				style: {
	// 					top: 0,
	// 					left: 0,
	// 					width: 'auto',
	// 					height: 'auto',
	// 					fontWeight: '200',
	// 					fontSize: 23,
	// 					color: 'black',
	// 				},
	// 				editorBy: [],
	// 			},
	// 		]
	// 	case TABKEY.IMAGE:
	// 		return [
	// 			{
	// 				key: uuid(),
	// 				type: ELEMENT_TYPE.IMAGE,
	// 				value:
	// 					'https://pic.mac89.com/pic/202011/26140204_a7bad86bb7.jpeg',
	// 				style: {
	// 					top: 0,
	// 					left: 0,
	// 					width: 200,
	// 					height: 100,
	// 				},
	// 				editorBy: [],
	// 			},
	// 			{
	// 				key: uuid(),
	// 				type: ELEMENT_TYPE.IMAGE,
	// 				value:
	// 					'https://img95.699pic.com/photo/40250/3909.jpg_wh300.jpg',
	// 				style: {
	// 					top: 0,
	// 					left: 0,
	// 					width: 200,
	// 					height: 100,
	// 				},
	// 				editorBy: [],
	// 			},
	// 		]
	// 	case TABKEY.CARD:
	// 		return [
	// 			{
	// 				key: uuid(),
	// 				type: ELEMENT_TYPE.CARD,
	// 				value: 'card default value',
	// 				props: {
	// 					title: 'Card1',
	// 				},
	// 				style: {
	// 					top: 0,
	// 					left: 0,
	// 					width: 'auto',
	// 					height: 'auto',
	// 					fontWeight: '400',
	// 					fontSize: 14,
	// 					color: 'black',
	// 				},
	// 				editorBy: [],
	// 			},
	// 		]
	// 	default:
	// 		return []
	// }
}
