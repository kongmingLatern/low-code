import { formatJsonToObject } from '..'

describe('formatJsonToObject', () => {
	it('should return no string', () => {
		const target = {
			props: JSON.stringify({
				name: 1,
			}),
			value: '12313',
		}
		expect(formatJsonToObject(target))
			.toMatchInlineSnapshot(`
			{
			  "props": {
			    "name": 1,
			  },
			  "value": 12313,
			}
		`)
	})
	it('happy path', () => {
		const target = {
			component_props: JSON.stringify({
				value: '123123',
				style: {
					top: 0,
					left: 0,
					width: 'auto',
					height: 'auto',
					fontWeight: 400,
					fontSize: 14,
				},
				props: { keyboard: 'true' },
			}),
			component_name: '123123',
			component_type: 'text',
		}
		expect(formatJsonToObject(target))
			.toMatchInlineSnapshot(`
				{
				  "component_name": 123123,
				  "component_props": {
				    "props": {
				      "keyboard": "true",
				    },
				    "style": {
				      "fontSize": 14,
				      "fontWeight": 400,
				      "height": "auto",
				      "left": 0,
				      "top": 0,
				      "width": "auto",
				    },
				    "value": "123123",
				  },
				  "component_type": "text",
				}
			`)
	})
})
