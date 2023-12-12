import { filterByKey } from '@/shared'

describe('filter', () => {
	it('happy path', () => {
		const a = [
			{
				b: 1,
				c: 2,
			},
			{
				username: 'abc',
				b: 1,
				c: 2,
			},
		]
		expect(filterByKey(a, 'username', 'abc')).toEqual([
			{
				username: 'abc',
				b: 1,
				c: 2,
			},
		])
	})
	it('more obj', () => {
		const a = [
			{
				b: 1,
				c: 2,
			},
			{
				username: 'abc',
				b: 1,
				c: 2,
			},
			{
				username: 'bbb',
				b: 1,
				c: 2,
			},
		]
		expect(filterByKey(a, 'username', 'bbb')).toEqual([
			{
				username: 'bbb',
				b: 1,
				c: 2,
			},
		])
	})
	it('reg search', () => {
		const a = [
			{
				b: '12312345',
				c: 2,
			},
			{
				username: 'abc',
				b: '123123',
				c: 2,
			},
			{
				username: 'bbb',
				b: 'sdf[ad',
				c: 2,
			},
		]
		expect(filterByKey(a, 'b', '1')).toEqual([
			{
				username: 'abc',
				b: 1,
				c: 2,
			},
			{
				username: 'bbb',
				b: 1,
				c: 2,
			},
		])
	})
})
