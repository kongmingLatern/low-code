import {
	FunctionComponent,
	useContext,
	useEffect,
	useState,
} from 'react'

import { CardContext } from '@/layout/BaseHomeLayout'
import { CardItem } from '../components/CardItem'
import { CardProps } from './All'
import Flex from '@/components/common/Flex'
import { Input } from 'antd'
import RowItem from '@/components/common/RowItem'
import { SearchProps } from 'antd/es/input'
import { searchProjectByName } from '../shared'

const { Search } = Input

interface DoingProps {}

const Doing: FunctionComponent<DoingProps> = () => {
	const { cardList } = useContext(CardContext)
	const [list, setList] = useState(
		cardList.filter(i => i.project_status === '进行中')
	)

	useEffect(() => {
		setList(
			cardList.filter(i => i.project_status === '进行中')
		)
	}, [cardList])

	const CardList = list.map((c: CardProps) => (
		<CardItem c={c} />
	))

	const onSearch: SearchProps['onSearch'] = value =>
		searchProjectByName(
			value,
			cardList.filter(i => i.project_status === '进行中'),
			setList
		)
	return (
		<>
			<Flex justify="end">
				<Search
					className="w-250px"
					placeholder="请输入要查询的项目名称"
					onSearch={onSearch}
					enterButton
				/>
			</Flex>
			<RowItem gutter={16} list={CardList}></RowItem>
		</>
	)
}

export default Doing
