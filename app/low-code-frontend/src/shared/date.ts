function formatNumber(number: number) {
	return number < 10 ? '0' + number : number
}
export function formatYMD(date: Date, split = '-') {
	return [
		date.getFullYear(),
		formatNumber(date.getMonth() + 1),
		formatNumber(date.getDate()),
	].join(split)
}
export function formatYMDHHmmss(date: Date, split = '-') {
	const ymd = formatYMD(date, split)

	const hms = [
		formatNumber(date.getHours()),
		formatNumber(date.getMinutes()),
		formatNumber(date.getSeconds()),
	].join(':')

	return `${ymd} ${hms}`
}
