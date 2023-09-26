import { TABKEY } from '.'

export function getContent(key: string) {
	switch (key) {
		case TABKEY.TEXT:
			return ['文本1', '文本2']
		case TABKEY.IMAGE:
			return ['图片']
		default:
			return []
	}
}
