import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import path from 'node:path'

export default defineConfig({
	test: {
		globals: true,
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
		},
	},
})
