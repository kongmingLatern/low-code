import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
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
})
