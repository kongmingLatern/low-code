import {
	FunctionComponent,
	useContext,
	useEffect,
	useState,
} from 'react'
import { Input, Space } from 'antd'

import { CardContext } from '@/layout/BaseHomeLayout'
import { CardItem } from '../components/CardItem'
import Flex from '@/components/common/Flex'
import ModalButton from '@/components/common/ModalButton'
import RowItem from '@/components/common/RowItem'
import { SearchProps } from 'antd/es/input'
import { handlers } from '@/shared'
import { searchProjectByName } from '../shared'

const { Search } = Input

interface AllProps { }

export interface CardProps {
	project_name: string
	createBy: string
	create_time: Date
	project_code: string
	project_description: string
	project_id: string
	project_status: string
	refMap: Record<string, any>
	update_time: Date
}

const All: FunctionComponent<AllProps> = () => {
	const { cardList, getData } = useContext(CardContext)
	const [list, setList] = useState(cardList)

	useEffect(() => {
		setList(cardList)
	}, [cardList])

	const CardList = list.map((c: CardProps) => (
		<CardItem c={c} />
	))

	const onSearch: SearchProps['onSearch'] = val => {
		searchProjectByName(val, cardList, setList)
	}
	return (
		<>
			<Flex justify="end">
				<Space>
					<Search
						className="w-250px"
						placeholder="请输入要查询的项目名称"
						onSearch={onSearch}
						enterButton
					/>
					<ModalButton
						title="新建项目"
						form
						formItem={[
							{
								type: 'input',
								props: {
									label: '项目名称',
									name: 'project_name',
									rules: [
										{
											required: true,
											message: '请输入项目名称',
										},
									],
								},
							},
							{
								type: 'input',
								props: {
									label: '项目描述',
									name: 'project_description',
									rules: [
										{
											required: true,
											message: '请输入项目描述',
										},
									],
								},
							},
						]}
						onOk={async e => {
							const values = {
								...e,
								createBy: localStorage.getItem('uid'),
							}
							await handlers.createProject(values)
							await getData()
						}}
						onCancel={e => {
							console.log('cancel', e)
						}}
						footer={null}
					>
						新建项目
					</ModalButton>
				</Space>
			</Flex>
			<RowItem
				gutter={[24, 16]}
				list={CardList}
				count={4}
			></RowItem>
		</>
	)
}

export default All
