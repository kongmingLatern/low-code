import { v4 as uuid } from 'uuid'
import { ELEMENT_TYPE, TABKEY } from '.'

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
						width: 50,
						height: 50,
					},
				},
				{
					key: uuid(),
					type: ELEMENT_TYPE.TEXT,
					value: '文本2',
					style: {
						top: 0,
						left: 0,
						width: 200,
						height: 200,
					},
				},
				{
					key: uuid(),
					type: ELEMENT_TYPE.TEXT,
					value: '文本3',
					style: {
						top: 0,
						left: 0,
						width: 200,
						height: 200,
					},
				},
			]
		case TABKEY.IMAGE:
			return [
				{
					key: uuid(),
					type: ELEMENT_TYPE.IMAGE,
					value:
						'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF',
					style: {
						top: 0,
						left: 0,
						width: 400,
						height: 400,
					},
				},
			]
		default:
			return []
	}
}
