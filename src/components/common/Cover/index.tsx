import styled from '@/assets/image.module.scss'
import classNames from 'classnames'
const LoginCover = ({ children }) => {
	return (
		<div
			className={classNames(
				'w-full',
				'h-100vh',
				styled.loginCover,
				'flex'
			)}
		>
			<div className="w-1/2 h-100vh"></div>
			<div
				className="w-1/2 h-100vh relative"
				style={{
					background: 'rgba(255,255,255,0.5)',
					borderRadius: '20px',
				}}
			>
				{children}
			</div>
		</div>
	)
}

export default LoginCover
