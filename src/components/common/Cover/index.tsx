import styled from '@/assets/image.module.scss'
import { Col, Row } from 'antd'
import classNames from 'classnames'
const LoginCover = ({ split = 2, cover = 1, children }) => {
	const span = 24 / split
	const leftSplit = (24 - span * cover) / span
	return (
		<Row
			className={classNames(
				'w-full',
				'h-100vh',
				styled.loginCover,
				'flex'
			)}
		>
			{new Array(leftSplit).fill(0).map((_, index) => {
				return (
					<Col
						key={index}
						span={span}
						className={classNames('h-100vh')}
					></Col>
				)
			})}
			<Col
				span={(24 / split) * cover}
				className="h-100vh relative"
				style={{
					background: 'rgba(255,255,255,0.5)',
					borderRadius: '20px',
				}}
			>
				{children}
			</Col>
		</Row>
	)
}

export default LoginCover
