import { defaultExclude, defineConfig } from 'vitest/config'

import UnoCSS from 'unocss/vite'
import dts from 'vite-plugin-dts'
import path from 'node:path'
import react from '@vitejs/plugin-react'

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
		dts({
			outDir: './dist/types',
			insertTypesEntry: true, // 插入TS 入口
			copyDtsFiles: true, // 是否将源码里的 .d.ts 文件复制到 outputDir
		}),
	],
	build: {
		minify: 'esbuild',
		lib: {
			entry: 'packages/renderer-core/index.ts',
			formats: ['es', 'umd', 'iife'],
			name: 'Renderer',
			fileName: format => `index.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
	server: {
		port: 5173,
		origin: 'http://localhost:5173',
		proxy: {
			'/api': {
				// 这里配置要代理的路径前缀
				target: 'http://localhost:3333/api', // 设置目标地址
				changeOrigin: true, // 将请求头中的host设置为target的域名
				rewrite: path => path.replace(/^\/api/, ''), // 可选，重写路径，例如去掉前缀
			},
		},
	},
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
