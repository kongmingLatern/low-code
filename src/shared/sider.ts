import { v4 as uuid } from 'uuid'
import { TABKEY } from '.'

export function getContent(key: string) {
	switch (key) {
		case TABKEY.TEXT:
			return [
				{
					key: uuid(),
					type: 'text',
					value: '文本1',
				},
				{
					key: uuid(),
					type: 'text',
					value: '文本2',
				},
				{
					key: uuid(),
					type: 'text',
					value: '文本3',
				},
			]
		case TABKEY.IMAGE:
			return ['图片']
		default:
			return []
	}
}
