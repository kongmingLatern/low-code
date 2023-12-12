export function filterByKey(
	arr: Array<any>,
	targetKey: string,
	targetValue: string
) {
	return arr.filter(i =>
		i[targetKey]?.includes(targetValue)
	)
}
