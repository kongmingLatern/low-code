function formatNumber(number: number) {
	if (number < 10) {
		return '0' + number
	} else {
		return number
	}
}
export function formatYMD(date: Date, split = '-') {
	return [
		date.getFullYear(),
		formatNumber(date.getMonth() + 1),
		formatNumber(date.getDate()),
	].join(split)
}
export function formatYMDHHmmss(date: Date, split = '-') {
	const ymd = [
		date.getFullYear(),
		formatNumber(date.getMonth() + 1),
		formatNumber(date.getDate()),
	].join(split)

	const hms = [
		formatNumber(date.getHours()),
		formatNumber(date.getMinutes()),
		formatNumber(date.getSeconds()),
	].join(':')

	return `${ymd} ${hms}`
}
