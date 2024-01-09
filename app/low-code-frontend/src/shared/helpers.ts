import { ROLE } from './enum'
import html2canvas from 'html2canvas'

export const isProjectManager = (role_id: ROLE) =>
	role_id === ROLE.PROJECT_MANAGER

export const isCommon = (role_id: ROLE) =>
	role_id === ROLE.COMMON

export function copyToClipboard(text) {
	const textarea = document.createElement('textarea')
	textarea.style.position = 'fixed'
	textarea.style.opacity = '0'
	textarea.value = text
	document.body.appendChild(textarea)
	textarea.select()
	document.execCommand('copy')
	document.body.removeChild(textarea)
}

export function getShareImgBase64() {
	return new Promise(resolve => {
		setTimeout(() => {
			// #capture 就是我们要获取截图对应的 DOM 元素选择器
			html2canvas(document.querySelector('#canvas')!, {
				logging: false,
				useCORS: true, // 【重要】开启跨域配置
				scale:
					window.devicePixelRatio < 3
						? window.devicePixelRatio
						: 2,
				allowTaint: true, // 允许跨域图片
			}).then(canvas => {
				const imgData = canvas.toDataURL('image/jpeg', 1.0)
				resolve(imgData)
			})
		}, 300) // 这里加上 300ms 的延迟是为了让 DOM 元素完全渲染完成后再进行图片的生成
	})
}

export function getFile(
	data,
	filename,
	fileType = 'application/json'
) {
	const jsonData = JSON.stringify(data)
	const blob = new Blob([jsonData], {
		type: fileType,
	})
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = filename
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	URL.revokeObjectURL(url)
}

export function downFile(
	imgData: any,
	fileName: string = 'saveCanvas.png'
) {
	const downLoadLink = document.createElement('a')
	downLoadLink.href = imgData
	downLoadLink.download = fileName
	document.body.appendChild(downLoadLink)
	downLoadLink.click()
	document.body.removeChild(downLoadLink)
}

export function formatJsonToObject(
	json: Record<string, any>
) {
	const result: Record<string, any> = {}
	for (const key in json) {
		if (Object.prototype.hasOwnProperty.call(json, key)) {
			const value = json[key]
			try {
				result[key] = JSON.parse(value)
			} catch (e) {
				result[key] = value
			}
		}
	}
	console.log(result)
	return result
}
