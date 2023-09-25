import { defaultExclude, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import path from 'node:path'

export default defineConfig({
	test: {
		globals: true,
		exclude: [...defaultExclude, 'app'],
	},
	plugins: [
		react(),
		UnoCSS({
			configFile: './unocss.config.ts',
		}),
	],
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src'),
			'@packages': path.join(__dirname, 'packages'),
			'@components': path.join(
				__dirname,
				'packages/components'
			),
		},
	},
})
