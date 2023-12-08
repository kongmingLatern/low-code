import { CardProps } from '../pages/All'

export function searchProjectByName(
	val: string,
	cardList: CardProps[],
	setList
) {
	const value = val.trim()
	if (value) {
		const res = cardList.filter(i =>
			i.project_name
				.toLowerCase()
				.includes(value.toLowerCase())
		)
		if (!Object.is(cardList, res)) {
			// 如果过滤的结果和原来相同,无需重新设置
			setList(res)
		}
	} else {
		setList(cardList)
	}
}
