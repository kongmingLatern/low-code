import React from 'react'

class FileDownload extends React.Component {
	downloadFile = () => {
		// 生成要下载的文件内容，这里使用一个示例文本文件
		const fileContent = '这是要下载的文件内容'

		// 创建一个Blob对象
		const blob = new Blob([fileContent], {
			type: 'text/plain',
		})

		// 创建一个URL对象
		const url = URL.createObjectURL(blob)

		// 创建一个下载链接
		const a = document.createElement('a')
		a.href = url
		a.download = 'sample.txt' // 设置要下载的文件名
		a.style.display = 'none'

		// 添加下载链接到DOM
		document.body.appendChild(a)

		// 模拟用户点击下载链接
		a.click()

		// 清理URL对象和下载链接
		URL.revokeObjectURL(url)
		document.body.removeChild(a)
	}

	render() {
		return (
			<div>
				<button onClick={this.downloadFile}>
					下载文件
				</button>
			</div>
		)
	}
}

export default FileDownload
