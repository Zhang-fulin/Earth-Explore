import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Earth-Explore/", // <- 关键点！必须加上仓库名
  plugins: [react()],
})
