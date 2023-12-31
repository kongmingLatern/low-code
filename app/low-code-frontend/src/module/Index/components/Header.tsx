import { Icon } from '@iconify/react'
import { ColorTheme } from '@packages/customized'
import { Row, Col, Button, Space } from 'antd'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

export default function Header() {
	const navigate = useNavigate()
	return (
		<Row
			className={classNames('px-1rem', 'overflow-hidden')}
			align={'middle'}
			style={{
				background: ColorTheme.black,
			}}
		>
			<Col span={8}>
				<span className="flex items-center color-white">
					<Icon icon="fad:logo-fl" width={60} height={60} />
					<span className="text-18px">多智协创平台</span>
				</span>
			</Col>
			<Col span={8} offset={8}>
				<Space className="flex-center">
					<Button ghost onClick={() => navigate('/login')}>
						登陆
					</Button>
					<Button
						ghost
						onClick={() => navigate('/register')}
					>
						注册
					</Button>
				</Space>
				{/* <span className="flex-center">
					<Icon icon="fad:logo-fl" width={60} height={60} />
					<span>用户名</span>
				</span> */}
			</Col>
		</Row>
	)
}
