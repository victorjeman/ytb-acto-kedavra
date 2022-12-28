import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import macrosPlugin from 'vite-plugin-babel-macros'
import { VitePluginFonts } from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		macrosPlugin(),
		VitePluginFonts({
			google: {
				families: ['Poppins'],
			},
		}),
	],
})
