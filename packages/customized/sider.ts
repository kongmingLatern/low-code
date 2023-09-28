import { ELEMENT_TYPE, TABKEY } from '@/shared'
import { v4 as uuid } from 'uuid'

export const LeftSiderTab = ['文本', '图片', '视频']

export const SiderConfig = {
	LeftWidth: 400,
	RightWidth: 400,
}

export function getContent(key: string) {
	switch (key) {
		case TABKEY.TEXT:
			return [
				{
					key: uuid(),
					type: ELEMENT_TYPE.TEXT,
					value: '文本1',
					style: {
						top: 0,
						left: 0,
						width: 'auto',
						height: 'auto',
						fontWeight: '400',
						fontSize: 20,
						color: 'black',
					},
				},
				{
					key: uuid(),
					type: ELEMENT_TYPE.TEXT,
					value: '文本2',
					style: {
						top: 0,
						left: 0,
						width: 'auto',
						height: 'auto',
						fontWeight: '700',
						fontSize: 12,
						color: 'black',
					},
				},
				{
					key: uuid(),
					type: ELEMENT_TYPE.TEXT,
					value: '文本3',
					style: {
						top: 0,
						left: 0,
						width: 'auto',
						height: 'auto',
						fontWeight: '200',
						fontSize: 23,
						color: 'black',
					},
				},
			]
		case TABKEY.IMAGE:
			return [
				{
					key: uuid(),
					type: ELEMENT_TYPE.IMAGE,
					value:
						'https://img95.699pic.com/photo/40250/6610.jpg_wh300.jpg',
					style: {
						top: 0,
						left: 0,
						width: 200,
						height: 100,
					},
				},
				{
					key: uuid(),
					type: ELEMENT_TYPE.IMAGE,
					value:
						'https://img95.699pic.com/photo/40250/3909.jpg_wh300.jpg',
					style: {
						top: 0,
						left: 0,
						width: 200,
						height: 100,
					},
				},
			]
		default:
			return []
	}
}
